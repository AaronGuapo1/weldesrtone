const material = require("../models/materiales.js");

module.exports = async (req, res) => {
    let role = "viewer";

    if (req.session?.passport?.user != undefined) {
        role = req.session.passport.user.role;
    }

    if (role == "admin") {
        let materiales = await material.find({});

        const texto = req.body.busqueda;
        const filter = req.body.filtro;
        const filtrado = [];

        if (texto != "") {
            for (let material of materiales) {
                let nombre = material[filter].toLowerCase();

                console.log(texto);
                console.log(nombre);

                if (nombre.indexOf(texto.toLowerCase()) != -1) {
                    console.log("Aceptado");
                    filtrado.push(material);
                }
            }

            materiales = filtrado;
        }

        res.render("materiales", {
            materiales,
            roles: role,
            loggedIn: true,
        });
    } else {
        res.redirect("/");
    }
};
