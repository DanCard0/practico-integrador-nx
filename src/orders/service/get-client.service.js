const config = require('ebased/util/config');
const dynamo = require('ebased/service/storage/dynamo');

const CLIENTS_TABLE = config.get('CLIENTS_TABLE');

const getClient = async (getClient) => { 
    const { dni, commandMeta } = getClient;
    let params = {
        Key: {
            dni
        },
        TableName: CLIENTS_TABLE
    };
    
    return await dynamo.getItem(params, commandMeta);
}

module.exports = { getClient };
