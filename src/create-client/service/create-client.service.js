const config = require('ebased/util/config');
const dynamo = require('ebased/service/storage/dynamo');

const CLIENTS_TABLE = config.get('CLIENTS_TABLE');

const saveClientDynamo = async (CreateClientValidation) => { 
    const { dni, name, lastName, birthday, eventMeta } = CreateClientValidation;
    const params ={
        "TableName":CLIENTS_TABLE,
        "Item": {
            dni,
            name,
            lastName,
            birthday,
            statusActive: true
        },
        ReturnConsumedCapacity: "TOTAL",
    }
    
    await dynamo.putItem(params, eventMeta)
}

module.exports = { saveClientDynamo };
