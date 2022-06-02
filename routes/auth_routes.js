const {Router} = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require("express-validator");
const router = Router()

router.post(
    '/register',
    [
      check('email', 'invalid email').isEmail(),
      check('password', 'invalid password').isLength({min: 3})
    ],
async (req, res)=>{
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'invalid data registration '
            })
        }
        const {email, password} = req.body

        const candidate = await  User.findOne({email})

        if(candidate) {
            return res.status(400).json({message: 'user has already been created'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password:hashedPassword})

        await user.save()

        res.status(200).json({message: 'user has been created'})
    }catch (e){
        res.status(500).json({message: 'register error'})
    }
})

router.post('/login', async (req, res)=>{
    try{

    }catch (e){
        res.status(500).json({message: 'login error'})
    }
})

module.exports = router