let controller=require("../controller/c1");
let book_controller=require("../controller/room_controller")
let middleware=require("../controller/middleware.js")
let multer=require("multer")
let upld=multer({dest:"upload/"})


module.exports=(app)=>{
    app.get("/", (req, res) => res.render("signup"));
    app.get("/login", (req, res) => res.render("login"));
    app.get("/dashboard",(req,res)=>{
        res.render("dashboard")
    });
    app.post("/login",controller.signin);
     app.post("/signup",controller.signup);
     app.post("/roombook",upld.single("file"),middleware.m1,book_controller.room_book,middleware.cloudnry);

}