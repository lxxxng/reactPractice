require('dotenv').config(); // Loads variables from .env in development
const url = require('url');

let config;

if (process.env.NODE_ENV === 'production' && process.env.JAWSDB_URL) {
  // Parse JAWSDB_URL for production (Heroku)
  const dbUrl = url.parse(process.env.JAWSDB_URL);
  const [username, password] = dbUrl.auth.split(':');

  config = {
    username: username,
    password: password,
    database: dbUrl.pathname.substring(1), // Removes leading '/'
    host: dbUrl.hostname,
    dialect: 'mysql',
  };
} else {
  // Local development configuration
  config = {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'react_tutorial',
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
  };
}

module.exports = {
  development: config, // For local development
  production: config,  // For production
};
