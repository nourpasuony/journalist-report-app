const express = require('express')

const Route = express.Router()

const reporterController = require('../Controllers/reporter')

const Auth = require('../Middleware/Auth')
const multer = require('multer')




// create new reporter
Route.post('/reporter', reporterController.create)

// update 

Route.put('/reporter/:id', reporterController.update)

// delete
Route.delete('/reporter/:id', reporterController.deleteFun)

// profile
Route.get('/profile', Auth, reporterController.index)

// login

Route.post('/login', reporterController.login)

// logout


Route.delete('/logout', Auth, reporterController.logout)

// upload-image

const uploads = multer({
    limits: 2000000,

    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|jfif)$/)) {

            cb(new Error('Invalid Image Type'))
        }

        cb(null, true)
    }

})

Route.post('/upload-image', Auth, uploads.single('avatar'), reporterController.uploadImage)










module.exports = Route;