const express = require('express')
const router = express.Router()
const protect = require('../middleware/authmiddleware')

const{ 
    getNotes,
    getNote,
    addNote,
    updateNote,
    delNote
} = require('../controllers/notesControllers')

router.get('/',protect,  getNotes)
router.get('/:id',protect, getNote)
router.post('/',protect, addNote)
router.put('/:id',protect, updateNote)
router.delete('/:id',protect, delNote)

module.exports = router