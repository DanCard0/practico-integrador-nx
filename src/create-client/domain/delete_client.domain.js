// const { FaultHandled } = require('ebased/util/error');
const { deleteClientValidation } = require('../schema/input/delete_client.input');

const { deleteClient } = require('../service/delete-client.service');

module.exports = async (commandPayload, commandMeta) => {
    new deleteClientValidation(commandPayload, commandMeta);
    const { dni } = commandPayload;
    const client = await deleteClient({
        dni
    }, commandMeta);
    return {
        status: 200,
        body: client,
    };
}
