if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
      .then(function (registration) {
          console.log('Service Worker Teregristrasi', registration.scope);
      })
      .catch(function (error) {
          console.log('Service Worker registration failed:', error);
      });
}
// Fungsi untuk menghasilkan token acak 6 digit
function generateRandomToken() {
  const min = 100000; // Nilai minimal (6 digit)
  const max = 999999; // Nilai maksimal (6 digit)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fungsi untuk menampilkan notifikasi
function displayNotification() {
  // Memanggil fungsi generateRandomToken untuk mendapatkan token acak
  const randomToken = generateRandomToken();

  // Opsi notifikasi dengan token acak
  const options = {
      body: 'Ini adalah pesan notifikasi.',
      icon: 'Gambar/notif.png', // Ganti dengan lokasi ikon notifikasi Anda
      badge: 'Gambar/badge.png', // Ganti dengan lokasi badge notifikasi Anda
      data: {
          pushToken: randomToken
      }
  };

  // Membuat objek notifikasi
  const notification = new Notification('Contoh Notifikasi', options);

  // Menampilkan token acak ke dalam console log
  console.log('Token Push:', randomToken);

  // Menangani interaksi pengguna dengan notifikasi
  notification.onclick = function () {
      // Dalam contoh ini, tidak ada tindakan khusus saat notifikasi diklik
      alert('Anda mengklik notifikasi.');
  };
}

// Memeriksa apakah notifikasi didukung oleh peramban
document.addEventListener('DOMContentLoaded', function () {
  if ('Notification' in window) {
      // Meminta izin notifikasi saat halaman dimuat
      Notification.requestPermission()
          .then(function (permission) {
              if (permission === 'granted') {
                  // Izin diberikan, notifikasi dapat dikirim
                  displayNotification();
                  alert('Izin push notification diberikan. Anda akan menerima pemberitahuan.');
              } else if (permission === 'denied') {
                  // Izin diblokir oleh pengguna
                  alert('Izin push notification diblokir. Anda tidak akan menerima pemberitahuan.');
              }
          });
  }
});
