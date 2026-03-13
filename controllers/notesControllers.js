const Note = require('../models/notes')

const getNotes = async (req, res) => {
    try{
        const note = await Note.find()
        res.status(200).json(note)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const getNote = async (req, res) => {
    try{
        const note = await Note.findById(req.params.id)
        if(!note){
            return res.json(404).json({message: 'Title and content is not existed'})
        }
        res.status(200).json(note)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const addNote = async (req, res) => {
    try{
        const newNote = await Note.create({
            title: req.body.title,
            content: req.body.content
        })

        res.status(201).json({message: 'Note successfully added', newNote})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const updateNote = async (req, res) => {
    try{
        const note = await Note.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title, content: req.body.title
            },
            {
                new: true, runValidators: true
            }
        )

        if(!note){
            return res.status(404).json({message: 'Note is not existed'})
        }
        res.status(200).json(note)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const delNote = async (req, res) => {
    try{
        const note = await Note.findByIdAndDelete(req.params.id)
        if(!note){
            return res.status(404).json({message: 'note is not existed'})
        }

        res.status(200).json({message: 'note successfully deleted'})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports = {
    getNotes,
    getNote,
    addNote,
    updateNote,
    delNote
}

