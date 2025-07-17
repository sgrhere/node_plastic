const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');  // adjust the path as needed

//passport.js- local strategy
passport.use(new LocalStrategy(async  (USERNAME, password, done)=>{
    //authentication logic here
    try {
        // console.log("Received Credentials",USERNAME,password);
        const user = await Person.findOne({username: USERNAME})
        if(!user){
            return done(null,false, {message: 'Incorrect Username'});
        }
        const isPasswordMatch =await user.comparePassword(password);
        if(isPasswordMatch){
            return done(null,user);
        }
        else{
            return done (null,false,{message: "Incorrect Password"})
        }
    } catch (error) {
        return done (error);
    }
}))

module.exports = passport; // export configured passport