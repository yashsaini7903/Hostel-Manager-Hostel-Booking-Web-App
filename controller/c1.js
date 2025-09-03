
let userModel=require("/Users/DELL/OneDrive/Desktop/hostelWebasitis/model/model.js")
let bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
exports.signin=async(req,res)=>{
     let body=req.body;
     // let salt=bcrypt.genSaltSync(10);
     // let hass_pass=bcrypt.hashSync(body.password,salt);
     // console.log(hass_pass)
     let data=await userModel.findOne({username:body.username,password:body.password});
     console.log(body);
     console.log(data);
     if(data!=null){
          console.log(true);
          res.send(true);
     }
     else{
          console.log(false);
          res.send(false)
     }

}
exports.signup=async(req,res)=>{
     
     // let salt=bcrypt.genSaltSync(10);
     // let hash_pass=bcrypt.hashSync(body.password,salt);
     // console.log(hash_pass);
     let{username,password,name,email,roll_no} = req.body;
     let usr=await userModel.findOne({"email":email});
     console.log(usr);
     if(usr!=null){
          res.send("usern name exist");
          return;
     }

     let pass=await userModel.findOne({"roll_no":roll_no});
     if(pass!=null){
          res.send("roll Nn already resistered");
          return;
     }
     let user=await userModel.create({
          username,
          email,
          roll_no,
          password,
          name
     });
     console.log(user);
     if(user!=null){
          let token = jwt.sign({email:email,userid: user._id},"shhhhh");
            res.cookie("token",token);
          res.redirect('/dashboard',{user})
     }
     else{
          res.send(false)
     }
}
