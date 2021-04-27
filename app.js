const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { PORT, DB_URL } = require('./utils/config');

const app = express();

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error connecting to MongoDB:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json('We are here');
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
