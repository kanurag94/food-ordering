const db = require("../models");

function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    value
  );
}

checkProductFields = (req, res, next) => {
  if (
    req.body.imageUrl === null ||
    req.body.imageUrl === "" ||
    !validateUrl(req.body.imageUrl)
  ) {
    res.status(400).send({
      message: "Failed! Invalid image URL",
    });
    if (req.body.imageUrl) return;
  }

  if (
    req.body.price === null ||
    req.body.price === "" ||
    req.body.price.length < 8
  ) {
    res.status(400).send({
      message: "Failed! Invalid price field",
    });
    return;
  }
  if (req.body.quantity === null || req.body.quantity === "") {
    res.status(400).send({
      message: "Failed! Invalid quantity field",
    });
    return;
  }
  next();
};

checkSignUpFields = (req, res, next) => {
  if (req.body.username === null || req.body.username === "") {
    res.status(400).send({
      message: "Failed! Invalid username field",
    });
    return;
  }
  if (
    req.body.password === null ||
    req.body.password === "" ||
    req.body.password.length < 8
  ) {
    res.status(400).send({
      message: "Failed! Invalid password field",
    });
    return;
  }
  if (req.body.email === null || req.body.email === "") {
    res.status(400).send({
      message: "Failed! Invalid email field",
    });
    return;
  }
  if (req.body.roles === null || req.body.roles === "") {
    res.status(400).send({
      message: "Failed! Invalid Roles field",
    });
    return;
  }
  next();
};

const verifyFields = {
  checkProductFields: checkProductFields,
  checkSignUpFields: checkSignUpFields,
};

module.exports = verifyFields;
