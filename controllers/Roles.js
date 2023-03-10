const User = require("../models/User.js")

module.exports = async (req, res) => {



await User.updateOne({_id:req.body.UsuarioId},{ $set: { role:req.body.Roles } })    
console.log(req.body)

res.redirect('/PanelUsuarios')
}
