
let express=require("express");
let mongoose=require("mongoose");
let bodyParser = require("body-parser");
const path = require("path");
let app=express();
app.set('view engine','ejs');
//app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/hostel_database");
let db=mongoose.connection;
db.once("open",()=>{
    console.log("database connected succesfully");
})
db.on("error",()=>{
    console.log("error occured in connecting database ");
})
require("./routes/r1")(app);
app.listen(3000,()=>{
    console.log("server started succesfully");
})
