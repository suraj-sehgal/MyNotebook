const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { query, validationResult, body } = require('express-validator');

router.post('/',[
    body('email').isEmail(),
    body('name').isLength({min:3}),
    body('password','password must be atleast 5 characters').isLength({min:5}),
] , async (req,res)=>{

    //if there are errors, returns bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    let user =User.findOne({email : req.body.email});
    if(user){
        return res.status(400).json({errors : "Sorry, User with this email is already exists"});
    }
    user = await User.create ({
        name:req.body.name,
        password: req.body.password,
        email : req.body.email,
    })
    // .then(User => res.json(User))
    //   .catch(err =>{console.log(err)
    //     res.json({error:'Please enter a unique email', message : err.message})});


});

module.exports = router;