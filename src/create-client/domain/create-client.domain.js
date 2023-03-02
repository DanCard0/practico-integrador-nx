// const { FaultHandled } = require('ebased/util/error');
const { CreateClientValidation } = require('../schema/input/create-client.input');

const { validateAge } = require('../helper/age-validation.helper');
const { saveClientDynamo } = require('../service/create-client.service');

const { TopicClientValidation  } = require('../schema/event/create-client.event');
const { clientsCreationTopic } = require('../service/create-notify.service');

module.exports = async (commandPayload, commandMeta) => {
  new CreateClientValidation(commandPayload, commandMeta);
  const { dni, name, lastName, birthday } = commandPayload;
  let validatedInfo = await validateAge(birthday);
  
  if (!!validatedInfo.isValid) {
    let saveClient = await saveClientDynamo({
      dni,
      name,
      lastName,
      birthday
    }, commandMeta);
    
    validatedInfo.dni = dni;
    validatedInfo.birthday = birthday;
    await clientsCreationTopic(new TopicClientValidation(validatedInfo, commandMeta));
    
    return {
      statusCode: 200,
      body: JSON.stringify('Proceso de creacion exitoso.', + saveClient),
    };
  } else { 
    return  {
        statusCode: 401,
        body: JSON.stringify('Proceso de creacion fallido, valide los datos suministrados'),
    };
  }
}
