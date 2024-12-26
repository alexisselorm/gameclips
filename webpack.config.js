const Dotenv = require('dotenv-webpack');

module.exports = {
  plugins: [
    new Dotenv({
      path: './.vercel/.env', // Path to your .env file
      safe: true, // Load .env.example to verify required variables
    }),
  ],
};
