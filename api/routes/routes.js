module.exports = app => {
    const products = require("../controllers/product.controller.js");

    app.post("/api/product", products.create);
    app.get("/api/products", products.findAll);
    app.get("/api/product/:productId", products.findOne);
    app.put("/api/product", products.update);
    app.delete("/api/product/:productId", products.delete);
  };