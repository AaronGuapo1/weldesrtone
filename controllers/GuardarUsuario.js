const passport = require("passport");
const User = require('../models/User.js');

module.exports = (req, res)=>{
    User.register({username: req.body.username, role: "costumer"}, req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.redirect("/registrarse");
        } else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/");
            })
        }
    })
}