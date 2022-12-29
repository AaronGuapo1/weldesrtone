const mongoose = require('mongoose');
const Schema = mongoose.Schema;  
//unique:true, require:true

const calificaciones = new Schema(
   {
student_id:{type:Number,required:true},
scores:[{type:{type:String},score:{type:Number}}],
class_id:{type:Number,required:true},
promedio:{type:Number,required:true},
  }
);
const grades = new mongoose.model('grades',calificaciones);

module.exports =grades;



