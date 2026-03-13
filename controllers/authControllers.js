const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Auth = require('../models/auth')

const register = async (req, res) => {
    try{
        const{ name, email, password } = req.body;

    //this need to fullyfield
    if(!name || !email || !password){
        return res.status(400).json({message: 'all field must require'})
    }

    // check if the email is already existed
    const existEmail = await Auth.findOne({ email })
    if(existEmail){
        return res.status(400).json({message: 'email is already taken'})
    }

    
    const salt = await bcrypt.genSalt(10)
    const hashpass = await bcrypt.hash(password, salt)

    const user = await Auth.create({
        name,
        email,
        password: hashpass
    })

    res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    })
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const login = async (req, res) => {
    try{
        const{ email, password } = req.body

        if(!email || !password){
            return res.status(401).json({message: 'field must be inputted'})
        }

        const user  = await Auth.findOne({ email })
        if(!user){
            return res.status(401).json({message: 'Invalid Credentials'})
        }

        const ifMatch = await bcrypt.compare(password, user.password)
        if(!ifMatch){
            return res.status(401).json({message: 'Invalid credentials'})
        }

        const token = jwt.sign(
            {id: user._id, name: user.name},
            process.env.JWT_SECRET,
            {expiresIn: '14d'}
        )

        res.status(200).json({
            mesage: 'login successfully',
            token
        })

    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports = {
    register,
    login
}