const { Sequelize } = require('sequelize');
require('dotenv').config();

// Membuat koneksi Sequelize ke MySQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
});

// Mengautentikasi koneksi
sequelize.authenticate()
    .then(() => console.log('Connected to MySQL database!'))
    .catch((err) => console.error('Unable to connect to the database:', err));

module.exports = sequelize;