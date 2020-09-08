exports.User = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return User;
};

exports.Employee = (sequelize, Sequelize) => {
  const Employee = sequelize.define("employees", {
    isBusy: {
      type: Sequelize.BOOLEAN,
    },
    waitTime: {
      type: Sequelize.INTEGER,
    },
    orderPincode: {
      type: Sequelize.STRING,
    },
  });

  return Employee;
};
