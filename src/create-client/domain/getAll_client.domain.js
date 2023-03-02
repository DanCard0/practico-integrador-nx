// const { FaultHandled } = require('ebased/util/error');

const { getAllClient } = require('../service/getAll-client.services');

module.exports = async (commandPayload, commandMeta) => {
    const clientsList = await getAllClient({}, commandMeta);
    
    return {
        status: 200,
        body: clientsList,
    };
};
