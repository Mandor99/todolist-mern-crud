const { default: mongoose } = require("mongoose")
const db = require("mongoose")

const schema = new db.Schema({
    text: {type: String, required: true}
})

module.exports = mongoose.model('TodoModal', schema)