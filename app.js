const express = require('express');
const app = express();
const port = 3000;

// Data sementara (disimpan di memori, hilang saat server restart)
let mahasiswa = [
  { id: 1, nama: 'Andi', jurusan: 'Sistem Informasi' },
  { id: 2, nama: 'Budi', jurusan: 'Informatika' },
];
let nextId = 3; // penghitung id untuk data baru

//route 
app.get('/', (req, res) => {
  res.send('Server Express.js berjalan pada port 3000 ok!');
});

// GET /mahasiswa -> seluruh data, bisa difilter: /mahasiswa?jurusan=Informatika
app.get('/mahasiswa', (req, res) => {
  const { jurusan } = req.query;

  if (jurusan) {
    const hasil = mahasiswa.filter((m) => m.jurusan === jurusan);
    return res.json(hasil);
  }

  res.json(mahasiswa);
});

// GET /mahasiswa/:id -> menampilkan satu data berdasarkan id
app.get('/mahasiswa/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = mahasiswa.find((m) => m.id === id);

  if (!data) return res.status(404).json({ message: 'Data tidak ditemukan' });
  res.json(data);
});

//Menjaalankan aplikasi pada port 3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
