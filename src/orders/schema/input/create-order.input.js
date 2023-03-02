const { InputValidation } = require('ebased/schema/inputValidation');

class CreateOrderValidation extends InputValidation { 
    constructor(payload, meta) { 
        const productSchema = {
            productName: {
                type: String,
                required: true
            },
            originalPrice: {
                type: Number,
                required: true
            },
        };
        
        super({
            type: "CREATE.ORDER",
            specversion: "v1.0.0",
            source: meta.source,
            payload: payload,
            schema: {
                dni: {
                    type: String,
                    required: true
                },
                purchasedProducts: {
                    type: [productSchema]
                },
            },
        });
    }
}

module.exports = { CreateOrderValidation };
