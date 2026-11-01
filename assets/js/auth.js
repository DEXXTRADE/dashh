// Database Mock Kredensial Pengguna (Owner & Karyawan)
const USERS = [
  {
    email: 'owner@dexxlaundry.com',
    password: 'owner123',
    name: 'Asep Owner',
    role: 'owner'
  },
  {
    email: 'staff@dexxlaundry.com',
    password: 'staff123',
    name: 'Budi Kasir',
    role: 'staff'
  }
];

// Logika Penanganan Submit Form Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = document.getElementById('email').value.trim();
    const passwordInput = document.getElementById('password').value.trim();
    const errorAlert = document.getElementById('errorAlert');

    const matchedUser = USERS.find(u => u.email === emailInput && u.password === passwordInput);

    if (matchedUser) {
      // Simpan sesi ke localStorage browser
      localStorage.setItem('dexx_user', JSON.stringify({
        name: matchedUser.name,
        email: matchedUser.email,
        role: matchedUser.role
      }));

      // Arahkan ke halaman dashboard utama di folder pages/
      window.location.href = 'pages/dashboard.html';
    } else {
      if (errorAlert) {
        errorAlert.style.display = 'block';
      }
    }
  });
}

// Fungsi Pemeriksaan Sesi Pengguna
function checkAuth() {
  const userSession = localStorage.getItem('dexx_user');
  
  if (!userSession) {
    // Jika belum login, arahkan kembali ke halaman utama login
    window.location.href = '../login.html';
    return null;
  }

  return JSON.parse(userSession);
}

// Fungsi Proteksi Halaman Berdasarkan Role (Role-Based Access Control / RBAC)
function enforceRoleAccess() {
  const user = checkAuth();
  if (!user) return;

  const currentPath = window.location.pathname;
  
  // Daftar halaman khusus yang hanya boleh dibuka oleh Owner
  const ownerOnlyPages = ['laporan.html', 'karyawan.html'];
  const isOwnerOnly = ownerOnlyPages.some(page => currentPath.includes(page));

  if (isOwnerOnly && user.role !== 'owner') {
    alert('Akses Ditolak: Halaman ini hanya dapat diakses oleh Owner DEXXLAUNDRY.');
    window.location.href = 'dashboard.html';
  }
}

// Jalankan otomatis pemeriksaan proteksi jika skrip dimuat di dalam folder pages/
if (window.location.pathname.includes('/pages/')) {
  enforceRoleAccess();
}

// Fungsi Keluar Sesi (Logout)
function logoutUser() {
  localStorage.removeItem('dexx_user');
  if (window.location.pathname.includes('/pages/')) {
    window.location.href = '../login.html';
  } else {
    window.location.href = 'login.html';
  }
}
// Tambahkan fungsi ini di dalam file auth.js
function updateSidebarBrand() {
  const saved = localStorage.getItem('dexx_settings');
  if (saved) {
    try {
      const settings = JSON.parse(saved);
      if (settings.storeName) {
        const brandEls = document.querySelectorAll('.sidebar-brand');
        brandEls.forEach(el => {
          const words = settings.storeName.trim().split(' ');
          if (words.length > 1) {
            const first = words[0];
            const rest = words.slice(1).join(' ');
            el.innerHTML = `${first}<span>${rest}</span>`;
          } else {
            el.textContent = settings.storeName;
          }
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
}

// Jalankan otomatis setiap halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  updateSidebarBrand();
});