module.exports = (sequelize, Sequelize) => {
  const Products = sequelize.define("products", {
    imageUrl: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return Products;
};
