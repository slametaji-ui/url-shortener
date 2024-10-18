# URL Shortener

URL Shortener adalah aplikasi web sederhana yang memungkinkan pengguna untuk memendekkan URL dengan mudah dan cepat. Aplikasi ini dibangun dengan **React.js (Vite)** di frontend, **Express.js** di backend, dan menggunakan **MySQL** untuk penyimpanan data URL yang dipendekkan.

## Fitur

- Memendekkan URL dengan opsi kode kustom.
- Menampilkan URL yang dipendekkan dan menyediakan tombol untuk menyalin URL ke clipboard.
- Mengelola pesan error, seperti kode kustom yang sudah digunakan.
- Desain modern dan minimalis menggunakan **Tailwind CSS**.
- Ikon tombol "Copy" dari **Bootstrap Icons**.

## Tech Stack

- **Frontend**: React.js (Vite), Tailwind CSS, Axios, Bootstrap Icons.
- **Backend**: Express.js, Sequelize ORM, MySQL.
- **Database**: MySQL.

## Demo

- Masukkan URL asli.
- Opsi untuk memasukkan kode kustom jika diperlukan.
- Klik tombol "Shorten URL" untuk mendapatkan URL yang dipendekkan.
- Salin URL dengan tombol "Copy URL".

## Screenshots


![URL Shortener Screenshot](https://i.imgur.com/vV9vlOx.png "welcome")
![URL Shortener Screenshot](https://i.imgur.com/Ko9eKng.png "short with custom parameter")
![URL Shortener Screenshot](https://i.imgur.com/ov4pYcC.png "short with random char parameter")

## Cara Install

### Prasyarat

Pastikan Anda sudah menginstal hal berikut di mesin Anda:

- **Node.js** versi 20 atau lebih baru
- **MySQL** sebagai database

### Langkah-langkah

1. **Clone repository ini:**

   ```bash
   git clone https://github.com/slametaji-ui/url-shortener.git
   ```
2. **Masuk ke direktori proyek:**

   ```bash
   cd url-shortener
   ```

### Backend Setup

1. **Masuk ke folder backend dan install dependencies:**

   ```bash
   cd url-shortener-backend
   npm install
   ```
2. **Buat file `.env` di root folder backend untuk konfigurasi database:**

   ```bash
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=url_shortener_db
   DB_PORT=3306
   ```
3. **Jalankan server backend:**

   ```bash
   npm run start
   ```

Backend berjalan di `http://localhost:5000`.

### Frontend Setup

1. **Masuk ke folder frontend dan install dependencies:**

   ```bash
   cd ../url-shortener-frontend
   npm install
   ```
2. **Jalankan aplikasi frontend:**

   ```bash
   npm run dev
   ```

Frontend berjalan di `http://localhost:5173`.

## Database Setup

Buat database MySQL dengan nama `url_shortener_db`. Anda dapat membuatnya dengan perintah SQL berikut:

```sql
CREATE DATABASE url_shortener_db;
```

Sequelize akan membuat tabel yang diperlukan secara otomatis saat backend dijalankan.

## Cara Menggunakan

1. Masukkan URL yang ingin dipendekkan.
2. Masukkan kode kustom (opsional).
3. Klik tombol **Shorten URL**.
4. URL yang dipendekkan akan muncul di layar dan dapat disalin dengan tombol **Copy URL**.

## Author

- Ajii

## License

[MIT License](LICENSE)
