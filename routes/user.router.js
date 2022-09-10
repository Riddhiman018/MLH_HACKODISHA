const express = require('express')
const usrschema = require('../model/user.mongo')
const bcrypt = require('bcrypt')
const router = express.Router()
router.use(express.json())
router.get('/hello',(req,res)=>{
    console.log(__dirname)
    res.send('Hello')
})
router.post('/register',async (req,res,next)=>{
    //username
    try {
        const usr = await usrschema.findOne({
            username:req.body.username
        })
        //case if user already exists
        if(usr){
            res.status(404).send({
                Message:'User already exists'
            })
        }
        else{
            next()
        }
    } catch (error) {
        res.status(500).send({
            Message:error.message
        })
    }
},async (req,res)=>{
    try {
        const email = req.body.username
        //encrypting
        const salt = await bcrypt.genSalt()
        const hashedpwd = await bcrypt.hash(req.body.password,salt)
        const usr = new usrschema({
            username:email,
            password:hashedpwd
        })
        //saving user to mongoDB
        const r = await usr.save()
        if(r){
            res.status(200).send({
                Message:'New User Created'
            })
        }
    } catch (error) {
        res.status(500).send({
            Message:`Unknown Error with Message : ${error.message}`
        })
    }
})
router.post('/login',async (req,res,next)=>{
    //get username
    try {
        const usr = await usrschema.findOne({
            username:req.body.username
        })
        //checking user email verification status and registration status
        if(usr){
            req.body.ur_pwd = usr.password
            req.body.ver_status = usr.EMAIL_VERIFIED
            next()
        }
        else{
            res.status(404).send({
                Message:'User Not Registered'
            })
        }
    } catch (error) {
        res.status(500).send({
            Message:`Unknown Error with Message : ${error.message}`
        })
    }
},async (req,res)=>{
    try{
        //password comparison
        const result = await bcrypt.compare(req.body.password,req.body.ur_pwd)
        if(result){
            res.status(200).send({
                Message:'User verified'
            })
        }
        else{
            res.status(404).send({
                Message:'User not allowed'
            })
        }
    }catch(error){
        res.status(500).send({
            Message:`Unknown error with Message : ${error.message}`
        })
    }
})
module.exports = router
