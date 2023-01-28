const Cart = require("../models/Cart");
const Product = require("../models/Productos");

const putProduct = async (req, res) => {

  console.log("hola")


  const { productId } = req.params;
  const { query } = req.query;
  const body = req.body;
  var prueba = Number(body.amount);

  /* Buscamos el producto en el carrito */
  const productBuscado = await Cart.findById(productId);


if(query=== "del" && prueba === 1){

  const { productId } = req.params;

  /* Buscamos el producto en el carrito */
  const productInCart = await Cart.findById(productId);

  /* Buscamos el producto en nuestra DB por el nombre del que esta en el carrito */
  const { nombre, image, precio, _id } = await Product.findOne({
    nombre: productInCart.nombre,
  });

  /* Buscamos y eliminamos el producto con la id */
  await Cart.findByIdAndDelete(productId);
  
  /* Buscamos y editamos la prop inCart: false */
  /* Le pasamos la id del producto en la DB */
  /* La prop a cambiar y las demas */
  /* Y el new para devolver el producto editado */
  await Product.findByIdAndUpdate(
    _id,
    { inCart: false, nombre, image, precio },
    { new: true }
  )
    .then((product) => {
      res.redirect('/cart')
    })
    .catch((error) => res.json({ mensaje: "Hubo un error" }));

}

  /* Si no hay query 'add' o 'del' */
  if (!query) {
    res.status(404).json({ mensaje: "Debes enviar una query" });

    /* Si esta el producto en el carrito y quiero agregar */
  } else if (productBuscado && query === "add") {
     prueba  = prueba + 1;
    await Cart.findByIdAndUpdate(productId, {amount:prueba}, {
      new: true,
    }).then((product) => {
      res.redirect('/cart')

    });

    /* Si esta el producto en el carrito y quiero sacar */
  } else if (productBuscado && query === "del" && prueba > 1) {
    prueba  = prueba - 1;

    await Cart.findByIdAndUpdate(productId, {amount:prueba}, {
      new: true,
    }).then((product) =>
    res.redirect('/cart')

    );
  }
};

module.exports = putProduct;


/*
const Cart = require("../models/Cart");

const putProduct = async (req, res) => {

  console.log("hola")


  const { productId } = req.params;
  const { query } = req.query;
  const body = req.body;

  const productBuscado = await Cart.findById(productId);

  if (!query) {
    res.status(404).json({ mensaje: "Debes enviar una query" });

  } else if (productBuscado && query === "add") {
    body.amount = body.amount + 1;
    console.log(body.amount)
    await Cart.findByIdAndUpdate(productId, body, {
      new: true,
    }).then((product) => {
      res.json({
        mensaje: `El producto: ${product.nombre} fue actualizado`,
        product,
      });
    });

  } else if (productBuscado && query === "del") {
    body.amount = body.amount - 1;

    await Cart.findByIdAndUpdate(productId, body, {
      new: true,
    }).then((product) =>
      res.json({
        mensaje: `El producto: ${product.nombre} fue actualizado`,
        product,
      })
    );
  } else {
    res.status(400).json({ mensaje: "Ocurrio un error" });
  }
};

module.exports = putProduct;

*/