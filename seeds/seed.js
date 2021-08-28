const sequelize = require('../config/connection');
const User = require("../models/User");
const Blog = require("../models/Blog");

const userData = require('./userData.json');
const blogData = require('./blogData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Blog.bulkCreate(blogData);

  process.exit(0);
};

seedDatabase();