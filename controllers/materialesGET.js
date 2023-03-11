const material = require("../models/materiales.js");

module.exports = async (req, res) => {
    let role = "viewer";

    if (req.session?.passport?.user != undefined) {
        role = req.session.passport.user.role;
    }

    if (role == "admin" || role == "Cotización" || role == "Ventas" || role == "Proyectos") {
        //console.log(page)
        const materiales = await material.find({});

        res.render("materiales", {
            materiales,
            roles: role,
            loggedIn: true,
            status: req.params.status,
        });
    } else {
        res.redirect("/");
    }
}