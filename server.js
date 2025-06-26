const express = require('express')
const app = express()
const db = require('./db')

const bodyParser = require('body-parser')
app.use(bodyParser.json());  // doing this, it will store converted data into req.body 

//import routers
const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')

//use routers
app.use('/person',personRoutes)
app.use('/menu',menuRoutes)


app.get('/', (req, res) => {
    res.send('Hello World! Welcome to the plastic server...')
})


app.listen(3000, () => {
    console.log("Server is live now");
})




