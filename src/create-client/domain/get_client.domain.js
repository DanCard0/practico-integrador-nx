// const { FaultHandled } = require('ebased/util/error');
const { getClientValidation } = require('../schema/input/get_client.input');

const { getClient } = require('../service/get-client.services');

module.exports = async (commandPayload, commandMeta) => {
    new getClientValidation(commandPayload, commandMeta);
    
    const { dni } = commandPayload;
    const client  = await getClient({
        dni
    }, commandMeta);
    
    return {
        status: 200,
        body: client,
    };
};
