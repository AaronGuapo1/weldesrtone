const Cotizaciones = require("../models/cotizaciones");
const pdfDescargar = require('../controllers/descargar')
const PdfPrinter = require("pdfmake")
const fs = require("fs")
const fonts = require("../pdf/fonts")
const styles = require("../pdf/styles")
const Product = require("../models/Productos");
const Material = require('../models/materiales.js');

module.exports = async (req, res) =>{

       const IdTransaccion = req.query.IdTrans
       //console.log( req.query.IdTrans)
       const materiales= await Material.find({})
       const PdfDescargar = await Cotizaciones.find({Id_transaccion: req.query.IdTrans})
       const {ProductosComprados} =PdfDescargar[0];
       var ProductosAgregar = [];
       var Almacen;
    Almacen = await Product.find({Codigo:req.query.codigo})

    ProductosAgregar.push(Almacen)



    ProductosAgregar[0][0] === Almacen

var productodatos =[];

for (d=0; d<ProductosComprados.length; d++){
if (ProductosComprados[d].codigo ===req.query.codigo ){

    productodatos.push(ProductosComprados[d])
}

}

const NomProd= productodatos[0].nombre
const CantidadProd= productodatos[0].cantidad
const precioProd= productodatos[0].precio
const unidadProd = productodatos[0].unidad
const Importe = CantidadProd*precioProd

const FechaCompra =PdfDescargar[0].Fecha_compra

var date =
FechaCompra.getFullYear() +
"-" +
(FechaCompra.getMonth() + 1) +
"-" +
FechaCompra.getDate();

var caduca =
FechaCompra.getFullYear() +
"-" +
(FechaCompra.getMonth() + 2) +
"-" +
FechaCompra.getDate();
const codigo = productodatos[0].codigo

var imagen;

if(productodatos[0].image === "" || productodatos[0].image === undefined){

    imagen = '/images/productos/PorDefecto.jpg'
}else{
    imagen = productodatos[0].image.toString()

}

const productosMaterialesDescripcion =[];
       try{

       for(let i=0; i<ProductosAgregar[0][0].MaterialesProductos.length; i++){

        productosMaterialesDescripcion.push(ProductosAgregar[0][0].MaterialesProductos[i].Descripcion,'\n\n')


       }
    }catch(e){
        console.log(error)
    }
    
 
       const productosMaterialesCodigo =[];
       try{
  
       for(let i=0; i<ProductosAgregar[0][0].MaterialesProductos.length; i++){

        productosMaterialesCodigo.push(ProductosAgregar[0][0].MaterialesProductos[i].Codigo , '\n\n')

       }
    }catch(e){
        console.log(error)
    }
       const productosMaterialesCantidad =[];
       try{

       for(let i=0; i<ProductosAgregar[0][0].MaterialesProductos.length; i++){

        productosMaterialesCantidad.push(ProductosAgregar[0][0].MaterialesProductos[i].cantidad , '\n\n')


       }
    }catch(e){
        console.log(error)
    }
       const ProductosMaterialesPrecio =[]

       try{

       for(j=0; j<materiales.length; j++){

       for(i=0; i<ProductosAgregar[0][0].MaterialesProductos.length; i++){
        if(ProductosAgregar[0][0].MaterialesProductos[i].Descripcion === materiales[j].Descripcion ){

            ProductosMaterialesPrecio.push(materiales[j].PrecioUnitario, '\n\n')

        }

       }

    }
}catch(e){
    console.log(error)
}

    var PreciosMateriales =[]
       try{

for (b=0; b<ProductosMaterialesPrecio.length; b++){
    if (ProductosMaterialesPrecio[b] !== '\n\n'){
        PreciosMateriales.push(ProductosMaterialesPrecio[b].toFixed(2), '\n\n')

    }

}

}catch(e){
    console.log(error)
}

    const ProductosMaterialesUnidad =[]

    try{

    for(j=0; j<materiales.length; j++){

    for(i=0; i<ProductosAgregar[0][0].MaterialesProductos.length; i++){
     if(ProductosAgregar[0][0].MaterialesProductos[i].Descripcion === materiales[j].Descripcion ){

        ProductosMaterialesUnidad.push(materiales[j].Unidad, '\n\n')

     }

    }

 }
}catch(e){
    console.log(error)
}


const ImporteMaterial=[]
try{

for(i=0; i<ProductosMaterialesPrecio.length; i++){
if(ProductosMaterialesPrecio[i] >0 && ProductosMaterialesPrecio[i] !== '\n\n' && productosMaterialesCantidad[i]>0 && productosMaterialesCantidad[i] !=='\n\n'){
    ImporteMaterial.push(ProductosMaterialesPrecio[i]*productosMaterialesCantidad[i])
}
}
}catch(e){
    console.log(error)
}

var ImporteMateriales=[]
try{

for (a =0; a<ImporteMaterial.length; a++ ){
ImporteMateriales.push(ImporteMaterial[a].toFixed(2), '\n\n')
}
}catch(e){
    console.log(error)
}
 const productosPinturaDescripcion =[];
 try{

 for(let i=0; i<ProductosAgregar[0][0].PinturaProductos.length; i++){

    productosPinturaDescripcion.push(ProductosAgregar[0][0].PinturaProductos[i].Descripcion, '\n\n')


 }
}catch(e){
    console.log(error)
}
 const productosPinturaCodigo =[];
 try{

 for(let i=0; i<ProductosAgregar[0][0].PinturaProductos.length; i++){

    productosPinturaCodigo.push(ProductosAgregar[0][0].PinturaProductos[i].Codigo ,'\n\n')

 }
}catch(e){
    console.log(error)
}
 const productosPinturaCantidad =[];
 try{

 for(let i=0; i<ProductosAgregar[0][0].PinturaProductos.length; i++){

    productosPinturaCantidad.push(ProductosAgregar[0][0].PinturaProductos[i].cantidad , '\n\n')

 }
}catch(e){
    console.log(error)
}

 const ProductosPinturasPrecio =[]
 try{

 for(j=0; j<materiales.length; j++){

 for(i=0; i<ProductosAgregar[0][0].PinturaProductos.length; i++){
  if(ProductosAgregar[0][0].PinturaProductos[i].Descripcion === materiales[j].Descripcion ){

    ProductosPinturasPrecio.push(materiales[j].PrecioUnitario, '\n\n')

  }

 }

}
}catch(e){
    console.log(error)
}


console.log(ProductosPinturasPrecio)
var PreciosPintura =[]
try{

for (b=0; b<ProductosPinturasPrecio.length; b++){
    if (ProductosPinturasPrecio[b] !== '\n\n'){
        PreciosPintura.push(ProductosPinturasPrecio[b].toFixed(2), '\n\n')

    }

}
 
}catch(e){
    console.log(error)
}

const ProductosPinturasUnidad =[]
try{

for(j=0; j<materiales.length; j++){

for(i=0; i<ProductosAgregar[0][0].PinturaProductos.length; i++){
 if(ProductosAgregar[0][0].PinturaProductos[i].Descripcion === materiales[j].Descripcion ){

    ProductosPinturasUnidad.push(materiales[j].Unidad, '\n\n')

 }

}

}

}catch(e){
    console.log(error)
}




const ImportePintura=[]
try{

for(i=0; i<ProductosPinturasPrecio.length; i++){
    if(ProductosPinturasPrecio[i] >0 && ProductosPinturasPrecio[i] !== '\n\n' && productosPinturaCantidad[i]>0 && productosPinturaCantidad[i] !=='\n\n'){

    ImportePintura.push(ProductosPinturasPrecio[i]*productosPinturaCantidad[i])
    }
}
}catch(e){
    console.log(error)
}



var ImportePinturas=[]
try{

for (a =0; a<ImportePintura.length; a++ ){
    ImportePinturas.push(ImportePintura[a].toFixed(2), '\n\n')
}


}catch(e){
    console.log(error)
}





 const productosInstalacionDescripcion =[];
 try{

 for(let i=0; i<ProductosAgregar[0][0].InstalacionProductos.length; i++){

    productosInstalacionDescripcion.push(ProductosAgregar[0][0].InstalacionProductos[i].Descripcion,'\n\n')


 }
}catch(e){
    console.log(error)
}




 const productosInstalacionCodigo =[];
 try{

 for(let i=0; i<ProductosAgregar[0][0].InstalacionProductos.length; i++){

    productosInstalacionCodigo.push(ProductosAgregar[0][0].InstalacionProductos[i].Codigo , '\n\n')

 }
}catch(e){
    console.log(error)
}


 const productosInstalacionCantidad =[];
 try{

 for(let i=0; i<ProductosAgregar[0][0].InstalacionProductos.length; i++){

    productosInstalacionCantidad.push(ProductosAgregar[0][0].InstalacionProductos[i].cantidad , '\n\n')



 }
}catch(e){
    console.log(error)
}

 const ProductosInstalacionPrecio =[]
 try{

 for(j=0; j<materiales.length; j++){

 for(i=0; i<ProductosAgregar[0][0].InstalacionProductos.length; i++){
  if(ProductosAgregar[0][0].InstalacionProductos[i].Descripcion === materiales[j].Descripcion ){

    ProductosInstalacionPrecio.push(materiales[j].PrecioUnitario , '\n\n')

  }

 }

}
}catch(e){
    console.log(error)
}
var PreciosInstalaciones =[]
try{

for (b=0; b<ProductosInstalacionPrecio.length; b++){
    if (ProductosInstalacionPrecio[b] !== '\n\n'){
        PreciosInstalaciones.push(ProductosInstalacionPrecio[b].toFixed(2), '\n\n')

    }

}
}catch(e){
    console.log(error)
}

const ProductosInstalacionUnidad =[]
try{

for(j=0; j<materiales.length; j++){

for(i=0; i<ProductosAgregar[0][0].InstalacionProductos.length; i++){
 if(ProductosAgregar[0][0].InstalacionProductos[i].Descripcion === materiales[j].Descripcion ){

    ProductosInstalacionUnidad.push(materiales[j].Unidad , '\n\n')

 }

}

}
}catch(e){
    console.log(error)
}

const ImporteInstalacion=[]
try{

for(i=0; i<ProductosInstalacionPrecio.length; i++){
    if(ProductosInstalacionPrecio[i] >0 && ProductosInstalacionPrecio[i] !== '\n\n' && productosInstalacionCantidad[i]>0 && productosInstalacionCantidad[i] !=='\n\n'){

    ImporteInstalacion.push(ProductosInstalacionPrecio[i]*productosInstalacionCantidad[i])
    }
}
}catch(e){
    console.log(error)
}
var ImporteInstalaciones=[]
try{

for (a =0; a<ImporteInstalacion.length; a++ ){
    ImporteInstalaciones.push(ImporteInstalacion[a].toFixed(2), '\n\n')
}

}catch(e){
    console.log(error)
}

var MaterialSuma= 0 ;
try{
for (c=0; c<ImporteMateriales.length; c++){
    MaterialSuma=MaterialSuma+Number(ImporteMateriales[c])
}

}catch(e){

}
var PinturaSuma = 0;
var PinturaSumaRedondeada= 0;
try{
for (c=0; c<ImportePinturas.length; c++){
    PinturaSuma=PinturaSuma+Number(ImportePinturas[c])

}
 PinturaSumaRedondeada = Number(PinturaSuma).toFixed(2)

}catch(e){

}

var InstalacionSuma = 0;
try{
for (c=0; c<ImporteInstalaciones.length; c++){
    InstalacionSuma=InstalacionSuma+Number(ImporteInstalaciones[c])
}

}catch(e){

}
var ManoObMaterial = 0;
if (ProductosAgregar[0][0].ManoObMaterial !== 0){
 ManoObMaterial = ProductosAgregar[0][0].ManoObMaterial;

}
var PorcentajeMaterial = 0;
if(ProductosAgregar[0][0].PorcentajeMaterial !== 0){
    PorcentajeMaterial=ProductosAgregar[0][0].PorcentajeMaterial;
}
var ManoObPintura = 0;
if(ProductosAgregar[0][0].ManoObPintura !== 0){
    ManoObPintura=ProductosAgregar[0][0].ManoObPintura;
}

var PorcentajePintura = 0;
if(ProductosAgregar[0][0].PorcentajePintura !== 0){
    PorcentajePintura=ProductosAgregar[0][0].PorcentajePintura;
}

var ManoObInstalacion = 0;
if(ProductosAgregar[0][0].ManoObInstalacion !== 0){
    ManoObInstalacion=ProductosAgregar[0][0].ManoObInstalacion;
}

var PorcentajeInstalacion = 0;
if(ProductosAgregar[0][0].PorcentajeInstalacion !== 0){
    PorcentajeInstalacion=ProductosAgregar[0][0].PorcentajeInstalacion;
}

var ManoObMaterial1 = (ManoObMaterial/100) * MaterialSuma

const ManoObMaterial1R = Number(ManoObMaterial1).toFixed(2)

var ManoObMaterial2 =(PorcentajeMaterial/100) * (MaterialSuma+ManoObMaterial1)

const ManoObMaterial2R = Number(ManoObMaterial2).toFixed(2)

var Total1 = MaterialSuma+ ManoObMaterial1+ManoObMaterial2

const Total1R = Number(Total1).toFixed(2)

var ManoObPintura1 = (ManoObPintura/100) * PinturaSuma

const ManoObPintura1R = Number(ManoObPintura1).toFixed(2)

var ManoObPintura2 =(PorcentajePintura/100) * (PinturaSuma+ManoObPintura1)

const ManoObPintura2R = Number(ManoObPintura2).toFixed(2)

var Total2 = PinturaSuma+ ManoObPintura1+ManoObPintura2

const Total2R = Number(Total2).toFixed(2)

var ManoObInstalacion1 = (ManoObInstalacion/100) * InstalacionSuma

const ManoObInstalacion1R = Number(ManoObInstalacion1).toFixed(2)

var ManoObInstalacion2 =(PorcentajeInstalacion/100) * (InstalacionSuma+ManoObInstalacion1)

const ManoObInstalacion2R = Number(ManoObInstalacion2).toFixed(2)

var Total3 = InstalacionSuma+ ManoObInstalacion1+ManoObInstalacion2

const Total3R = Number(Total3).toFixed(2)
//.toFixed(2)

const iva = productodatos[0].iva

const SubTotal = Total1+ Total2 +Total3 

const SubTotalR = Number(SubTotal).toFixed(2)

const TotalFinal = Number(SubTotalR) +Number(iva)


       let docDefinition ={

    content :[
        /*
       
        {columns:[{image:'./public/images/productos/welderstone.png',width: 150, alignment:'left'},{},{image:'./public'+imagen,width: 70, height:70,alignment:'center',fit: [130,130], absolutePosition: {x: 50, y: -5}},{text: 'Cotización', style: 'header',	alignment: 'right'}]},
        {
			style: 'tableExample',
			table: {
				heights: [20, 20, 20],
				body: [
                ['Fecha',date],
				['Codigo',codigo],
				['Valido hasta',caduca],
				]
			},
           absolutePosition: {x: 450, y: 80}
		},
{text: ['Sitio web: www.Welderstone.com\n','Teléfono: 87-12-64-69-82 \n','E-mail: Welderstone@outlook.com\n'+'Asesor de venta: Arq. Angelica Varela'], margin: [0, 20, 0, 8]},

	{
			alignment: 'center',
			columns: [
				 {  width: 300,
					text: '',
					alignment: 'center',
				}
			]
		},
        
		{
			style: 'tableExample', alignment: 'center',
			table: {
				headerRows: 1,
				alignment: 'center',
				body: [
					[{text: 'Material', style: 'tableHeader'}, {text: 'Codigo', style: 'tableHeader'}, {text: 'Unidad', style: 'tableHeader'}, {text: 'Precio Unitario', style: 'tableHeader'},{text: 'Cantidad', style: 'tableHeader'}, {text: 'importe', style: 'tableHeader'}],
					[{fontSize:8,text:productosMaterialesDescripcion}, {fontSize:8,text:productosMaterialesCodigo},{fontSize:8,text:ProductosMaterialesUnidad},{fontSize:8,text:PreciosMateriales}, {fontSize:8,text:productosMaterialesCantidad}, {fontSize:8,text:ImporteMateriales}],
                    [{fontSize:8,text:" "}, " "," ",{fontSize:8,text:"Material"},{fontSize:8,text: "Suma"}, {fontSize:8,text:MaterialSuma}],
                    [{fontSize:8,text:" "}, " "," ",{fontSize:8,text:"Mano de obra"}, {fontSize:8,text:ManoObMaterial+"%"}, {fontSize:8,text:ManoObMaterial1R}],
                    [{fontSize:8,text:" "}, " "," ",{fontSize:8,text:"Porcentaje"}, {fontSize:8,text:PorcentajeMaterial+"%"}, {fontSize:8,text:ManoObMaterial2R}],
                    [{fontSize:8,text:" "}, " "," ","",{fontSize:8,text:"Total"},{fontSize:8,text:Total1R} ],

					[{fontSize:8,text:productosPinturaDescripcion}, {fontSize:8,text:productosPinturaCodigo}, {fontSize:8,text:ProductosPinturasUnidad},{fontSize:8,text:PreciosPintura},{fontSize:8,text:productosPinturaCantidad},{fontSize:8,text:ImportePinturas}],
                    [{fontSize:8,text:" "}, " "," ",{fontSize:8,text:"Pintura"}, {fontSize:8,text:"Suma"}, {fontSize:8,text:PinturaSumaRedondeada}],
                    [{fontSize:8,text:" "}, " "," ",{fontSize:8,text:"Mano de obra"}, {fontSize:8,text:ManoObPintura+"%"},{fontSize:8,text:ManoObPintura1R}],
                    [{fontSize:8,text:" "}, " "," ",{fontSize:8,text:"Porcentaje"}, {fontSize:8,text:PorcentajePintura+"%"}, {fontSize:8,text:ManoObPintura2R}],
                    [{fontSize:8,text:" "}, " "," ","", {fontSize:8,text:"Total"},{fontSize:8,text:Total2R} ],

					[{fontSize:8,text:productosInstalacionDescripcion}, {fontSize:8,text:productosInstalacionCodigo},{fontSize:8,text:ProductosInstalacionUnidad},{fontSize:8,text:PreciosInstalaciones}, {fontSize:8,text:productosInstalacionCantidad}, {fontSize:8,text:ImporteInstalaciones}],
                    [{fontSize:8,text:" "}, " "," ",{fontSize:8,text:"Instalación"}, {fontSize:8,text:"Suma"}, {fontSize:8,text:InstalacionSuma}],
                    [{fontSize:8,text:" "}, " "," ",{fontSize:8,text:"Mano de obra"}, {fontSize:8,text:ManoObInstalacion+"%"},{fontSize:8,text:ManoObInstalacion1R}],
                    [{fontSize:8,text:" "}, " "," ",{fontSize:8,text:"Porcentaje"}, {fontSize:8,text:PorcentajeInstalacion+"%"},{fontSize:8,text:ManoObInstalacion2R}],
                    [{fontSize:8,text:" "}, " "," ","", {fontSize:8,text:"Total"},{fontSize:8,text:Total3R} ],
                    [{fontSize:8,text:" "}, " "," ","", {fontSize:8,text:"Subtotal"},{fontSize:8,text:SubTotalR} ],
                    [{fontSize:8,text:" "}, " "," ","", {fontSize:8,text:"Iva"},{fontSize:8,text:iva}],
                    [{fontSize:8,text:" "}, " "," ","", {fontSize:8,text:"Total"},{fontSize:8,text:TotalFinal} ],


				]
			},

			layout: {
				hLineWidth: function (i, node) {
					return (i === 0 || i === node.table.body.length) ? 2 : 1;
				},
				vLineWidth: function (i, node) {
					return (i === 0 || i === node.table.widths.length) ? 2 : 1;
				},
				hLineColor: function (i, node) {
					return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
				},
				vLineColor: function (i, node) {
					return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
				},

			}
		},
        {text: '',pageBreak: 'before'},
        */

        
        {columns:[{image:'./public/images/productos/welderstone.png',width: 150, alignment:'left'},{},{image:'./public'+imagen,width: 70, height: 70,alignment:'center',fit: [130,130], absolutePosition: {x: 50, y: -5}},{text: 'Cotización', style: 'header',	alignment: 'right'}]},
        {
			style: 'tableExample',
			table: {
				heights: [20, 20, 20],
				body: [
                ['Fecha',date],
				['Codigo',codigo],
				['Valido hasta',caduca],
				]
			},
           absolutePosition: {x: 450, y: 80}
		},
{text: ['Sitio web: www.Welderstone.com\n','Teléfono: 87-12-64-69-82 \n','E-mail: Welderstone@outlook.com\n'+'Asesor de venta: Arq. Angelica Varela'], margin: [0, 20, 0, 8]},

	{
			alignment: 'center',
			columns: [
				 {  width: 300,
					text: '',
					alignment: 'center',
				}
			]
		},

  

        {
			style: 'tableExample', alignment: 'center',
			table: {
				headerRows: 1,
				alignment: 'center',
                widths: [150, '*', '*', '*','*','*'],

				body: [
                    [{text: 'Articulo', style: 'tableHeader'}, {text: 'Codigo', style: 'tableHeader'}, {text: 'Unidad', style: 'tableHeader'}, {text: 'Precio Unitario', style: 'tableHeader'},{text: 'Cantidad', style: 'tableHeader'}, {text: 'importe', style: 'tableHeader'}],
                    [NomProd,codigo,CantidadProd,precioProd,unidadProd, Importe],
   
                    [" "," "," "," "," ", " "],
                    [" "," "," "," "," ", " "],

                    [" "," "," "," "," ", " "],
                    [" "," "," "," "," ", " "],
                    [" "," "," "," "," ", " "],
                    [" "," "," "," "," ", " "],
                    [" "," "," "," "," ", " "],
                    [" "," "," "," "," ", " "],
                    [" "," "," "," "," ", " "],
                    [" "," "," "," "," ", " "],
                    [" "," "," "," "," ", " "],
                    [" "," "," "," "," ", " "],
                    [" "," "," "," "," ", " "],
                    [" "," "," "," "," ", " "],
                    [" "," "," "," "," ", " "],
                    [" "," "," "," "," ", " "],
                    [" "," "," "," "," ", " "],
                    [" "," "," "," "," ", " "],
                    [" "," "," "," "," ", " "],
                    [" "," "," "," "," ", " "],
                    [" "," "," "," "," ", " "],

				]
			},

			layout: {
				hLineWidth: function (i, node) {
					return (i === 0 || i === node.table.body.length) ? 2 : 1;
				},
				vLineWidth: function (i, node) {
					return (i === 0 || i === node.table.widths.length) ? 2 : 1;
				},
				hLineColor: function (i, node) {
					return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
				},
				vLineColor: function (i, node) {
					return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
				},

			}
		},
        {fontSize:11,text: ['1. Precio no incluye entrega a domicilio \n','2. Precio sujeto a cambio sin previo aviso \n','3. Precio no incluye instalación\n '], margin: [0, 20, 0, 8]},
        {fontSize:11,text: ['Si usted tiene alguna pregunta sobre esta cotización, por favor, póngase en contacto con nosotros \n','Sitio web: www.Welderstone.com | Teléfono: 87-12-64-69-82 | E-mail: Welderstone@outlook.com \n'],	alignment: 'center'},
    ],
	
	styles: {
		header: {
			fontSize: 18,
			bold: true,
			margin: [0, 0, 0, 10]
		},
		subheader: {
			fontSize: 16,
			bold: true,
			margin: [0, 10, 0, 5]
		},
		tableExample: {
			margin: [0, 5, 0, 15],
			alignment: 'center',
		},
		tableHeader: {
			bold: true,
			fontSize: 13,
			color: 'black',
			alignment: 'center'
		},
        defaultStyle: {
		columnGap: 15
	}
	},
	defaultStyle: {
		// alignment: 'justify'
	}


	
}

   


       const printer = new PdfPrinter(fonts);
   
       let pdfDoc = printer.createPdfKitDocument(docDefinition);
       pdfDoc.pipe(fs.createWriteStream('pdfs/'+IdTransaccion+`${req.query.codigo}`+'.pdf'));
       pdfDoc.end();
   
   
    let role = "viewer";

    if (req.session?.passport?.user != undefined) {
        role = req.session.passport.user.role;
       const IdUsuario = req.session.passport.user.id;
       const IdTransaccion = req.query.IdTrans
       const cotizaciones = await Cotizaciones.find({})
const ProductoParaCotizar = ProductosAgregar[0][0]

var MaterialesMostrar = []
var PinturaMostrar = []

var InstalacionesMostrar = []
for (b=0; b<PreciosMateriales.length; b++){
    if (PreciosMateriales[b].text !== '\n\n'){
        MaterialesMostrar.push(PreciosMateriales[b].text)

    }

}
for (b=0; b<PreciosPintura.length; b++){
    if (PreciosPintura[b].text !== '\n\n'){
        PinturaMostrar.push(PreciosPintura[b].text)

    }

}
for (b=0; b<PreciosInstalaciones.length; b++){
    if (PreciosInstalaciones[b].text !== '\n\n'){
        InstalacionesMostrar.push(PreciosInstalaciones[b].text)

    }

}


//console.log(PdfDescargar[0].Telefono)
const NumeroCliente = PdfDescargar[0].Telefono

    res.render('cotizacionProducto',{IdUsuario, cotizaciones, roles: role,loggedIn: true,IdTransaccion,productodatos,ProductoParaCotizar,MaterialesMostrar,PinturaMostrar,InstalacionesMostrar,MaterialSuma,ManoObMaterial1R,ManoObMaterial2R,Total1R,PinturaSumaRedondeada,ManoObPintura1R,ManoObPintura2R,Total2R,InstalacionSuma,ManoObInstalacion1R,ManoObInstalacion2R,Total3R,SubTotalR,TotalFinal,NumeroCliente
    })
      
}



}

