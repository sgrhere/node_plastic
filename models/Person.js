const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
// Define the Person schema

const personSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    age : {
        type: Number,
    },
    work:{
        type: String,
        enum: ['chef','manager','waiter'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique : true
    },
    address: {
        type: String,
        required: true
    },
    salary:{
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

//save password in hashed format
personSchema.pre('save', async function(next){
    const person = this;
    //hash the password only if it has been modified (or in new)
    if(!person.isModified('password')) return next();
    try {
        //hash password generation
        const salt = await bcrypt.genSalt(10);      //generate salt

        //hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);

        //override plain password with the hashed one
        person.password = hashedPassword;
        next();
    } catch (error) {
        return next(error)
    }
})

//created a comparePassword function to validate the password
personSchema.methods.comparePassword = async function (candidatePassword){
    try {
        // use bcrypt to compare theprovided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

// Create Person model
const Person = mongoose.model('Person',personSchema);
module.exports= Person;
