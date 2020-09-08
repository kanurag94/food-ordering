const { authJwt } = require("../middleware");
const { verifyFields } = require("../middleware");
const controller = require("../controllers/products.controllers");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/products", controller.getProducts);
  app.get("/api/products/:itemId", controller.getProductDetails);
  app.post(
    "/api/products/new",
    [authJwt.verifyToken, authJwt.isAdmin, verifyFields.checkProductFields],
    controller.createProduct
  );
  app.put(
    "/api/products/:itemId",
    [authJwt.verifyToken, authJwt.isAdmin, verifyFields.checkProductFields],
    controller.updateProduct
  );
  app.delete(
    "/api/products/:itemId",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteProduct
  );
};
