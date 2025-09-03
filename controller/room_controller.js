
const { hash } = require("bcrypt");
let db=require("../model/room_bookmodel.js")
let fs=require("fs");
exports.room_book=async(req,res,next)=>{
 let body=req.dt??0;
 let roomno=body.roomno??0;
 let name=body.name??0;
 let roll_no=body.admno??0;
 branch="ece";
 let quant=[
    {
    name:"harsh",
    count:300
    },
    {
        name:"bhagat",
        count:230
    }
]
//  let branch=body.branch;
 let hostelname=body.hostelnm;
 let booked_room=await db.findOne({"room_no":roomno});
let room=0;
let cnt=0;
let count="";
let maxroom=0;
quant.map(({name,count})=>{
    if(name==hostelname){
       maxroom=count;
    }
    })
if(roomno>maxroom){
    console.log(roomno);
     fs.unlink(req.dt.path);
     res.send("invalid room no");
    return;
}

if(booked_room==null){
    cnt=1;
    room=roomno;
   count= "stud"+cnt;
    let dt=await db.insertOne({"room_no":room,
        "hostel_nm":hostelname,
        [count]:{
        "name":name,
        "branch":branch,
        "roll_no":roll_no,
    
       },
    "total_stud":cnt,
    "room_no":room
    
    })
    }
else{
    cnt=booked_room.total_stud+1
    count="stud"+cnt
    console.log(count);
 if(booked_room.occupied==true){
    fs.unlinkSync(req.dt.path)
   res.send("room already full");  

   return;        
}

let check_usr=await db.findOne({$or:[
    {"stud1.roll_no":roll_no},
    {"stud2.roll_no":roll_no},
    {"stud3.roll_no":roll_no}

]});
console.log(check_usr);
if(check_usr!=null){
    fs.unlinkSync(req.dt.path)
    res.send("already exist");
    return;
}
if(cnt<=3){
    let occ=false;
    if(cnt==3){
      occ=true
    }
   let dt=await db.updateOne({"room_no":booked_room.room_no},{$set:{[count]:{
    "name":name,
    "branch":branch,
    "roll_no":roll_no,

   },
"occupied":occ,
"total_stud":cnt

}})
console.log(dt);
console.log("room updated succesfully");

}

 




}
next();
}
