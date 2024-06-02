// setupAdmin.js
// Menyimpan data admin ke localStorage (jalankan sekali)
const adminUser = {
    username: "admin",
    password: "admin123"
  };
  
  // Menyimpan data admin ke localStorage
  localStorage.setItem("adminUser", JSON.stringify(adminUser));
  