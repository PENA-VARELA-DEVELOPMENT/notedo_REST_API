const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Note", noteSchema);