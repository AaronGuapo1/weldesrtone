// ---------------- PACKAGES ---------------- // 
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

// -------------- MIDDLEWARE -------------- //
function nocache(req, res, next) { /// function used to remove cache anywhere needed
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}

// ---------------- APP CONFIG ---------------- // 
const app = new express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); 
app.set("view engine", "ejs");

// -------------- SESSION CONFIG -------------- //
app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// ---------------- DATABASE ---------------- // 
mongoose.set('strictQuery', true);
// mongoose.connect('mongodb+srv://Aaron:tamales@aaronproyecto.sfdk1.mongodb.net/Woolderstone', {useNewUrlParser: true});
// mongoose.connect('mongodb://localhost:27017/Woolderstone', {useNewUrlParser: true});
mongoose.connect("mongodb://0.0.0.0:27017/welderstoneDB");

// ---------------- CONTROLLERS ---------------- //
const inicioController= require('./controllers/inicio');
const TiendaController= require('./controllers/tienda');
const RegistrarController= require('./controllers/registrarse');
const GuardarUsuario = require('./controllers/GuardarUsuario');
const LoginController = require('./controllers/login');
const LogearseController = require('./controllers/logearse');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const logoutController = require('./controllers/logout');
const AgregarProductosController = require('./controllers/agregarProductos');
const EditarProductosController = require('./controllers/editarProductos');
const SeguridadMiddleware= require('./middleware/seguridad');
const EdicionMaterialesController = require('./controllers/EdicionMateriales');
const EdicionMaterialesPostController = require('./controllers/EdicionMaterialesPost');
const AgregarMaterialesPostController = require('./controllers/AgregarMaterialPost');
const AgregarProductosPostController = require('./controllers/AgregarProductosPost');
const borrarMaterialController=require('./controllers/borrarMaterial');

// ---------------- SERVER ---------------- // 
// - GET METHOD - //
app.get('/', inicioController);
app.get('/tienda', TiendaController);
app.get('/registrarse', RegistrarController);
app.get('/login', LoginController);
app.get('/logout', logoutController);
app.get('/AgregarProductos', nocache, AgregarProductosController);
app.get('/EditarProductos', nocache, EditarProductosController);
app.get('/EdicionMateriales', nocache,EdicionMaterialesController);

// - POST METHOD - //
app.post("/login", passport.authenticate("local", {failureRedirect: "/login"}), function(req, res){
    res.redirect("/");
});
app.post('/registrar', GuardarUsuario);
app.post('/EdicionMaterialesPost', EdicionMaterialesPostController);
app.post('/AgregarMaterialPost', AgregarMaterialesPostController);
app.post('/AgregarProductosPost', AgregarProductosPostController);
app.use('/borrarMaterial/:id',borrarMaterialController);


app.use((req, res) => res.render('notfound'));

app.listen(3000, ()=>{
    console.log('App listening on port 3000');
})


    