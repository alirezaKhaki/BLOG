const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const views = new Schema({
    ip: {
        type: String,
        required: true,
    },
    article: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Article'
    }
});



module.exports = mongoose.model('Views', views);