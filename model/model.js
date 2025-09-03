

let mongoose=require("mongoose");
let schema=mongoose.Schema({
    "username":{
        type:String

    },
    "email":{
        type:String
    },
    "roll_no": {
  type: Number,
  required: true,
  unique: true
},

    "password":{
        type:String,
        required:true
    },
    "name":{
        type:String
    }
})
module.exports=mongoose.model("auth",schema);