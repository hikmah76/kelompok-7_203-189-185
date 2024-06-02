document.addEventListener('DOMContentLoaded', function() {
    const peminjamanForm = document.getElementById('peminjamanForm');
    const daftarPeminjaman = document.getElementById('daftarPeminjaman');
  
    function loadPeminjaman() {
      const peminjamanData = JSON.parse(localStorage.getItem('peminjamanData')) || [];
      peminjamanData.forEach((item, index) => {
        const row = daftarPeminjaman.insertRow(index);
        row.insertCell(0).innerHTML = index + 1;
        row.insertCell(1).innerHTML = item.nama;
        row.insertCell(2).innerHTML = item.judulBuku;
        row.insertCell(3).innerHTML = item.tanggalPinjam;
        row.insertCell(4).innerHTML = item.tanggalKembali;
      });
    }
  
    peminjamanForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const nama = document.getElementById('nama').value;
      const judulBuku = document.getElementById('judulBuku').value;
      const tanggalPinjam = document.getElementById('tanggalPinjam').value;
      const tanggalKembali = document.getElementById('tanggalKembali').value;
  
      const peminjamanData = JSON.parse(localStorage.getItem('peminjamanData')) || [];
      peminjamanData.push({ nama, judulBuku, tanggalPinjam, tanggalKembali });
      localStorage.setItem('peminjamanData', JSON.stringify(peminjamanData));
  
      const rowCount = daftarPeminjaman.rows.length;
      const row = daftarPeminjaman.insertRow(rowCount);
      row.insertCell(0).innerHTML = rowCount + 1;
      row.insertCell(1).innerHTML = nama;
      row.insertCell(2).innerHTML = judulBuku;
      row.insertCell(3).innerHTML = tanggalPinjam;
      row.insertCell(4).innerHTML = tanggalKembali;
  
      peminjamanForm.reset();
    });
  
    loadPeminjaman();
  });
  