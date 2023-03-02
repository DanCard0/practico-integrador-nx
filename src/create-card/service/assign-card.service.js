const config = require('ebased/util/config');
const dynamo = require('ebased/service/storage/dynamo');

const CLIENTS_TABLE = config.get('CLIENTS_TABLE');

const AssignCardSave = async (saveCard) => {
    const { number, expirationDate, securityCode, type, dni, commandMeta } = saveCard;
    let paramsSave={
        ExpressionAttributeNames:{
            "#creditCard": "creditCard",
        },
        ExpressionAttributeValues: {
            ":card":{            
                "number": number,
                "expirationDate": expirationDate,
                "securityCode": securityCode,
                "type": type
            }
        },
        Key: {
            dni
        },
        TableName: CLIENTS_TABLE,
        UpdateExpression: "SET #creditCard = :card",
    }
    await dynamo.updateItem(paramsSave, commandMeta);
}

module.exports = { AssignCardSave };
