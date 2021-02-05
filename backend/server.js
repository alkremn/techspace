const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const colors = require('colors');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: 'backend/config/config.env' });

//connecting to database
connectDB();

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/users', require('./routes/usersRoutes'));
app.use('/api/v1/categories', require('./routes/categoriesRoutes'));
app.use('/api/v1/solutions', require('./routes/solutionsRoutes'));
app.use('/api/v1/cases', require('./routes/casesRoutes'));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(PORT, () =>
  console.log(`Server is running on ${PORT}`.cyan.underline)
);

const io = require('socket.io')(server, {
  cors: {
    cors,
  },
});

io.use((socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = payload.id;
    next();
  } catch (error) {
    console.log(error);
  }
});

io.on('connection', socket => {
  console.log('connected: ' + socket.userId);

  socket.on('disconnect', () => {
    console.log('Disconnected: ' + socket.userId);
  });
});
