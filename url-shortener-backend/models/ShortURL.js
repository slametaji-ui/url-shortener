const { DataTypes } = require('sequelize');
const sequelize = require('./index');

// Definisikan model untuk menyimpan URL asli dan short code
const ShortURL = sequelize.define('ShortURL', {
    originalUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    shortCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'short_urls', // Nama tabel di MySQL
    timestamps: false, // Jika tidak ingin timestamp otomatis
});

module.exports = ShortURL;
