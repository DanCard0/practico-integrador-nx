const config = require('ebased/util/config');
const dynamo = require('ebased/service/storage/dynamo');

const CLIENTS_TABLE = config.get('CLIENTS_TABLE');

const getAllClient = async (getAllClient) => { 
    const { data, eventMeta } = getAllClient;
    let params = { 
        TableName: CLIENTS_TABLE
    };
    
    return await dynamo.scanTable(params, eventMeta);
}

module.exports = { getAllClient };
