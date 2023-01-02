// ---------------- PACKAGES ---------------- // 
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const session = require('express-session');
const passport = require("passport");

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
app.use(fileUpload());
app.set("view engine", "ejs");

// -------------- SESSION CONFIG -------------- //
app.use(session({
    secret: process.env.SECRET,
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
const inicioController = require('./controllers/inicio');
const tiendaController = require('./controllers/tienda');
const registrarControllerGET = require('./controllers/registrarseGET');
const registrarControllerPOST = require('./controllers/registrarsePOST');
const loginController = require('./controllers/login');
const logoutController = require('./controllers/logout');
const productosGET = require('./controllers/productosGET');
const materialesGET = require('./controllers/materialesGET');
const materialesEdicionPOST = require('./controllers/materialesEdicionPOST');
const materialesAgregarPOST = require('./controllers/materialesAgregarPOST');
const productosEdicionPOST = require("./controllers/productosEdicionPOST");
const productosAgregarPOST = require('./controllers/productosAgregarPOST');
const materialBorrar = require('./controllers/materialBorrar');
const aboutGET = require("./controllers/about")

// ---------------- SERVER ---------------- // 
// - GET METHOD - //
app.get('/', inicioController);
app.get('/tienda', tiendaController);
app.get("/about", aboutGET);
app.get('/registrarse', registrarControllerGET);    
app.get('/login/:status', loginController);
app.get('/logout', logoutController);
app.get('/productos', nocache, productosGET);
app.get('/materiales', nocache, materialesGET);
// - Google Auth
app.get("/auth/google", passport.authenticate("google", {scope: ["profile"]}));
app.get("/auth/google/welderstone", passport.authenticate("google", {failureRedirect: "/login/false"}), function(req, res){
    res.redirect("/")
});

// - POST METHOD - //
app.post("/login", passport.authenticate("local", {failureRedirect: "/login/false"}), function(req, res){
    res.redirect("/");
});
app.post('/registrarse', registrarControllerPOST);
// - Materiales
app.post('/materiales/edicion', materialesEdicionPOST);
app.post('/materiales/agregar', materialesAgregarPOST);
app.use('/material/borrar/:id', materialBorrar);
// - Productos
app.post("/productos/edicion", productosEdicionPOST);
app.post('/productos/agregar', productosAgregarPOST);

app.use((req, res) => res.render('notfound'));

app.listen(3000, ()=>{
    console.log('App listening on port 3000');
})


    