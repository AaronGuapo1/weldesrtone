module.exports = async (req,res)=>{ 
const codigo= req.body.codigo;
if (codigo === "aaronguapo69"){
    res.render('Dinamita')

}else {
    res.redirect('/');
}
}