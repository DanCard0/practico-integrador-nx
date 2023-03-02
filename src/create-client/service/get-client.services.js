const config = require('ebased/util/config');
const dynamo = require('ebased/service/storage/dynamo');

const CLIENTS_TABLE = config.get('CLIENTS_TABLE');

const getClient = async (getClient) => { 
    const { dni, eventMeta } = getClient;
    let params = {
        Key: {
            dni
        }, 
        TableName: CLIENTS_TABLE
    };
    
    return await dynamo.getItem(params, eventMeta);
}

module.exports = { getClient };
