const config = require('ebased/util/config');
const dynamo = require('ebased/service/storage/dynamo');

const CLIENTS_TABLE = config.get('CLIENTS_TABLE');

const updateClient = async (updateClient) => {
    const { dni, name, lastName, birthday, eventMeta }= updateClient;
    let params = {
        TableName: CLIENTS_TABLE,
        Key: {
            dni
        },
        UpdateExpression: "SET #name=:name, #lastName=:lastName, #birthday=:birthday",
        ExpressionAttributeNames:{
            "#name": "name",
            "#lastName": "lastName",
            "#birthday": "birthday"
        },
        ExpressionAttributeValues: {
            ":name": name,
            ":lastName": lastName,
            ":birthday": birthday 
        },
        ReturnValues:"ALL_NEW",
    }
    
    await dynamo.updateItem(params, eventMeta);
}

module.exports = { updateClient };
