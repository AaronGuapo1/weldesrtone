const User = require("../models/User.js")

module.exports = async (req, res) => {
    let role = "viewer";
    let logged = false; 
    if(req.session?.passport?.user != undefined){
        role = req.session.passport.user.role;
        logged = true;
    }
    const usuarios = await User.find({});

    res.render('PanelUsuarios',{usuarios,roles: role, loggedIn: logged})


}

//db.test.find().sort({ firstName: 1 }).collation({ locale: "en", caseLevel: true })