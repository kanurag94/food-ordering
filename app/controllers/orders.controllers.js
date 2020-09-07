const db = require("../models");
const { employee } = require("../models");
const Employee = db.employee;
const Orders = db.orders;
const User = db.user;
const Products = db.products;

const Op = db.Sequelize.Op;

calculateEta = (req) => {
  return Math.random() * 100;
};

updateEta = (order) => {
  if (order.eta === 0) return;
  const time_elapsed = (Date.now() - order.updatedAt) / 60000;
  const new_eta = Math.max(0, order.eta - time_elapsed);
  order.update({
    eta: new_eta,
  });
};

allocateFirstStaff = (currorder) => {
  console.log(employee);
  Employee.findOne({
    order: [["updatedAt", "ASC"]],
  })
    .then((employee) => {
      employee.update({
        isBusy: true,
        orderPincode: currorder.orderPincode,
        waitTime: currorder.eta,
      });
      currorder.update({
        staffId: employee.id,
      });
      return;
    })
    .catch((err) => {
      return err;
    });
};

allocateNewStaff = (currorder) => {
  Employee.findOne({
    where: {
      isBusy: false,
    },
    order: [["updatedAt", "ASC"]],
  })
    .then((employee) => {
      employee.update({
        isBusy: true,
        orderPincode: currorder.orderPincode,
        waitTime: currorder.eta,
      });
      currorder.update({
        staffId: employee.id,
      });
      return;
    })
    .catch((err) => {
      return allocateFirstStaff(currorder);
    });
};

allocateOldStaff = (currorder) => {
  Employee.findOne({
    where: {
      isBusy: true,
      orderPincode: currorder.orderPincode,
      waitTime: {
        [Op.between]: [1, currorder.eta / 2 + 5],
      },
    },
  })
    .then((employee) => {
      currorder.update({
        staffId: employee.id,
      });
      return;
    })
    .catch((err) => {
      return allocateNewStaff(currorder);
    });
};

getOrderPrice = (currorder) => {
  Products.findOne({
    where: {
      id: currorder.itemId,
    },
  })
    .then((product) => {
      currorder.update({
        amount: product.price,
      });
      return;
    })
    .catch((err) => {
      return err;
    });
};

exports.createOrder = (req, res) => {
  Orders.create({
    itemId: req.body.itemId,
    userId: req.userId,
    amount: 0,
    orderPincode: req.body.orderPincode || 0,
    staffId: 0,
    eta: calculateEta(req),
    isComplete: false,
  })
    .then((order) => {
      allocateOldStaff(order);
      getOrderPrice(order);
      res.send({ message: "Order received successfully!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getOrderDetails = (req, res) => {
  Orders.findOne({
    id: req.params.orderId,
  })
    .then((order) => {
      updateEta(order);
      if (1 || order.staffId != req.userId || order.userId != req.userId) {
        res.status(500).send({ message: "Action Not Allowed" });
      }
      res.send({
        order_no: req.params.orderId,
        itemId: order.itemId,
        amount: order.amount,
        userId: order.userId,
        orderPincode: order.orderPincode,
        eta: order.eta,
        staffId: order.staffId,
        isComplete: order.isComplete,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.fullfillOrder = (req, res) => {
  Orders.findOne({
    where: {
      id: req.params.orderId,
    },
  })
    .then((order) => {
      order
        .update({
          isComplete: true,
          eta: 0,
        })
        .then(
          Employee.findOne({
            where: {
              id: order.staffId,
            },
          })
            .then((employee) => {
              employee.update({
                isBusy: false,
              });
            })
            .catch((err) => {
              res.send({ message: err.message });
            })
        );
      res.send({ message: "Thank you for Completing Order" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

getUserOrders = (req, res) => {
  Orders.findAll({
    where: {
      [Op.or]: [
        {
          staffId: req.userId,
        },
        {
          userId: req.userId,
        },
      ],
    },
  })
    .then((orders) => {
      orders.map((order) => updateEta(order));
      res.send(orders);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

getAllOrders = (req, res) => {
  Orders.findAll({})
    .then((orders) => {
      orders.map((order) => updateEta(order));
      res.send(orders);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getOrders = (req, res) => {
  User.findByPk(req.userId).then((user) => {
    user
      .getRoles()
      .then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            return true;
          }
        }
        return false;
      })
      .then((admin) => {
        admin ? getAllOrders(req, res) : getUserOrders(req, res);
      });
  });
};
