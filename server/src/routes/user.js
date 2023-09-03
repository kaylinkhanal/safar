const User = require('../models/user')
const express=require('express')
const router=express.Router()
const UserController = require('../controllers/user')

router.post('/register', UserController.registerNewUser)

router.post('/login', UserController.loginUser)

    
    router.put('/users/:id', UserController.editUserById)
    router.delete('/users/:id',UserController.deleteUserById)
   
     router.get('/users/:id', UserController.getUserById)

   module.exports = router