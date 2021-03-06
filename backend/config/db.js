const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(`Connected to database ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Unable to connect to database${error}`.red.underline);
    process.exit(1);
  }
};

module.exports = connectDB;
