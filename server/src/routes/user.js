const User = require('../models/user')
const express=require('express')
const router=express.Router()
const UserController = require('../controllers/user')
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/avatar/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })
router.post('/register', UserController.registerNewUser)

router.post('/login', UserController.loginUser)

    router.post('/users/:id', upload.single('avatar'), UserController.uploadImage)
    // router.delete('/users/:id',UserController.deleteUserById)
   
     router.get('/users/:id',  UserController.getUserById)
     
     router.put('/account/:id', UserController.updateUserDetailsById)

   module.exports = router