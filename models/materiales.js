const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bodyParser = require('body-parser')


const MaterialSchema = new Schema({
    Descripcion:{type:String},
    Codigo:{type:String},
    Unidad:{type:String},
    PrecioUnitario:{type:Number},
    Familia:{type:String},
    SubFam:{type:String}
});

const Material = mongoose.model('Material',MaterialSchema);
module.exports = Material;
