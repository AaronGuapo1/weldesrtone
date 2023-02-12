const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bodyParser = require('body-parser')
const mongoosePaginate= require('mongoose-paginate-v2')


const ProductoSchema = new Schema({
    IdProducto:{type:String},
    MaterialesProductos:[{Descripcion:{type:String},cantidad:{type:Number},codigo:{type:String},preciounitario:{type:Number},familia:{type:String}}],
    PinturaProductos:[{Descripcion:{type:String},cantidad:{type:Number},codigo:{type:String},preciounitario:{type:Number},familia:{type:String}}],
    InstalacionProductos:[{Descripcion:{type:String},cantidad:{type:Number},codigo:{type:String},preciounitario:{type:Number},familia:{type:String}}],
    familia: String,
    precio:{type:Number},
    image:{type:String},
    nombre:{type:String},
    descripcion:{type:String},
    unidad:{type:String},
    ManoObMaterial:{type:Number},
    PorcentajeMaterial:{type:Number},
    ManoObPintura:{type:Number},
    PorcentajePintura:{type:Number},
    ManoObInstalacion:{type:Number},
    PorcentajeInstalacion:{type:Number},
    especificacionesNombre: Array,
    especificacionesDesc: Array,
    inCart:{type:Boolean,default:false}
});

ProductoSchema.plugin(mongoosePaginate);
const Producto = mongoose.model('Producto',ProductoSchema);
module.exports = Producto;
