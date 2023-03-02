const config = require('ebased/util/config');
const dynamo = require('ebased/service/storage/dynamo');

const CLIENTS_TABLE = config.get('CLIENTS_TABLE');

const updatePoints = async (points) => { 
    const { dni, totalPoints, eventMeta } = points;
    let params = {
        TableName: CLIENTS_TABLE,
        Key: {
            dni
        },
        UpdateExpression: "SET #points = :totalPoints",
        ExpressionAttributeNames: {
            "#points": "totalPoints",
        },
        ExpressionAttributeValues: {
            ":totalPoints": totalPoints
        },
        ReturnValues: "ALL_NEW",
    };
    
    return dynamo.updateItem(params, eventMeta)
}

module.exports = { updatePoints };
