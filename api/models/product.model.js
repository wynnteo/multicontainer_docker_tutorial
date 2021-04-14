const sql = require("./db.js");

const Product = function (product) {
  this.name = product.name;
  this.description = product.description;
  this.price = product.price;
  this.date_modified = new Date();
  this.date_created = new Date();
};

Product.create = (newProduct, result) => {
  sql.query("INSERT INTO Product SET ?", newProduct, (err, res) => {
    if (err) {
      result(null, { result: "Failed to create product" });
      return;
    } else {
      result(null, { result: "Product created successfully" });
    }
  });
};

Product.findById = (productId, result) => {
  sql.query(`SELECT * FROM products WHERE id = ${productId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found product: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Product with the id
    result({ kind: "not_found" }, null);
  });
};

Product.getAll = result => {
  sql.query("SELECT * FROM products ORDER BY date_created DESC", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Product.updateById = (id, product, result) => {
  sql.query(
    "UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?",
    [product.name, product.description, product.price, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Product with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated product: ", { id: id, ...product });
      result(null, { id: id, ...product });
    }
  );
};

Product.remove = (id, result) => {
  sql.query("DELETE FROM products WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Product with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted product with id: ", id);
    result(null, res);
  });
};

module.exports = Product;