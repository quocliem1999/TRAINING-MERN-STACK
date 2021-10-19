const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

const db = require('./config/key').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected....'))
  .catch((err) => console.log(err));

app.use('/', require('./router/User'));
app.use('/profile', require('./router/Profile'));
const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server Run With Port ${PORT}`));
