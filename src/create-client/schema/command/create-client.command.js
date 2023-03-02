const { DownstreamCommand } = require("ebased/schema/downstreamCommand");

class SaveClientValidation extends DownstreamCommand  { 
    constructor(payload, meta) { 
        super({
            type: 'SAVE_CLIENT',
            specversion: 'v1.0.0',
            payload: payload,
            meta: meta,
            schema: {
                dni: {
                    type: String,
                    required: true
                },
                name: {
                    type: String,
                    required: true 
                },
                lastName: {
                    type: String,
                    required: true 
                },
                birthday: {
                    type: String,
                    required: true 
                }
            },
            responseSchema: {
            strict: false,
            data: { type: Object, required: true }
        },
        errorCatalog: {}
        })
    }
}
module.exports = { SaveClientValidation };