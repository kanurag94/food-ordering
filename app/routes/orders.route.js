const controller = require("../controllers/orders.controllers");
const { authJwt, verifyFields } = require("../middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/orders/:orderId",
    [authJwt.verifyToken],
    controller.getOrderDetails
  );

  app.post("/api/orders", [authJwt.verifyToken], controller.getOrders);

  app.post(
    "/api/orders/new",
    [authJwt.verifyToken, verifyFields.checkOrderFields],
    controller.createOrder
  );

  app.post(
    "/api/orders/:orderId",
    [authJwt.verifyToken, authJwt.isStaffOrAdmin],
    controller.fullfillOrder
  );
};
