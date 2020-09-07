module.exports = (sequelize, Sequelize) => {
  const Orders = sequelize.define("orders", {
    itemId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    orderPincode: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    eta: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    isComplete: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    staffId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return Orders;
};
