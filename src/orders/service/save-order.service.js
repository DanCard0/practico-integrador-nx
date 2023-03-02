const config = require('ebased/util/config');
const dynamo = require('ebased/service/storage/dynamo');

const PURCHASES_TABLE = config.get('PURCHASES_TABLE');

const saveNewOrder = async (saveOrder) => {
    const { id, dni, dataPurchases, eventMeta } = saveOrder;
    const params ={
        "TableName": PURCHASES_TABLE,
        "Item": {
            id,
            dni,
            dataPurchases
        },
        ReturnConsumedCapacity: "TOTAL",
    }
    
    await dynamo.putItem(params, eventMeta)
}

module.exports = { saveNewOrder };
