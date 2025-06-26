const mongoose =  require('mongoose');

// Define the MongoDB connection URL

const mongoURL = 'mongodb://localhost:27017/hotels'  // replace hotels with your db name

//Set up MongoDB connection

/* Old technique
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
*/

//New technique to setup mongodb connection
mongoose.connect(mongoURL)

// Get the default connection
// Mongoose maintains a default connection object representing the mongoDB connection.
const db = mongoose.connection;

// Define event listeners for database connection
 db.on('connected',() =>{
    console.log("Connected to mongoDB server");
 })

  db.on('error',(err) =>{
    console.log("MongoDB connection error:", err);
 })

  db.on('disconnected',() =>{
    console.log("MongoDB disconnected");
 })

 //Export the database connection

 module.exports = db