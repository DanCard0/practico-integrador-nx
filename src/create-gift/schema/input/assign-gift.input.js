const { InputValidation } = require('ebased/schema/inputValidation');

class AssignGiftValidation extends InputValidation {
    constructor(payload, meta) {
        super({
            status: meta.status,
            payload: payload,
            type: 'ASSIGN.GIFT',
            specversion: 'v1.0.0',
            schema: {
                strict: false,
                isValid: { type: Boolean },
                age: { type: Number },
                dni: { type: String, required: true },
                birthday: { type: String, required: true }
            },
        })
    }
}

module.exports = { AssignGiftValidation };
