const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config();
const passport = require('./auth');


const bodyParser = require('body-parser')
app.use(bodyParser.json());  // doing this, it will store converted data into req.body 
const PORT = process.env.PORT || 3000;

//Middleware function
const logRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`);
    next();   //move on to the next phase
}

//apply middleware to all routes
app.use(logRequest);

//apply passport for route
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false})

app.get('/', function(req, res) {
    res.send('Hello World! Welcome to the plastic server...')
})


//import routers
const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')

//use routers
app.use('/person',personRoutes)
app.use('/menu',menuRoutes)


app.listen(PORT, () => {
    console.log("Server is live now");
})




