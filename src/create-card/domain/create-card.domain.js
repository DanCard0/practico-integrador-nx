const { FaultHandled } = require('ebased/util/error');

const { assignCardTopicValidation } = require('../schema/input/create-card.input');
const { AssignCardSave } = require('../service/assign-card.service');

module.exports = async (eventPayload, commandMeta) => {
    new assignCardTopicValidation(eventPayload, commandMeta);
    const { age, dni } = eventPayload;

    let params = {
        number: await generateNumber(),
        expirationDate: await generateDate(),
        securityCode: Math.floor(Math.random() * 999).toString(),
        type: await typeOfCard(age),
        dni
    };
    
    await AssignCardSave(params, commandMeta);
    
    return {
        status: 200,
        body: 'Card created successfully',
    };
}

const typeOfCard = async (age) => {
    try {
        return  age < 45  ? "Classic" : "Gold";
    } catch (error) {
        throw new FaultHandled(`error designating card type.`, { code: 'TYPE_CARD', layer: 'DOMAIN' });
    }
}
const generateNumber = async () => {
    try {
        let numberMax = 9999999999999999
        let randomNumber = Math.floor(Math.random() * numberMax)
        let numbersArr = randomNumber.toString().match(/.{1,4}/g).toString();
        return numbersArr.replace(/,/g, " ")
    } catch (error) {
        throw new FaultHandled(`error generating the card number.`, { code: 'NUMBER_CARD', layer: 'DOMAIN' });
    }
}

const generateDate = async () => {
    try {
        let date = new Date();
        return `${date.getMonth()}/${(date.getFullYear()+5).toString().substr(-2)}`;
    } catch (error) {
        throw new FaultHandled(`error generating expiration date for the card.`, { code: 'DATE_CARD', layer: 'DOMAIN' });
    }
    
}