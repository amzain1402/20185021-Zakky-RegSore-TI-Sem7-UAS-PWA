async function addAndDisplayMahasiswa() {
    const form = document.getElementById('mahasiswaForm');
    const mahasiswa = {
        nama: form.nama.value,
        nim: form.nim.value,
        kelas: form.kelas.value,
        semester: form.semester.value,
        jurusan: form.jurusan.value,
        email: form.email.value, // Menambah field email
        alasan: form.alasan.value
    };

    try {
        // Buka koneksi dengan IndexedDB
        const db = await openDB();

        // Tambahkan data mahasiswa ke dalam objectStore
        const transaction = db.transaction(['mahasiswa'], 'readwrite');
        const objectStore = transaction.objectStore('mahasiswa');
        await objectStore.add(mahasiswa);

        console.log('Mahasiswa ditambahkan ke IndexedDB:', mahasiswa);

        // Bersihkan formulir setelah data ditambahkan
        form.reset();
    } catch (error) {
        console.error('Gagal menambahkan mahasiswa:', error);
    }
}

function openDB() {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open('MahasiswaDB', 1);

        request.onerror = function (event) {
            reject(event.target.errorCode);
        };

        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            const objectStore = db.createObjectStore('mahasiswa', { keyPath: 'nim' });

            objectStore.createIndex('nama', 'nama', { unique: false });
            objectStore.createIndex('kelas', 'kelas', { unique: false });
            objectStore.createIndex('semester', 'semester', { unique: false });
            objectStore.createIndex('jurusan', 'jurusan', { unique: false });
            objectStore.createIndex('email', 'email', { unique: false }); // Menambah field email
            objectStore.createIndex('alasan', 'alasan', { unique: false });
        };

        request.onsuccess = function (event) {
            resolve(event.target.result);
        };
    });
}
