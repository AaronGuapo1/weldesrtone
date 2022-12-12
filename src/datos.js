const Material = require('../models/materiales.js')
const path = require('path')
const mongoose = require('mongoose');

var XLSX = require("xlsx")
 
mongoose.connect('mongodb://localhost:27017/Woolderstone', {useNewUrlParser: true});

var prueba = [{
Descripcion:"Hola",
Codigo:"hola2",
Unidad:"hola3",
PrecioUnitario:132132,
Familia:"hola5",
SubFam:"hola6"

}];



const ExcelAJSON =  ()=>{




    const excel = XLSX.readFile(
        "C:\\Users\\mraar\\Desktop\\weelderstone\\datos.xlsx"
    );
    var nombreHoja = excel.SheetNames;
    let datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]], {
     cellDates: true
    });
    console.log(datos);
    
    Material.create(datos)


}

ExcelAJSON();
