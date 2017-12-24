const db = require('../utils/database');
const schema = new db.Schema({
    goodsname: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    count: {
        type: String,
        required: true
    },
    num: {
        type: String,
        require: true
    },
    goodslogo: {
        type: String,
        required: true
    }
})
const Good = db.model('goods',schema);
module.exports = Good;