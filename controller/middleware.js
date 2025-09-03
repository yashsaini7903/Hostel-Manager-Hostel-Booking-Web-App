
let fs=require("fs");
let pdf=require("pdf-parse");
const { connected } = require("process");
let cloudinary=require("cloudinary").v2;
function extractField(text, fieldName) {
    const regex = new RegExp(`${fieldName}\\s*:\\s*(.+)`);
    const match = text.match(regex);
    return match ? match[1].trim() : null;
  }
  
exports.m1=async(req,res,next)=>{
    let file=req.file;
    if(!file){
        console.log("file does not exist ");
        return;
    }
    console.log(file.path);
    console.log(file);
    console.log(req.body)
    let body=req.body;
    console.log(body.admno);
    let str="upload/"+body.admno+".pdf";
    try{
    let path=await file.path;
    let buffer=fs.readFileSync(path);
     let readdata=await pdf(buffer);
     const name = await extractField(readdata.text, "Name");
     const roll = await extractField(readdata.text, "Roll NO");
     const status = await extractField(readdata.text, "Status");
    await fs.promises.rename(path,str);
    if(body.admno!=roll){
        fs.unlinkSync(str);
        res.send("wrong roll no entered");
        return;
    }
    console.log(status);
     req.dt={
        path:str,
        roomno:body.roono,
        admno:roll,
        hostelnm:body.hostelnm,
        name:name,


    }
    }catch(err){
        console.log("error in recieving the file");
      fs.unlinkSync(str);
        console.log(err);
    }
    next();

}
exports.cloudnry=async(req,res)=>{
    try{
    cloudinary.config({ 
        cloud_name: 'dayvf7ugs', 
        api_key: '682215271415542', 
        api_secret: 'U6m71klfo3p3UfG3iGEIRW-6Hxo'
      });
      console.log(req.dt)
      let str=req.dt.path.split("/")
     let upd=await cloudinary.uploader.upload(req.dt.path,
        {
            resource_type:"auto",
            public_id:str[1],
            overwrite:true
        }
     );
     console.log(upd);
  
    }catch(err){
        console.log("error in uploading the file to cloud")
    }
    fs.unlinkSync(req.dt.path);
    res.send("uploaded succesfully and booked sucesfully");
}
