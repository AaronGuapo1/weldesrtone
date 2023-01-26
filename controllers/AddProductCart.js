const Cart = require("../models/Cart");
const Product = require("../models/Productos");

const addProductCart = async (req, res) => {
  const { nombre, image, precio,_id } = req.body;

  /* Nos fijamos si tenemos el producto */
  const estaEnProducts = await Product.findOne({ nombre });

  /* Nos fijamos si todos los campos vienen con info */
  const noEstaVacio = nombre !== "" && image !== "" && precio !== "" && _id !== "";

  /* Nos fijamos si el producto ya esta en el carrito */
  const estaEnElCarrito = await Cart.findOne({ nombre });

  /* Si no tenemos el producto */
  if (!estaEnProducts) {
    res.redirect('/tienda')


    /* Si nos envian algo y no esta en el carrito lo agregamos */
  } else if (noEstaVacio && !estaEnElCarrito) {
    const newProductInCart = new Cart({ nombre, image, precio, amount: 1 ,_id});

    /* Y actualizamos la prop inCart: true en nuestros productos */
    await Product.findByIdAndUpdate(
      estaEnProducts?._id,
      { inCart: true, nombre, image, precio, _id },
      { new: true }
    )
      .then((product) => {
        newProductInCart.save();
        res.redirect('/tienda')

      })
      .catch((error) => console.error(error));

    /* Y si esta en el carrito avisamos */
  } else if (estaEnElCarrito) {
    res.redirect('/tienda')

  }
};

module.exports = addProductCart;
