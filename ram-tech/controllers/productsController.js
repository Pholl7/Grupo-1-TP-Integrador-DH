const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));



const controller = {
    //LISTA DE PRODUCTOS
    index: (req, res) => {
        res.render('./partials/products', { products: products });
    },

    // CARRITO

    productCart: (req, res) => {
        res.render("./products/productCart");
    },

    // DETALLE DEL PRODUCTO

    productDetail: (req, res) => {
        const { id } = req.params;
		const product = products.find((product) => product.id == id);
		res.render('./products/productDetail', { product });
    },

    // CREACIÓN Y EDICIÓN

    productCreate: (req, res) => {
        res.render("./products/productCreate");
    },

    store: (req, res) => {
        const newProduct = {
            id: products[products.length - 1].id + 1,
            image: 'default-image.png',
            ...req.body
        };
        products.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        res.redirect('/products');
    },

    productEdit: (req, res) => {
        const productToEdit = products.find((product) => product.id == req.params.id)

        res.render("./products/productEdit", { productToEdit });
    },

    editedProduct: (req, res) => {
        let productToEdit = products.find((product) => product.id == req.params.id)
        productToEdit = {
            ...productToEdit,
            ...req.body
        }
        const indexToEdit = products.findIndex((product) => product.id == req.params.id)
        products[indexToEdit] = productToEdit
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        res.redirect('/products');
    },

    // ELIMINACIÓN

    //deleteProduct: (req, res) => {
        //const productToDelete = products.filter((product) => product.id != req.params.id)
       
        //let id = req.params.id
        //const productToDelete = products.splice(id, 1)

        //res.redirect("/products");
    //}

}

module.exports = controller;