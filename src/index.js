const express = require('express');
require('dotenv').config()
require('./DB/db')
const app = express();

const port = process.env.PORT;

const reporterRoutes = require('./Routes/reporter')
const newsRoutes = require('./Routes/news')
app.use(express.json())
app.use(reporterRoutes)
app.use(newsRoutes)

app.get('/', (req, res) => {


    return res.status(200).send({ message: 'done' })
})


app.listen(port, () => {

    console.log('running ' + port)
})