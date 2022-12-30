module.exports = (req, res) =>{
    if(req.isAuthenticated()){
        res.redirect("/");
    } else{
        res.render("registrarse");
    }
}