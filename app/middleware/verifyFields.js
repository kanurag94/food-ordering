const db = require("../models");

function checkParameter(param) {
  return !param || param === null || param === "";
}

checkProductFields = (req, res, next) => {
  if (checkParameter(req.body.name)) {
    res.status(400).send({
      message: "Failed! Invalid product name",
    });
    if (req.body.imageUrl) return;
  }
  if (
    !req.body.imageUrl ||
    req.body.imageUrl === null ||
    req.body.imageUrl === ""
  ) {
    res.status(400).send({
      message: "Failed! Invalid image URL",
    });
  }

  if (checkParameter(req.body.price)) {
    res.status(400).send({
      message: "Failed! Invalid price field",
    });
    return;
  }
  if (checkParameter(req.body.quantity)) {
    res.status(400).send({
      message: "Failed! Invalid quantity field",
    });
    return;
  }
  next();
};

checkSignUpFields = (req, res, next) => {
  if (checkParameter(req.body.username)) {
    res.status(400).send({
      message: "Failed! Invalid username field",
    });
    return;
  }
  if (checkParameter(req.body.password) && req.body.password.length > 7) {
    res.status(400).send({
      message: "Failed! Invalid password field",
    });
    return;
  }
  if (checkParameter(req.body.email)) {
    res.status(400).send({
      message: "Failed! Invalid email field",
    });
    return;
  }
  next();
};

checkOrderFields = (req, res, next) => {
  if (
    checkParameter(req.body.orderPincode || req.body.orderPincode.length !== 6)
  ) {
    res.status(400).send({
      message: "Failed! Invalid pincode",
    });
    return;
  }
  next();
};

const verifyFields = {
  checkProductFields: checkProductFields,
  checkSignUpFields: checkSignUpFields,
  checkOrderFields: checkOrderFields,
};

module.exports = verifyFields;
