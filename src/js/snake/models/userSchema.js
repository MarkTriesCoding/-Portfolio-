const mongoose = require('mongoose')
// const validator = require('validator')
// const passportLocalMongoose = require('passport-local-mongoose')

 const { Schema } = mongoose;

  const userSchema = Schema({
   username:  {
      type:String,
      required:[true,"name is required"],
      unique:true,
      index:true,
      maxlength:20,
      minlength:3,
      match: /^\S\D*$/

    }, // String is shorthand for {type: String}
   // email: {
   //    type:String
   //    // required:[true,"email is required"],
   //    // validate:[validator.isEmail,"Please provide valid email address"],
   //
   //    },
   // password:   {
   //      type:String,
   //      required:[true,"password is required"]
   //    },
   highScore: {type:Number,default:0},
   // timesLoggedIn: {type:Number,default:0}
 })
// })
//
// userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('User',userSchema)
