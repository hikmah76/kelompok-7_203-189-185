// render buku perpustakaan
const perpustakaan = JSON.parse(localStorage.getItem("perpustakaan")) || [];
const tBodyLibrary = document.getElementById("daftarBukuPerpus")

function renderBooks(books) {
  tBodyLibrary.innerHTML = '';

  books.forEach((buku, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td scope="row">${index + 1 + "."}</td>
      <td>${buku.judul}</td>
      <td>${buku.pengarang}</td>
      <td>${buku.penerbit}</td>
      <td><img src="../img/${buku.gambar}" style="width: 70px;"></td>
      <td onclick="hapusBuku(${index})"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
</svg></a></td>
        `;

    tBodyLibrary.appendChild(tr)
  })
}

renderBooks(perpustakaan)

// cari buku di perpustakaan
document.getElementById("formPencarian").addEventListener("submit", function (event) {
  event.preventDefault();

  const kataKunci = document.getElementById("inputPencarian").value.toLowerCase();
  const hasilPencarian = perpustakaan.filter(buku =>
    buku.judul.toLowerCase().includes(kataKunci) ||
    buku.pengarang.toLowerCase().includes(kataKunci) ||
    buku.penerbit.toLowerCase().includes(kataKunci)
  );

  const tBodyBuku = document.getElementById("daftarBukuPerpus");
  tBodyBuku.innerHTML = '';

  hasilPencarian.forEach((buku, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <td scope="row">${index + 1 + "."}</td>
    <td>${buku.judul}</td>
    <td>${buku.pengarang}</td>
    <td>${buku.penerbit}</td>
    <td><img src="../img/${buku.gambar}" style="width: 70px;"></td>
    <td onclick="hapusBuku(${index})"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
</svg></a></td>
  `;
    tBodyBuku.appendChild(tr);
  });
})
// hapus buku dari peprustakaan
function hapusBuku(index) {
  perpustakaan.splice(index, 1);

  localStorage.setItem("perpustakaan", JSON.stringify(perpustakaan))

  renderBooks(perpustakaan)
}