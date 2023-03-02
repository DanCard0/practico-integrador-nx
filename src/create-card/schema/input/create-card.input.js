const { InputValidation } = require('ebased/schema/inputValidation');

class assignCardTopicValidation extends InputValidation {
    constructor(payload, meta) {
        super({
            status: meta.status,
            payload: payload,
            type: 'ASSIGN.CREDITCARD',
            specversion: 'v1.0.0',
            schema: {
                strict: false,
                isValid: { type: Boolean, required: true },
                age: { type: Number, required: true },
                dni: { type: String, required: true },
                birthday: { type: String, required: true }
            }
        })
    }
}

module.exports = { assignCardTopicValidation };
