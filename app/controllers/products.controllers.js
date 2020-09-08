const db = require("../models");
const config = require("../config/auth.config");
const Products = db.products;

const Op = db.Sequelize.Op;

exports.createProduct = (req, res) => {
  Products.create({
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    quantity: req.body.quantity,
  })
    .then((product) => {
      res.send({ message: "Product created successfully!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getProducts = (req, res) => {
  Products.findAll()
    .then((products) => {
      res.send(products);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getProductDetails = (req, res) => {
  Products.findOne({
    where: {
      id: req.params.itemId,
    },
  })
    .then((product) => {
      res.send({
        id: product.id,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: product.quantity,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.deleteProduct = (req, res) => {
  Products.destroy({
    where: {
      id: req.params.itemId,
    },
  })
    .then(() => {
      res.send({ message: "Deleted the product successfully" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateProduct = (req, res) => {
  Products.findOne({
    where: {
      id: req.params.itemId,
    },
  })
    .then((product) => {
      product.update({
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        quantity: req.body.quantity,
      });
      res.send("Product Updated Successfully");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
