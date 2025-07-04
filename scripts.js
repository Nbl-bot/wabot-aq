document.addEventListener('DOMContentLoaded', function () {

  /**
   * Helper function to create SVG icons.
   */
  function createIcon(iconId) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'icon');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${iconId}`);
    svg.appendChild(use);
    return svg;
  }

  /* ================================= */
  /* 1. Fitur Chat (REPAIRED & ENHANCED) */
  /* ================================= */
  const chatCard = document.getElementById('chat-card');
  chatCard.innerHTML = `
    <div class="card-header">
        <h2>Asisten Fisioterapi Virtual</h2>
    </div>
    <div id="chat-box"></div>
    <div id="chat-input-container">
      <input type="text" id="chat-input" placeholder="Ketik pertanyaan Anda...">
      <button id="send-button">Kirim</button>
    </div>
  `;

  const chatBox = document.getElementById('chat-box');
  const chatInput = document.getElementById('chat-input');
  const sendButton = document.getElementById('send-button');

  // Function to add a message to the chat box
  function addChatMessage(text, sender) {
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('chat-message', `${sender}-message`);

    const avatar = document.createElement('div');
    avatar.classList.add('avatar');
    // You can add SVG icons for user/bot inside the avatar if you define them in HTML
    
    const bubble = document.createElement('div');
    bubble.classList.add('message-bubble');
    bubble.textContent = text;
    
    messageWrapper.appendChild(avatar);
    messageWrapper.appendChild(bubble);
    chatBox.appendChild(messageWrapper);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function handleSendChat() {
    const msg = chatInput.value.trim();
    if (!msg) return;

    addChatMessage(msg, 'user');
    chatInput.value = '';

    // Bot response logic
    let response = "Maaf, saya belum mengerti. Silakan coba pertanyaan lain mengenai cedera.";
    const lowerMsg = msg.toLowerCase();

    if (lowerMsg.includes('halo') || lowerMsg.includes('hai')) {
      response = "Halo! Ada yang bisa saya bantu terkait keluhan fisioterapi Anda?";
    } else if (lowerMsg.includes('pinggang')) {
      response = "Nyeri pinggang seringkali disebabkan postur yang buruk. Coba lakukan latihan 'cat-cow' atau 'bird-dog' secara perlahan. Jangan dipaksakan jika terasa sakit.";
    } else if (lowerMsg.includes('lutut')) {
      response = "Untuk cedera lutut, metode RICE (Rest, Ice, Compression, Elevation) adalah pertolongan pertama yang baik. Namun, konsultasi lebih lanjut dengan ahli sangat disarankan.";
    } else if (lowerMsg.includes('terima kasih')) {
      response = "Sama-sama! Semoga lekas pulih. Jangan ragu bertanya lagi jika perlu.";
    }

    setTimeout(() => {
      addChatMessage(response, 'bot');
    }, 800);
  }

  sendButton.addEventListener('click', handleSendChat);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSendChat();
  });
  
  // Initial bot message
  addChatMessage("Selamat datang di Physio Connect! Ada yang bisa dibantu?", 'bot');

  /* ==================================== */
  /* 2. Pencarian Cedera (REPAIRED)       */
  /* ==================================== */
  const searchCard = document.getElementById('search-card');
  searchCard.innerHTML = `
    <div class="card-header"><h2>Info Cedera</h2></div>
    <div id="search-input-wrapper">
        <input type="text" id="search-input" placeholder="Cari info: lutut, pinggang, bahu...">
    </div>
    <div id="search-results"></div>
  `;

  const dataCedera = [
    { title: 'Cedera ACL', desc: 'Robekan pada ligamen krusiatum anterior di lutut, sering terjadi pada atlet.' },
    { title: 'Low Back Pain', desc: 'Nyeri umum pada area pinggang bagian bawah, sering disebabkan oleh postur atau otot lemah.' },
    { title: 'Tennis Elbow', desc: 'Peradangan pada tendon di sisi luar siku akibat gerakan berulang.' },
    { title: 'Plantar Fasciitis', desc: 'Nyeri tajam di tumit, terutama saat langkah pertama di pagi hari.' },
    { title: 'Rotator Cuff Injury', desc: 'Cedera pada otot dan tendon di sekitar sendi bahu, nyeri saat mengangkat lengan.' }
  ];
  const searchResultsDiv = document.getElementById('search-results');
  const searchInput = document.getElementById('search-input');

  function tampilkanHasil(keyword = '') {
    searchResultsDiv.innerHTML = ''; // Clear previous results
    const filtered = dataCedera.filter(item => 
        item.title.toLowerCase().includes(keyword) || 
        item.desc.toLowerCase().includes(keyword)
    );

    if (filtered.length === 0) {
      searchResultsDiv.innerHTML = '<p style="padding: 1rem;">Tidak ada informasi yang cocok ditemukan.</p>';
      return;
    }

    filtered.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'search-item';
      
      const titleH4 = document.createElement('h4');
      titleH4.textContent = item.title;
      
      const descP = document.createElement('p');
      descP.textContent = item.desc;
      
      itemDiv.appendChild(titleH4);
      itemDiv.appendChild(descP);
      searchResultsDiv.appendChild(itemDiv);
    });
  }

  searchInput.addEventListener('input', (e) => tampilkanHasil(e.target.value.toLowerCase()));
  tampilkanHasil(); // Initial display

  /* ======================================== */
  /* 3. Jurnal Latihan / Tracking (REPAIRED)  */
  /* ======================================== */
  const trackingCard = document.getElementById('tracking-card');
  trackingCard.innerHTML = `
    <div class="card-header"><h2>Jurnal Latihan & Terapi</h2></div>
    <form id="tracking-form">
      <input type="date" id="tgl" required>
      <select id="lokasi" required>
        <option value="rumah">Di Rumah</option>
        <option value="klinik">Di Klinik</option>
      </select>
      <input type="text" id="aktivitas" placeholder="Contoh: Peregangan Punggung" required>
      <textarea id="catatan" placeholder="Catatan tambahan (durasi, intensitas, dll.)"></textarea>
      <button type="submit">Simpan Catatan</button>
    </form>
    <div id="log-list"></div>
  `;

  const trackingForm = document.getElementById('tracking-form');
  const logListDiv = document.getElementById('log-list');
  document.getElementById('tgl').valueAsDate = new Date(); // Set today's date

  let logs = JSON.parse(localStorage.getItem('physioLogs') || '[]');

  function renderLogs() {
    logListDiv.innerHTML = '';
    if (logs.length === 0) {
        logListDiv.innerHTML = '<p style="text-align:center; padding: 1rem; color: var(--light-text-color);">Belum ada catatan.</p>';
        return;
    }
    
    const sortedLogs = logs.sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedLogs.forEach(log => {
      const logItemDiv = document.createElement('div');
      logItemDiv.classList.add('log-item', log.location); // 'rumah' or 'klinik'

      const headerDiv = document.createElement('div');
      headerDiv.className = 'log-header';

      const activityH4 = document.createElement('h4');
      activityH4.textContent = log.activity;
      
      const dateSpan = document.createElement('span');
      dateSpan.textContent = new Date(log.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
      
      headerDiv.appendChild(activityH4);
      headerDiv.appendChild(dateSpan);
      
      logItemDiv.appendChild(headerDiv);

      if (log.notes) {
        const notesP = document.createElement('p');
        notesP.textContent = log.notes;
        logItemDiv.appendChild(notesP);
      }

      logListDiv.appendChild(logItemDiv);
    });
  }
  
  renderLogs();

  trackingForm.onsubmit = e => {
    e.preventDefault();
    const newLog = {
      date: document.getElementById('tgl').value,
      location: document.getElementById('lokasi').value,
      activity: document.getElementById('aktivitas').value.trim(),
      notes: document.getElementById('catatan').value.trim()
    };
    if (!newLog.date || !newLog.activity) {
        alert("Tanggal dan aktivitas tidak boleh kosong.");
        return;
    }
    logs.push(newLog);
    localStorage.setItem('physioLogs', JSON.stringify(logs));
    renderLogs();
    trackingForm.reset();
    document.getElementById('tgl').valueAsDate = new Date();
  };

  /* ======================================== */
  /* 4. Lokasi Klinik (REPAIRED & ENHANCED)   */
  /* ======================================== */
  const mapCard = document.getElementById('map-card');
  mapCard.innerHTML = `
    <div class="card-header"><h2>Lokasi Klinik Terdekat</h2></div>
    <div id="map"></div>
  `;
  // Set default view to a central point in Indonesia
  const map = L.map('map').setView([-2.54, 118.01], 5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  
  // Try to locate user
  map.locate({setView: true, maxZoom: 14});
  map.on('locationfound', (e) => {
    L.marker(e.latlng).addTo(map).bindPopup("<b>Anda di sini!</b>").openPopup();
    L.circle(e.latlng, e.accuracy).addTo(map);
  });
  map.on('locationerror', () => {
    console.log("Akses lokasi ditolak atau gagal. Menampilkan lokasi default.");
  });

  const klinik = [
    { lat: -6.2297, lon: 106.829, nama: 'Klinik Fisio Jakarta Pusat' },
    { lat: -7.2575, lon: 112.752, nama: 'Klinik Rehab Surabaya' },
    { lat: -6.9175, lon: 107.619, nama: 'Bandung Physio Center' },
    { lat: -7.566, lon: 110.822, nama: 'Fisioterapi Solo Sehat' }
  ];
  klinik.forEach(k => {
    L.marker([k.lat, k.lon]).addTo(map).bindPopup(`<b>${k.nama}</b>`);
  });

  /* ======================================== */
  /* 5. Placeholder & Other Features          */
  /* ======================================== */
  document.getElementById('video-card').innerHTML = `<div class="card-header"><h2>Video Panduan</h2></div><p><a href="https://youtu.be/uUU9z7KYiXc?si=3a6q1ob33A4-mTMQ"> Video </a></p>`;
  document.getElementById('reminder-card').innerHTML = `<div class="card-header"><h2>Reminder Harian</h2></div><p>Fitur pengingat latihan segera hadir.</p>`;
  document.getElementById('quiz-card').innerHTML = `<div class="card-header"><h2>Kuis Edukasi</h2></div><p>Akan tersedia dalam versi berikutnya.</p>`;
  document.getElementById('forum-card').innerHTML = `<div class="card-header"><h2>Forum Pasien</h2></div><p>Tempat diskusi komunitas akan ditambahkan.</p>`;
  document.getElementById('jurnal-card').innerHTML = `<div class="card-header"><h2>Jurnal & Riset</h2></div><p><a href="https://journals2.ums.ac.id/index.php/fisiomu/index" target="_blank" rel="noopener noreferrer">Journal of Orthopaedic & Sports Physical Therapy (JOSPT)</a></p>`;
  document.getElementById('bookmark-card').innerHTML = `<div class="card-header"><h2>Bookmark</h2></div><p>Simpan info cedera favoritmu nanti.</p>`;
  document.getElementById('sertifikat-card').innerHTML = `<div class="card-header"><h2>Sertifikat Terapi</h2></div><p>Fitur ini masih dikembangkan.</p>`;
  
  const darkModeCard = document.getElementById('darkmode-card');
  darkModeCard.innerHTML = `<div class="card-header"><h2>Mode Tampilan</h2></div><button id="dark-mode-toggle">Ganti ke Mode Gelap</button>`;
  const toggleBtn = document.getElementById('dark-mode-toggle');
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDarkMode = document.body.classList.contains('dark');
    toggleBtn.textContent = isDarkMode ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap';
  });

  document.getElementById('progress-card').innerHTML = `<div class="card-header"><h2>Progress Tracker</h2></div><canvas id="chartProgress"></canvas>`;
  const ctx = document.getElementById('chartProgress').getContext('2d');
  if (ctx) {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei'],
        datasets: [{
          label: 'Frekuensi Latihan per Bulan',
          data: [5, 9, 7, 12, 10],
          borderColor: '#00838f',
          backgroundColor: 'rgba(0, 131, 143, 0.1)',
          fill: true,
          tension: 0.3
        }]
      }
    });
  }
}); 