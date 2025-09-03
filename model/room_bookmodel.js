
let mongoose=require("mongoose");
let schema=mongoose.Schema({
    'hostel_nm':{
      type:String,
      default:null,
      required:true
    },
    "room_no":{
    type:Number,
    default:0
    },
    "total_stud":{
     type:Number,
     default:0
    },
   "stud1":{
      type:{ "name":String,
       "branch":String,
       "rollno":Number,
      },
       default:null
    },
    "stud2":{
        type:{ "name":String,
            "branch":String,
            "rollno":Number,
           },
       default:null
    },
    "stud3":{
        type:{ "name":String,
            "branch":String,
            "rollno":Number,
           },
        default:null
     },
    "occupied":{
        type:Boolean,
        default:false,
    }
})
module.exports=mongoose.model("room_book_data",schema);
