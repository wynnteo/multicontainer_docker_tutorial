const Product = require("../models/product.model.js");

const products = {
 // Create and Save a new Product
  create: (req, res) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    } else {
      // Create a Product object
      const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
      });

      // Save Product in the database
      Product.create(product, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Product."
          });
        else res.send(data);
      });
    }
  },

  // Retrieve all Product from the database.
  findAll: (req, res) => {
    Product.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving products."
        });
      else res.send(data);
    });
  },

  // Find a single Product with a productId
  findOne: (req, res) => {
    Product.findById(req.params.productId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Product with id ${req.params.productId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Product with id " + req.params.productId
          });
        }
      } else res.send(data);
    });
  },

  // Update a Product identified by the productId in the request
  update: (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    Product.updateById(
      req.params.productId,
      new Product(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Product with id ${req.params.productId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Product with id " + req.params.productId
            });
          }
        } else res.send(data);
      }
    );
  },

  // Delete a Product with the specified productId in the request
  delete: (req, res) => {
    Product.remove(req.params.productId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Product with id ${req.params.productId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Product with id " + req.params.productId
          });
        }
      } else res.send({ message: `Product was deleted successfully!` });
    });
  },

  // Delete all Products from the database.
  deleteAll: (req, res) => {
    Product.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all products."
        });
      else res.send({ message: `All Products were deleted successfully!` });
    });
  },

};

module.exports = products;