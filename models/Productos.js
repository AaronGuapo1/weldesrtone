const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bodyParser = require('body-parser')
const mongoosePaginate= require('mongoose-paginate-v2')


const ProductoSchema = new Schema({
    IdProducto:{type:String},
    MaterialesProductos:[{Descripcion:{type:String},cantidad:{type:Number},Codigo:{type:String},PrecioUnitario:{type:Number},Familia:{type:String}}],
    PinturaProductos:[{Descripcion:{type:String},cantidad:{type:Number},Codigo:{type:String},PrecioUnitario:{type:Number},Familia:{type:String}}],
    InstalacionProductos:[{Descripcion:{type:String},cantidad:{type:Number},Codigo:{type:String},PrecioUnitario:{type:Number},Familia:{type:String}}],
    Familia: String,
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
    Codigo:{type:String}
});

ProductoSchema.plugin(mongoosePaginate);
const Producto = mongoose.model('Producto',ProductoSchema);
module.exports = Producto;


/*


*/