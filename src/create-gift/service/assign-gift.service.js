const config = require('ebased/util/config');
const dynamo = require('ebased/service/storage/dynamo');

const CLIENTS_TABLE = config.get('CLIENTS_TABLE');

const AssignGiftSave = async (saveGift) => { 
    const { dni, gift, eventMeta } = saveGift;
    let params = {
        ExpressionAttributeNames:{
            "#assignedGift": "AssignedGift",
        },
        ExpressionAttributeValues: {
            ":aGift": gift
        },
        Key: {
            dni
        },
        UpdateExpression: "SET #assignedGift = :aGift",
        TableName:CLIENTS_TABLE,
        ReturnValues:"ALL_NEW",
    }
    
    await dynamo.updateItem(params, eventMeta);
}

module.exports = { AssignGiftSave };
