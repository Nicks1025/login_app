var express = require("express")
var router = express.Router()

const credentials = {
    email : "Admin@gmail.com",
    password:"Admin123"
}

router.post("/login",(req,res) => {
    if(req.body.email == credentials.email && req.body.password == credentials.password){
        req.session.user = req.body.email;
        res.redirect("/route/dashboard")
        // res.end("login successful")
    }
    else{   
        res.end("Invalid Username");
    }
})


router.get("/dashboard",(req,res) => {
    if(req.session.user) {
        res.render('dashboard',{user:req.session.user})
    }
    else{
        res.send("Unauthorized user")
    }
})

router.get("/logout", function(req,res) {
    req.session.destroy(function(err) {
        if(err){
            console.log(err);
            res.send("Error");
        }
        else{
            res.render("base",{
                title:"Express",logout:"logout Successfully"
            })
        }
    })
})
module.exports = router