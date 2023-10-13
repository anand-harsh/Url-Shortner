const express=require('express')
const {handleUserSignUp}=require('../controllers/user.js')
const {handleUserLogin}=require('../controllers/user.js')
const router=express.Router()

router.post('/', handleUserSignUp)
router.post('/login', handleUserLogin)

module.exports=router