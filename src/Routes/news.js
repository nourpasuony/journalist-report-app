const express = require('express')

const Route = express.Router()

const newsController = require('../Controllers/news')


const Auth = require('../Middleware/Auth')




// create new reporter
Route.post('/news', Auth, newsController.create)

// update 

Route.put('/news/:id', Auth, newsController.update)

// delete
Route.delete('/news/:id', Auth, newsController.deleteFun)

// all news
Route.get('/news', newsController.index)

// get one
Route.get('/news/:id', newsController.getOne)









module.exports = Route;