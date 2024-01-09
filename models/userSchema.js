const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const Order = require('./orderSchema.js')
//==============================================================================
const userSchema = new mongoose.Schema({       

    userName: {
        types: String,
        required: true,
        trim: true,
        min: 3,
        max: 25
    },
    mobileNumber: {
        types: String,
        required: true,
        unique: true, 
        validate: {
          validator: function (value) {
            return /^\d{10}$/.test(value);
          },
          message: props => `${props.value} is not a valid mobile number! Please enter a 10-digit number.`,
        }
    },
    email: {
        types: String,
        unique : true
    },
    hash_password: {
        types: String,
        required: true,
    },
    address : [
        {
        types : String,
        required : true,
        }
    ],
    isAdmin : {
        types : Boolean,
        default : false
    },
    orders : [{
            types : mongoose.Schema.Types.ObjectId,
            ref : Order
       }]
},
{timeStamps: true});

userSchema.virtual("password").set(function (password){
    this.hash_password = bcrypt.hashSync(password, 10);
});

// userSchema.virtual("fullName").get(function() {
//     return `${this.userName}`;
// });
userSchema.methods = {
    authenticate: function (password){
        return bcrypt.compareSync(password, this.hash_password);
    }
};
//===================================================================================

module.exports = mongoose.model('User', userSchema);                          
             