const { verifySignUp } = require("../middleware");
const { verifyFields } = require("../middleware");
const { authJwt } = require("../middleware");
const controller = require("../controllers/auth.controllers");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifyFields.checkSignUpFields,
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkUserRole,
    ],
    controller.signup
  );

  app.post(
    "/api/auth/signupcustom",
    [
      authJwt.verifyToken,
      authJwt.isAdmin,
      verifyFields.checkSignUpFields,
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};
