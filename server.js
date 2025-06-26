const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config();

const bodyParser = require('body-parser')
app.use(bodyParser.json());  // doing this, it will store converted data into req.body 
const PORT = process.env.PORT || 3000;

//import routers
const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')

//use routers
app.use('/person',personRoutes)
app.use('/menu',menuRoutes)


app.get('/', (req, res) => {
    res.send('Hello World! Welcome to the plastic server...')
})


app.listen(PORT, () => {
    console.log("Server is live now");
})




