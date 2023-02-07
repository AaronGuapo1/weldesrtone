const Compra = require("../models/compra");

module.exports = async (req, res) =>{
    let role = "viewer";

    if (req.session?.passport?.user != undefined) {
        role = req.session.passport.user.role;
       const IdUsuario = req.session.passport.user.id;
       const IdTransaccion = req.query.IdTrans
       const compra = await Compra.find({})
    res.render('factura',{IdUsuario, compra, roles: role,loggedIn: true,IdTransaccion})
      
}



}