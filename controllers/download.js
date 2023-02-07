module.exports= async (req,res)=>
{
    const IdTransaccion = req.query.IdTrans

    res.download('pdfs/'+IdTransaccion+'.pdf');
    res.redirect('/factura?IdTrans='+IdTransaccion)

}