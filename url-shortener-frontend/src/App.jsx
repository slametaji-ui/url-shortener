import React, { useState } from 'react';
import axios from 'axios'; // Pastikan axios di-install: npm install axios

function App() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [customCode, setCustomCode] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State untuk menangani pesan error
    const [copySuccess, setCopySuccess] = useState(''); // State untuk pesan copy success

    const handleSubmit = async (e) => {
        e.preventDefault(); // Mencegah reload halaman default saat submit

        try {
            // Mengirim data ke backend
            const response = await axios.post('http://localhost:5000/shorten', {
                originalUrl,
                customCode,
            });

            // Reset error message dan success message jika request berhasil
            setErrorMessage('');
            setCopySuccess('');

            // Mendapatkan shortened URL dari response
            setShortUrl(response.data.shortUrl);
        } catch (error) {
            // Menangkap pesan error dari response
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.error); // Simpan pesan error di state
            } else {
                setErrorMessage('Something went wrong, please try again.');
            }
        }
    };

    // Fungsi untuk menyalin URL ke clipboard
    const copyToClipboard = () => {
        navigator.clipboard.writeText(shortUrl)
            .then(() => {
                setCopySuccess('Copied!');
            })
            .catch(err => {
                setCopySuccess('Failed to copy');
                console.error('Error copying to clipboard: ', err);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
                <h1 className="text-3xl font-semibold mb-6 text-center text-gray-700">URL Shortener</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Original URL</label>
                        <input
                            type="text"
                            value={originalUrl}
                            onChange={(e) => setOriginalUrl(e.target.value)}
                            placeholder="https://example.com"
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Custom Short Code (Optional)</label>
                        <input
                            type="text"
                            value={customCode}
                            onChange={(e) => setCustomCode(e.target.value)}
                            placeholder="Custom short code"
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium text-lg rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition ease-in-out duration-150"
                        >
                            Shorten URL
                        </button>
                    </div>
                </form>

                {/* Menampilkan pesan error jika ada */}
                {errorMessage && (
                    <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        <p>{errorMessage}</p>
                    </div>
                )}

                {/* Menampilkan shortened URL jika berhasil */}
                {shortUrl && (
                    <div className="mt-8 p-4 bg-green-50 border border-green-300 rounded-lg">
                        <p className="text-green-700 text-lg">
                            Shortened URL:{" "}
                            <a
                                href={shortUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-indigo-600 hover:text-indigo-700"
                            >
                                {shortUrl}
                            </a>
                        </p>

                        {/* Tombol Copy URL */}
                        <div className="mt-2 flex items-center space-x-2">
                            <button
                                onClick={copyToClipboard}
                                className="flex items-center px-3 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                            >
                                <i className="bi bi-clipboard mr-2"></i> Copy URL
                            </button>
                            {copySuccess && <span className="text-green-600">{copySuccess}</span>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
