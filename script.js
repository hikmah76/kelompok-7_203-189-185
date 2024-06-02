// pagination
const banyakDataPerHal = 3;
let halamanAktif = 1;
let halamanAktifCari = 1;

// render pagination 
function renderPagination() {
  const pagContainer = document.getElementById("pagination")
  pagContainer.innerHTML = " ";
  const totalPages = Math.ceil(dataBuku.length / banyakDataPerHal)
  console.log(totalPages)

  // prev
  const prevPag = document.createElement('li')
  prevPag.classList.add('page-item')
  if (halamanAktif <= 1) {
    prevPag.innerHTML = `<a href="#" class="page-link disabled">Previous</a>`
  } else {
    prevPag.innerHTML = `<a href="#" class="page-link" onclick="changePage(${parseInt(halamanAktif) - 1})">Previous</a>`
  }
  pagContainer.appendChild(prevPag)

  // count
  for (let i = 1; i <= totalPages; i++) {
    const pageItem = document.createElement('li');
    pageItem.classList.add("page-item");
    pageItem.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i})">${i}</a>`;
    pagContainer.appendChild(pageItem);
  }

  // next
  const nextPage = document.createElement('li');
  nextPage.classList.add("page-item");
  if (halamanAktif >= totalPages) {
    nextPage.innerHTML = `<a class="page-link disabled" href="#" >Next</a>`;
  } else {
    nextPage.innerHTML = `<a class="page-link" href="#" onclick="changePage(${parseInt(halamanAktif) + 1})">Next</a>`;
  }
  pagContainer.appendChild(nextPage);
}
function changePage(page) {
  halamanAktif = page;
  renderBooks((page - 1) * banyakDataPerHal);
  renderPagination();
}

// render buku
function renderBooks(startIndex) {
  const tBodyBuku = document.getElementById("daftarBuku");
  tBodyBuku.innerHTML = ""

  const endIndex = startIndex + banyakDataPerHal
  console.log(startIndex, endIndex)
  const displayBooks = dataBuku.slice(startIndex, endIndex)
  let no = (halamanAktif - 1) * banyakDataPerHal + 1;
  displayBooks.forEach((buku) => {
    const tr = document.createElement("tr")
    tr.innerHTML = `
    <td href="formPencarian" scope="row">${no + "."}</td>
    <td>${buku.judul}</td>
    <td>${buku.pengarang}</td>
    <td>${buku.penerbit}</td>
    <td><img src="img/${buku.gambar}" style="width: 70px;"></td>
    <td><button class="btn btn-primary" onclick="addToLibrary('${buku.judul}', '${buku.pengarang}', '${buku.penerbit}', '${buku.kategori}', '${buku.gambar}')">Add to Library</button></td>
  `;
    no++;
    tBodyBuku.appendChild(tr)
  })

}

// cari buku
document.getElementById("formPencarian").addEventListener("submit", function (event) {
  event.preventDefault();

  const kataKunci = document.getElementById("inputPencarian").value.toLowerCase();
  const hasilPencarian = dataBuku.filter(buku =>
    buku.judul.toLowerCase().includes(kataKunci) ||
    buku.pengarang.toLowerCase().includes(kataKunci) ||
    buku.penerbit.toLowerCase().includes(kataKunci)

  );
  console.log('hasil', hasilPencarian.length)

  if (hasilPencarian.length === 7 || hasilPencarian.length === 0) {
    halamanAktif = 1
    renderBooks(0);
    renderPagination();
  } else {
    const banyakDataPerHal = 3
    halamanAktifCari = 1;
    renderBooksCari(0)
    renderPaginationCari()
  }

  function renderPaginationCari() {
    const pagContainer = document.getElementById("pagination")
    pagContainer.innerHTML = " ";
    const totalPages = Math.ceil(hasilPencarian.length / banyakDataPerHal)
    console.log('total pages', totalPages)
    console.log('halaman aktif', halamanAktifCari)

    // prev
    const prevPag = document.createElement('li')
    prevPag.classList.add('page-item')
    if (halamanAktifCari <= 1) {
      prevPag.innerHTML = `<a href="#" class="page-link disabled">Previous</a>`
    } else {
      prevPag.innerHTML = `<a href="#" class="page-link" onclick="changePage(${parseInt(halamanAktifCari) - 1})">Previous</a>`
    }
    pagContainer.appendChild(prevPag)

    // count
    for (let i = 1; i <= totalPages; i++) {
      const pageItem = document.createElement('li');
      pageItem.classList.add("page-item");
      pageItem.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i}, ${true})">${i}</a>`;
      pagContainer.appendChild(pageItem);
    }

    // next
    const nextPage = document.createElement('li');
    nextPage.classList.add("page-item");
    if (halamanAktifCari >= totalPages) {
      nextPage.innerHTML = `<a class="page-link disabled" href="#" >Next</a>`;
    } else {
      nextPage.innerHTML = `<a class="page-link" href="#" onclick="changePage(${parseInt(halamanAktifCari) + 1}, true)">Next</a>`;
    }
    pagContainer.appendChild(nextPage);

    function changePage(page) {
      halamanAktifCari = page;
      renderBooksCari((page - 1) * hasilPencarian.length);
      renderPaginationCari();
    }
  }

  function renderBooksCari(startIndex) {
    const tBodyBuku = document.getElementById("daftarBuku");
    tBodyBuku.innerHTML = '';

    const endIndex = startIndex + banyakDataPerHal
    console.log(startIndex, endIndex)
    const displayBooks = hasilPencarian.slice(startIndex, endIndex)
    let no = (halamanAktifCari - 1) * banyakDataPerHal + 1;
    displayBooks.forEach((buku) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
    <td href="inputPencarian" scope="row">${no + "."}</td>
    <td>${buku.judul}</td>
    <td>${buku.pengarang}</td>
    <td>${buku.penerbit}</td>
    <td><img src="img/${buku.gambar}" style="width: 70px;"></td>
    <td><button class="btn btn-primary" onclick="addToLibrary('${buku.judul}', '${buku.pengarang}', '${buku.penerbit}', '${buku.kategori}', '${buku.gambar}')">Add to Library</button></td>
  `;
      no++;
      tBodyBuku.appendChild(tr);
    });
  }
});
renderBooks(0);
renderPagination()

// tambah ke library
function addToLibrary(judul, pengarang, penerbit, kategori, gambar) {
  const perpustakaan = JSON.parse(localStorage.getItem("perpustakaan")) || [];

  const bukuBaru = { judul, pengarang, penerbit, kategori, gambar };
  perpustakaan.push(bukuBaru)

  localStorage.setItem("perpustakaan", JSON.stringify(perpustakaan))
}
