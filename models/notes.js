const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required:[true, 'title is requires'],
        trim: true
    },
    content: {
        type: String,
        required: [true, 'content is required'],
        lowercase: true,
        trim: true
    }
}, {timestamps: true})

const Note = mongoose.model('Note', noteSchema)

module.exports= Note