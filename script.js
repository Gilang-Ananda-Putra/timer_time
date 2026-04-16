let dataEntries = JSON.parse(localStorage.getItem('trackerData')) || [];

// Fungsi Modal
function showModal() {
    if (!document.getElementById('itemName').value) return alert("Isi nama (n) dulu!");
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Inisialisasi Counter
function initCounter() {
    const name = document.getElementById('itemName').value;
    const now = new Date();
    const entry = {
        id: Date.now(),
        name: name,
        timestamp: now.toISOString(),
        type: 'counter',
        value: 0
    };
    
    // Langsung buat prompt sederhana untuk tambah/kurang atau simpan awal
    let count = parseInt(prompt("Masukkan jumlah awal (atau klik +/- nanti di sistem real-time):", "1"));
    entry.value = count;
    
    dataEntries.push(entry);
    saveAndRender();
    closeModal();
}

// Inisialisasi Timer (Sederhana)
function initTimer() {
    const name = document.getElementById('itemName').value;
    const start = new Date();
    alert("Timer dimulai untuk " + name);
    
    const end = new Date(start.getTime() + 5000); // Simulasi 5 detik atau gunakan stop button
    const duration = prompt("Masukkan durasi (detik):", "60");

    const entry = {
        id: Date.now(),
        name: name,
        timestamp: start.toISOString(),
        type: 'timer',
        value: duration + " detik"
    };

    dataEntries.push(entry);
    saveAndRender();
    closeModal();
}

function saveAndRender() {
    localStorage.setItem('trackerData', JSON.stringify(dataEntries));
    renderTable();
}

function renderTable() {
    const tbody = document.getElementById('tableBody');
    const intervalVal = parseInt(document.getElementById('intervalValue').value);
    const intervalUnit = document.getElementById('intervalUnit').value;
    
    tbody.innerHTML = '';

    dataEntries.forEach((entry, index) => {
        const startTime = new Date(entry.timestamp);
        const endTime = new Date(startTime.getTime());

        // Hitung range waktu berdasarkan pilihan user
        if (intervalUnit === 'second') endTime.setSeconds(startTime.getSeconds() + intervalVal);
        else if (intervalUnit === 'minute') endTime.setMinutes(startTime.getMinutes() + intervalVal);
        else if (intervalUnit === 'hour') endTime.setHours(startTime.getHours() + intervalVal);

        const timeRange = `${formatTime(startTime)} - ${formatTime(endTime)}`;

        const row = `<tr>
            <td>${index + 1}</td>
            <td>${timeRange}</td>
            <td>${entry.name}</td>
            <td>${entry.value}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function formatTime(date) {
    return date.getHours().toString().padStart(2, '0') + "." + 
           date.getMinutes().toString().padStart(2, '0');
}

function clearData() {
    if(confirm("Hapus semua data?")) {
        dataEntries = [];
        saveAndRender();
    }
}

// Load data saat pertama kali buka
renderTable();