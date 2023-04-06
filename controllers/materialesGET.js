const material = require("../models/materiales.js");

module.exports = async (req, res) => {
    let role = "viewer";

    if (req.session?.passport?.user != undefined) {
        role = req.session.passport.user.role;
    }

    if (
        role == "admin" ||
        role == "Cotización" ||
        role == "Ventas" ||
        role == "Proyectos"
    ) {
        //console.log(page)
        const materiales = await material.find({});

        var familias = [];
        for (i = 0; i < materiales.length; i++) {
            familias.push(materiales[i].Familia);
        }
        const unicos = [...new Set(familias)];
        res.render("materiales", {
            unicos,
            materiales,
            roles: role,
            loggedIn: true,
            status: req.params.status,
        });
    } else {
        res.redirect("/");
    }
};
