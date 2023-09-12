const User = require('../models/user')
const express=require('express')
const router=express.Router()
const UserController = require('../controllers/user')

router.post('/register', UserController.registerNewUser)

router.post('/login', UserController.loginUser)


    
    // router.delete('/users/:id',UserController.deleteUserById)
   
     router.get('/users/:id', UserController.getUserById)
     
     router.put('/account/:id', UserController.updateUserDetailsById)

   module.exports = router