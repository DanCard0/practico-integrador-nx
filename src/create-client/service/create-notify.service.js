const config = require('ebased/util/config');
const sns = require('ebased/service/downstream/sns');

const CLIENTS_CREATED_TOPIC = config.get('CLIENTS_CREATED_TOPIC');

const clientsCreationTopic = async (creationClientNotification) => {
    const { eventPayload, eventMeta } = creationClientNotification.get();
    const snsPublishParams ={
        TopicArn: CLIENTS_CREATED_TOPIC,
        Message: eventPayload
    }

    await sns.publish(snsPublishParams, eventMeta);
}

module.exports = { clientsCreationTopic };
