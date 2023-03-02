// const { ErrorHandled } = require('ebased/util/error');
const { UpdateClientValidation } = require('../schema/input/update-client.input');
const { getClient } = require('../service/get-client.services');

const { TopicClientValidation  } = require('../schema/event/create-client.event');
const { clientsCreationTopic } = require('../service/create-notify.service');

const { validateAge } = require('../helper/age-validation.helper');
const { updateClient } = require('../service/update-client.service');

module.exports = async (commandPayload, eventMeta) => {
    new UpdateClientValidation(commandPayload, eventMeta);
    const { dni, name, lastName, birthday } = commandPayload;
    
    const client = await getClient({
        dni
    }, eventMeta);

    if (!!client && !!client.Item) {
        let validatedInfo = await validateAge(birthday);
        if (!validatedInfo.isValid) {
            return {
                statusCode: 400,
                body: JSON.stringify('La edad ingresada del cliente no es válida'),
            }
        }

        const updatedClient = await updateClient({
            dni,
            name,
            lastName,
            birthday
        }, eventMeta);
        validatedInfo.dni = dni;
        validatedInfo.birthday = birthday;
        let commandMeta = eventMeta;
        
        await clientsCreationTopic(new TopicClientValidation(validatedInfo, commandMeta));
        
        return {
            statusCode: 200,
            body: JSON.stringify('Proceso de actualizacion exitoso.', + updatedClient),
        }

    } else {
        return {
            statusCode: 401,
            body: JSON.stringify('No se encontró un cliente con el dni especificado'),
        };
    }
}
