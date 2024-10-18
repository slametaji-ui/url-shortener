const express = require('express');
const cors = require('cors');
const ShortURL = require('./models/ShortURL'); // Model URL yang dipendekkan
const sequelize = require('./models/index');   // Koneksi Sequelize
const app = express();

// Middleware
app.use(cors()); // Mengizinkan akses lintas asal
app.use(express.json()); // Untuk parsing request body sebagai JSON

// Fungsi untuk generate karakter random sebagai short code
const generateShortCode = () => Math.random().toString(36).substring(2, 8);

// Sinkronisasi database dan memastikan tabel terbuat
(async () => {
    try {
        await sequelize.sync();
        console.log('Database & tables created!');
    } catch (error) {
        console.error('Failed to sync database:', error);
    }
})();

// Route untuk memendekkan URL
app.post('/shorten', async (req, res) => {
    const { originalUrl, customCode } = req.body;

    // Validasi input URL
    if (!originalUrl || !/^https?:\/\/.+$/.test(originalUrl)) {
        return res.status(400).json({ error: 'Invalid URL format' });
    }

    try {
        // Cek jika customCode sudah ada di database
        if (customCode) {
            const existing = await ShortURL.findOne({ where: { shortCode: customCode } });
            if (existing) {
                return res.status(400).json({ error: 'Custom code already taken' });
            }
        }

        // Generate shortCode jika customCode tidak disediakan
        const shortCode = customCode || generateShortCode();

        // Simpan URL asli dan short code ke database
        const newShortUrl = await ShortURL.create({
            originalUrl: originalUrl,
            shortCode: shortCode,
        });

        // Mengembalikan URL yang dipendekkan
        res.json({ shortUrl: `http://localhost:5000/${shortCode}` });
    } catch (error) {
        console.error('Error in /shorten route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route untuk redirect ke URL asli berdasarkan short code
app.get('/:shortCode', async (req, res) => {
    const { shortCode } = req.params;

    try {
        // Cari URL asli berdasarkan short code
        const record = await ShortURL.findOne({ where: { shortCode: shortCode } });

        // Jika ditemukan, redirect ke URL asli
        if (record) {
            return res.redirect(record.originalUrl);
        } else {
            // Jika short code tidak ditemukan
            return res.status(404).json({ error: 'URL not found' });
        }
    } catch (error) {
        console.error('Error in redirect route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start server
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
