const material = require("../models/materiales.js");
const Producto = require("../models/Productos.js");

module.exports = async (req, res) => {
    const BusquedaCodigo = await material
        .find({ Codigo: req.body.Codigo })
        .count();
    if (BusquedaCodigo === 0) {
        await material.create(req.body);
        await material.updateOne({Descripcion: req.body.Descripcion}, {Codigo: req.body.Codigo.trim()});
        await Producto.updateOne({
            $push: {
                MaterialesProductos: {
                    Descripcion: req.body.Descripcion,
                    cantidad: 0,
                    codigo: req.body.Codigo,
                    preciounitario: req.body.PrecioUnitario,
                    familia: req.body.Familia,
                },
            },
        });
        await Producto.updateOne({
            $push: {
                PinturaProductos: {
                    Descripcion: req.body.Descripcion,
                    cantidad: 0,
                    codigo: req.body.Codigo,
                    preciounitario: req.body.PrecioUnitario,
                    familia: req.body.Familia,
                },
            },
        });
        await Producto.updateOne({
            $push: {
                InstalacionProductos: {
                    Descripcion: req.body.Descripcion,
                    cantidad: 0,
                    codigo: req.body.Codigo,
                    preciounitario: req.body.PrecioUnitario,
                    familia: req.body.Familia,
                },
            },
        });

        res.redirect("/materiales/true");
    } else if (BusquedaCodigo === 1) {
        console.log("ya creado");
        res.redirect("/materiales/false");
    }
};
