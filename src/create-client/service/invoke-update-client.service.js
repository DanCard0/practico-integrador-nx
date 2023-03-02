const config = require('ebased/util/config');
const lambda = require('ebased/service/downstream/lambda')

const LAMBDA_CREATE = config.get('LAMBDA_CREATE');

const updateClientInvoke = async (updateClientInvoke) => { 
    const { data, eventMeta } = updateClientInvoke.get();
    const invokeLambdaParams = {
        FunctionName: LAMBDA_CREATE,
        InvocationType: 'RequestResponse',
        LogType: 'None',
        Payload: data,
    };
    await lambda.invokeAsync(invokeLambdaParams, eventMeta);
}

module.exports = { updateClientInvoke };

