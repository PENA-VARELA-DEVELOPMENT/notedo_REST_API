const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notedoSchema = new Schema({
    userID: {
        type: Schema.ObjectId,
        ref: "user"
    },
    note: [{
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
        },
        color: {
            type: String,
            required: true
        }
    }],
    todo: [{
        title: {
            type: String,
            required: true,
            trim: true
        },
        body: {
            type: String
        },
        status: {
            type: Boolean
        },
        lastModified: {
            type: Date,
            default: Date.now
        },
        color: {
            type: String,
            required: true
        }
    }]
})

module.exports = mongoose.model("notedo", notedoSchema);