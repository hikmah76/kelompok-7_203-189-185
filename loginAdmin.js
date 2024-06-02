// Fungsi untuk login
function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    // Cek apakah username dan password sesuai (contoh sederhana)
    var registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    var adminUser = JSON.parse(localStorage.getItem("adminUser"));
  
    // Cek kredensial admin
    if (adminUser && adminUser.username === username && adminUser.password === password) {
      // Simpan status login admin ke localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
  
      // Tampilkan halaman admin
      alert("Login berhasil sebagai Admin.");
      window.location.href = 'admin.html'; // Ganti dengan halaman admin yang sesuai
      return;
    }
  
    // Cek kredensial pengguna terdaftar
    for (var i = 0; i < registeredUsers.length; i++) {
      if (registeredUsers[i].username === username && registeredUsers[i].password === password) {
        // Simpan status login ke localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
  
        // Tampilkan halaman user biasa
        alert("Login berhasil.");
        window.location.href = 'user.html'; // Ganti dengan halaman user biasa yang sesuai
        return;
      }
    }
  
    alert("Login gagal. Silakan periksa Username dan Password.");
  }
  