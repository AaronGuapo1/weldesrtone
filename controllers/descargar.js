const PdfPrinter = require("pdfmake")
const fs = require("fs")
const fonts = require("../pdf/fonts")
const styles = require("../pdf/styles")
const Compra = require("../models/compra");
const download = require("download")
//const {content} = require("../pdf/pdfContent")

module.exports = async (req, res) =>{
    const IdTransaccion = req.query.IdTrans
    const PdfDescargar = await Compra.find({Id_transaccion:IdTransaccion})
    const {ProductosComprados} =PdfDescargar[0];
    const productos =[];
    for(let i=0; i<ProductosComprados.length; i++){
        //productos.push("Nombre del producto:"+ " "+ ProductosComprados[i].nombre + " "+"Precio:"  + " " +ProductosComprados[i].precio+ " " + "Cantidad:"+ " "+ ProductosComprados[i].cantidad);
        productos.push("Nombre del producto:"+ " "+ ProductosComprados[i].nombre);
        productos.push("Precio:"  + " " +ProductosComprados[i].precio);
        productos.push("Cantidad:"+ " "+ ProductosComprados[i].cantidad);

    }
    console.log(productos)
    let docDefinition ={
        content:[{text:"Factura", style:"header"},
        "Id de la transacción" +" "  +PdfDescargar[0].Id_transaccion,
        "Fecha de la compra:" +" "  + PdfDescargar[0].Fecha_compra,
            
            "Productos comprados:", 
            productos
        
          ,
        
     
        "Precio total:" +" " +PdfDescargar[0].PrecioTotal,

        "Nombre del comprador:" +" " +PdfDescargar[0].Nombre_comprador+" "+PdfDescargar[0].Apellidos_comprador,
        "Correo del comprador"+ +" " +PdfDescargar[0].Correo_comprador,
    ],
        
        styles:styles
    }

    const printer = new PdfPrinter(fonts);

    let pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream('pdfs/'+IdTransaccion+'.pdf'));
    pdfDoc.end();
    
    

   res.download('pdfs/'+IdTransaccion+'.pdf');

    //res.redirect('/factura?IdTrans='+IdTransaccion)

}

