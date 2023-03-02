const { InputValidation } = require("ebased/schema/inputValidation");

class CreateClientValidation extends InputValidation { 
    constructor(payload, meta) { 
        super({
            status: meta.status,
            payload: payload,
            source: "CREATE.CLIENT",
            specversion: "v1.0.0",
            schema: {
                strict: false,
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
                },
                statusActive: {
                    type: Boolean
                }
            }
        })
    }
}

module.exports = { CreateClientValidation };
