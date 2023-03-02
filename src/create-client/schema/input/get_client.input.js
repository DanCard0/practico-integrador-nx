const { InputValidation } = require("ebased/schema/inputValidation");

class getClientValidation extends InputValidation { 
    constructor(payload, meta) { 
        super({
            status: meta.status,
            payload: payload,
            source: "GET.CLIENT",
            specversion: "v1.0.0",
            schema: {
                strict: false,
                dni: {
                    type: String,
                    required: true
                }
            }
        })
    }
}

module.exports = { getClientValidation };
