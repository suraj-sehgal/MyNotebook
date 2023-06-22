const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { query, validationResult, body } = require('express-validator');




//ROUTE 1: Get All the Notes using : GET "/api/notes/fetchallnotes".login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//ROUTE 2: Add a new note using : POST "/api/notes/addnote".login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {

        //if there are errors, returns bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, description, tag } = req.body;

        const note = new Notes({ title, description, tag, user: req.user.id });
        const savednote = await note.save();
        res.json(savednote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});

//ROUTE 3: Update an existing Note using : PUT "/api/notes/updatenote".login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        //create a newnote object
        const newNote = {};
        if(title){newNote.title =title};
        if(description){newNote.description =description};
        if(tag){newNote.tag =tag};

        //Find the note to be updated and update it
        let note =await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found!")};
        if(note.user.toString()!=req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note =await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true});
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//ROUTE 4: Delete an existing Note using : DELETE "/api/notes/deletenode". login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //Find the note to be updated and update it
        let note =await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found!")};

        if(note.user.toString()!=req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note =await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success":"Note has been deleted",note:note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;