const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const connectDB = require('./config/db');
const User = require('./models/User');
const Category = require('./models/Category');
const Solution = require('./models/Solution');
const solutionsData = require('./data/solutionsData');
const usersData = require('./data/usersData');
const categoriesData = require('./data/catagoriesData');

dotenv.config({ path: 'backend/config/config.env' });

connectDB();

const createData = async () => {
  try {
    await User.deleteMany();
    // await Category.deleteMany();
    //await Solution.deleteMany();

    // const user = await User.create({
    //   firstName: 'Ben',
    //   lastName: 'Gold',
    //   email: 'ben49@gmail.com',
    //   password: bcrypt.hashSync('12345', 10),
    //   displayName: 'BG',
    //   photoUrl: '',
    //   isAdmin: false,
    //   isSecond: false,
    // });
    await User.insertMany(usersData);

    //await Category.insertMany(categoriesData);

    //await Solution.insertMany(SolutionsData);
  } catch (error) {
    console.log(`Unable to create ${error}`.red.underline);
  }
};

if (process.argv[2] === '-c') {
  createData();
}
