const { DownstreamEvent } = require("ebased/schema/downstreamEvent");

class TopicClientValidation extends DownstreamEvent  { 
    constructor(payload, meta) { 
        super({
            type: 'SAVE_CLIENT',
            specversion: 'v1.0.0',
            payload: payload,
            meta: meta,
            schema: {
                isValid: {
                    type: Boolean,
                    required: true
                },
                age: {
                    type: Number,
                    required: true 
                },
                dni: {
                    type: String,
                    required: true 
                },
                birthday: {
                    type: String,
                    required: true 
                }
            }
        })
    }
}

module.exports = { TopicClientValidation };
