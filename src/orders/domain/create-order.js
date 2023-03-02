const { FaultHandled } = require('ebased/util/error');
const { CreateOrderValidation } = require('../schema/input/create-order.input'); 

const { getClient } = require('../service/get-client.service');
const { saveNewOrder } = require('../service/save-order.service');

const { updatePoints } = require('../service/update-client.service');

module.exports = async (commandPayload, commandMeta) => {
    new CreateOrderValidation(commandPayload, commandMeta);
    const { dni, purchasedProducts } = commandPayload;
    const client  = await getClient({
        dni
    }, commandMeta);

    if (!!client.Item.hasOwnProperty("status")) {
        return {
            statusCode: 401,
            body: 'El usuario no existe. verifique los datos suministrados'
        }
    } else {
        let dataPurchases = await calculateDiscount(purchasedProducts, client.Item.creditCard.type);
        let id = await generateId();
        
        const savedOrder = await saveNewOrder({
            id,
            dni,
            dataPurchases
        }, commandMeta);
        
        let points = await calculatePoints(dataPurchases);
        let actualPoints = client.Item.accumulated_points !== undefined ? client.Item.accumulated_points : 0;
        let totalPoints = actualPoints + points;

        await updatePoints({
            dni,
            totalPoints
        }, commandMeta);
        
        return {
            statusCode: 200,
            body: JSON.stringify('Orden creada de manera exitosa.', + savedOrder),
        };
    }
}

const calculateDiscount = async (products, creditCardType) => {
    try {
        let typeCard = creditCardType["S"];
        let discount = typeCard === "Gold" ? 0.12 : 0.08;
        let updatedProducts = products.map(product =>{
            let discountProduct = product.originalPrice - (product.originalPrice * discount);
            product.finalPrice = discountProduct.toFixed(3)
            return product
        });
        
        return updatedProducts;
    } catch (error) {
        throw new FaultHandled(`error calculating discount.`, { code: 'CALCULATE_DISCOUNT', layer: 'DOMAIN' });
    }    
}

const generateId = async () => {
    try {
        let dt = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    } catch (error) {
        throw new FaultHandled(`error generating identifier.`, { code: 'GENERATE_ID', layer: 'DOMAIN' });
    }
}

const calculatePoints = async (products) => {
    try {
        let getFinalValues = products.map(product =>{
            return(parseFloat(product.finalPrice));
        });

        const sumValues = getFinalValues.reduce(
            (previousValue, currentValue) => previousValue + currentValue
        );

        return (Math.trunc((sumValues)/200));
    } catch (error) {
        throw new FaultHandled(`error calculating purchase points.`, { code: 'CALCULATE_POINTS', layer: 'DOMAIN' });
    }    
}
