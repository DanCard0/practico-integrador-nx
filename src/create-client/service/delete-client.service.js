const config = require('ebased/util/config');
const dynamo = require('ebased/service/storage/dynamo');

const CLIENTS_TABLE = config.get('CLIENTS_TABLE');

const deleteClient = async (deleteClient) => { 
    const { dni, eventMeta } = deleteClient;
    let params={
        ExpressionAttributeNames:{
            "#active":"statusActive",
        },
        ExpressionAttributeValues: {
            ":active":false
        },
        Key: {
            dni
        },
        ReturnValues:"ALL_NEW",
        TableName:CLIENTS_TABLE,
        UpdateExpression: "SET #active = :active",
    }
    return await dynamo.updateItem(params, eventMeta);
}

module.exports = { deleteClient };