const { FaultHandled } = require('ebased/util/error');

const { AssignGiftValidation } = require('../schema/input/assign-gift.input');
const { AssignGiftSave } = require('../service/assign-gift.service');

module.exports = async (commandPayload, commandMeta) => {
    new AssignGiftValidation(commandPayload, commandMeta);
    const { dni, birthday } = commandPayload;
    let gift = await getGift(birthday);
    let params = {
        dni,
        gift
    }
    await AssignGiftSave(params, commandMeta);
    
    return {
        status: 200,
        body: 'Gift Assigned',
    };
}

const getGift = async (birthday) => {
    try {
        const [day, month, year] = birthday.split('/');
        const birthdayDate = new Date(+year, +month, +day);
        let numberDay = Math.floor((birthdayDate - new Date(birthdayDate.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        let season;
        
        if (numberDay >= 356 || numberDay >= 1 && numberDay <= 80) {
            season = "Verano";
        } else if (numberDay >=81 && numberDay <= 172) {
            season = "Otoño";
        } else if (numberDay >=173 && numberDay <= 264) {
            season = "Invierno";
        } else {
            season = "Primavera";
        }
        
        const gifts ={
            'Verano':'remera',
            'Otoño':'buzo',
            'Invierno':'sweater',
            'Primavera':'camisa'
        }

        return gifts[season]; 
    } catch (error) {
        throw new FaultHandled(`error getting gift type.`, { code: 'GET_GIFT', layer: 'DOMAIN' });
    }
    
}
