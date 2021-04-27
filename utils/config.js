if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

let DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;

module.exports = { DB_URL, PORT };
