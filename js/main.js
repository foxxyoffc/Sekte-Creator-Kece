// DOM Elements
let currentTheme = localStorage.getItem('theme') || 'dark';
let isMusicPlaying = false;
let currentVideo = null;

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initDateTime();
    initNavToggle();
    initCustomCursor();
    initMusicControl();
    initVideoControl();
    loadStats();
    initScrollReveal();
    loadStrukturData();
    loadTentangData();
    loadJoinLinks();
    loadEventData();
    loadAlatBantu();
    initAdminCheck();
});

// Theme Toggle
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const sunIcon = themeToggle.querySelector('.fa-sun');
    const moonIcon = themeToggle.querySelector('.fa-moon');
    
    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'flex';
    }
    
    themeToggle.addEventListener('click', () => {
        if (currentTheme === 'dark') {
            document.body.classList.add('light-theme');
            if (sunIcon) sunIcon.style.display = 'none';
            if (moonIcon) moonIcon.style.display = 'flex';
            currentTheme = 'light';
        } else {
            document.body.classList.remove('light-theme');
            if (sunIcon) sunIcon.style.display = 'flex';
            if (moonIcon) moonIcon.style.display = 'none';
            currentTheme = 'dark';
        }
        localStorage.setItem('theme', currentTheme);
    });
}

// Date & Time
function initDateTime() {
    updateDateTime();
    setInterval(updateDateTime, 1000);
}

function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateCard = document.getElementById('dateCard');
    const timeCard = document.getElementById('timeCard');
    
    if (dateCard) {
        dateCard.innerHTML = now.toLocaleDateString('id-ID', options);
    }
    if (timeCard) {
        timeCard.innerHTML = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
}

// Nav Toggle for Mobile
function initNavToggle() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}

// Custom Cursor
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
        cursorFollower.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
    });
    
    document.querySelectorAll('a, button, .leader-card, .tool-card, .event-card, .card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('active');
        });
    });
}

// Music Control
function initMusicControl() {
    const musicControl = document.getElementById('musicControl');
    const musicIcon = document.getElementById('musicIcon');
    const bgMusic = document.getElementById('bgMusic');
    
    if (!musicControl) return;
    
    const musicState = localStorage.getItem('musicPlaying');
    if (musicState === 'true') {
        isMusicPlaying = true;
        if (musicIcon) musicIcon.className = 'fas fa-stop';
        bgMusic.play().catch(e => console.log('Autoplay blocked'));
    }
    
    musicControl.addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            if (musicIcon) musicIcon.className = 'fas fa-play';
            isMusicPlaying = false;
        } else {
            bgMusic.play();
            if (musicIcon) musicIcon.className = 'fas fa-stop';
            isMusicPlaying = true;
        }
        localStorage.setItem('musicPlaying', isMusicPlaying);
    });
}

// Video Control di Hero
function initVideoControl() {
    const heroVideo = document.getElementById('heroVideo');
    const videoPlayBtn = document.getElementById('videoPlayBtn');
    
    if (!heroVideo || !videoPlayBtn) return;
    
    videoPlayBtn.addEventListener('click', () => {
        if (heroVideo.paused) {
            heroVideo.play();
            videoPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            heroVideo.pause();
            videoPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
    
    heroVideo.addEventListener('play', () => {
        videoPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
    });
    
    heroVideo.addEventListener('pause', () => {
        videoPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
    });
}

// Load Stats from localStorage
function loadStats() {
    const totalMembers = localStorage.getItem('totalMembers') || '156';
    const totalDivisions = localStorage.getItem('totalDivisions') || '4';
    
    const membersEl = document.getElementById('totalMembers');
    const divisionsEl = document.getElementById('totalDivisions');
    
    if (membersEl) membersEl.textContent = totalMembers;
    if (divisionsEl) divisionsEl.textContent = totalDivisions;
}

// Scroll Reveal Animation
function initScrollReveal() {
    const elements = document.querySelectorAll('.card, .leader-card, .tool-card, .event-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Greeting based on time
function getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'pagi';
    if (hour >= 12 && hour < 15) return 'siang';
    if (hour >= 15 && hour < 18) return 'sore';
    return 'malam';
}

// Load Struktur Data
function loadStrukturData() {
    const data = JSON.parse(localStorage.getItem('organizationData')) || {
        owner: { name: 'Raps', wa: '6281234567890', bio: 'Founder & Creator, pecinta teknologi dan komunitas' },
        coOwners: [
            { name: 'Alex', wa: '6281234567891', bio: 'Co-Founder, ahli strategi' },
            { name: 'Budi', wa: '6281234567892', bio: 'Co-Founder, kreator konten' }
        ],
        leaders: [
            { division: 'Divisi Creative', name: 'Citra', wa: '6281234567893', bio: 'Lead Designer, suka desain grafis' },
            { division: 'Divisi Tech', name: 'Dito', wa: '6281234567894', bio: 'Lead Developer, expert in coding' }
        ]
    };
    
    // Load Owner
    const ownerName = document.getElementById('ownerName');
    const ownerBio = document.getElementById('ownerBio');
    const ownerCard = document.getElementById('ownerCard');
    
    if (ownerName) ownerName.textContent = data.owner.name;
    if (ownerBio) ownerBio.textContent = data.owner.bio;
    if (ownerCard) ownerCard.setAttribute('data-wa', data.owner.wa);
    
    // Load Co-Owners
    const coOwnersContainer = document.getElementById('coOwnersContainer');
    if (coOwnersContainer) {
        coOwnersContainer.innerHTML = '';
        data.coOwners.forEach((co, index) => {
            coOwnersContainer.innerHTML += `
                <div class="leader-card" data-wa="${co.wa}">
                    <div class="leader-avatar"><i class="fas fa-user-tie"></i></div>
                    <div class="leader-name">${co.name}</div>
                    <div class="leader-role">Co-Owner ${index + 1}</div>
                    <div class="leader-bio">${co.bio}</div>
                </div>
            `;
        });
    }
    
    // Load Leaders
    const leadersContainer = document.getElementById('leadersContainer');
    if (leadersContainer) {
        leadersContainer.innerHTML = '';
        data.leaders.forEach((leader, index) => {
            leadersContainer.innerHTML += `
                <div class="leader-card" data-wa="${leader.wa}">
                    <div class="leader-avatar"><i class="fas fa-chalkboard-user"></i></div>
                    <div class="leader-name">${leader.name}</div>
                    <div class="leader-role">${leader.division}</div>
                    <div class="leader-bio">${leader.bio}</div>
                </div>
            `;
        });
    }
    
    // Add click event to all leader cards for WhatsApp redirect
    document.querySelectorAll('.leader-card').forEach(card => {
        card.addEventListener('click', () => {
            const waNumber = card.getAttribute('data-wa');
            if (waNumber) {
                window.open(`https://wa.me/${waNumber}`, '_blank');
            }
        });
    });
}

// Load Tentang Data
function loadTentangData() {
    const data = JSON.parse(localStorage.getItem('organizationData')) || {
        divisions: [
            { name: 'Divisi Creative', members: 25 },
            { name: 'Divisi Tech', members: 30 },
            { name: 'Divisi Event', members: 20 },
            { name: 'Divisi Marketing', members: 15 }
        ]
    };
    
    const totalAnggota = document.getElementById('totalAnggotaTentang');
    const totalDivisi = document.getElementById('totalDivisiTentang');
    const divisiList = document.getElementById('divisiList');
    
    let total = 0;
    data.divisions.forEach(div => { total += div.members; });
    
    if (totalAnggota) totalAnggota.textContent = total;
    if (totalDivisi) totalDivisi.textContent = data.divisions.length;
    
    if (divisiList) {
        divisiList.innerHTML = '';
        data.divisions.forEach(div => {
            divisiList.innerHTML += `
                <div class="card">
                    <h3><i class="fas fa-layer-group"></i> ${div.name}</h3>
                    <p>Jumlah Anggota: ${div.members} orang</p>
                </div>
            `;
        });
    }
}

// Load Join Links
function loadJoinLinks() {
    const links = JSON.parse(localStorage.getItem('joinLinks')) || {
        seleksi: { title: 'Link Seleksi', description: 'Klik untuk bergabung ke grup seleksi', url: 'https://chat.whatsapp.com/xxxxx' },
        family: { title: 'SCK FAMILY', description: 'Klik untuk bergabung ke grup utama SCK', url: 'https://chat.whatsapp.com/xxxxx' }
    };
    
    const seleksiCard = document.getElementById('seleksiCard');
    const familyCard = document.getElementById('familyCard');
    
    if (seleksiCard) {
        seleksiCard.querySelector('h3').textContent = links.seleksi.title;
        seleksiCard.querySelector('p').textContent = links.seleksi.description;
        seleksiCard.setAttribute('data-url', links.seleksi.url);
        seleksiCard.addEventListener('click', () => {
            window.open(seleksiCard.getAttribute('data-url'), '_blank');
        });
    }
    
    if (familyCard) {
        familyCard.querySelector('h3').textContent = links.family.title;
        familyCard.querySelector('p').textContent = links.family.description;
        familyCard.setAttribute('data-url', links.family.url);
        familyCard.addEventListener('click', () => {
            window.open(familyCard.getAttribute('data-url'), '_blank');
        });
    }
}

// Load Event Data
function loadEventData() {
    const event = JSON.parse(localStorage.getItem('eventData')) || {
        hasEvent: false,
        imageUrl: '',
        description: '',
        contacts: ['6281234567890', '6281234567891', '6281234567892']
    };
    
    const eventContainer = document.getElementById('eventContainer');
    const reqEventBtn = document.getElementById('reqEventBtn');
    
    if (!eventContainer) return;
    
    if (event.hasEvent && event.imageUrl && event.description) {
        let contactsHtml = '';
        event.contacts.forEach(contact => {
            contactsHtml += `<a href="https://wa.me/${contact}" class="event-contact-wa" target="_blank"><i class="fab fa-whatsapp"></i> ${contact}</a>`;
        });
        
        eventContainer.innerHTML = `
            <div class="event-card">
                <img src="${event.imageUrl}" alt="Event" class="event-image" onerror="this.src='https://via.placeholder.com/800x400?text=Event+Image'">
                <div class="event-info">
                    <h3 class="event-title"><i class="fas fa-calendar-alt"></i> Event Aktif</h3>
                    <p class="event-desc">${event.description}</p>
                    <div class="event-contacts">${contactsHtml}</div>
                </div>
            </div>
        `;
    } else {
        eventContainer.innerHTML = `
            <div class="alert alert-info">
                <i class="fas fa-info-circle"></i> Belum ada event yang terjadwal
            </div>
        `;
    }
    
    if (reqEventBtn) {
        reqEventBtn.addEventListener('click', () => {
            const ownerWA = JSON.parse(localStorage.getItem('organizationData'))?.owner?.wa || '6281234567890';
            window.open(`https://wa.me/${ownerWA}?text=Halo%20Owner%2C%20saya%20ingin%20mengajukan%20request%20event`, '_blank');
        });
    }
}

// Load Alat Bantu
function loadAlatBantu() {
    const tiktokCard = document.getElementById('tiktokCard');
    const pinterestCard = document.getElementById('pinterestCard');
    
    if (tiktokCard) {
        tiktokCard.addEventListener('click', () => {
            window.location.href = 'download-tiktok.html';
        });
    }
    
    if (pinterestCard) {
        pinterestCard.addEventListener('click', () => {
            window.location.href = 'download-pinterest.html';
        });
    }
}

// Check if admin on Set Web page
function initAdminCheck() {
    const setWebLink = document.querySelector('.set-web-link');
    if (setWebLink) {
        setWebLink.addEventListener('click', (e) => {
            if (!isAdminLoggedIn() && !isDevLoggedIn()) {
                e.preventDefault();
                window.location.href = 'login.html';
            }
        });
    }
}

// Export functions for global use
window.getGreeting = getGreeting;
window.loadStrukturData = loadStrukturData;
window.loadTentangData = loadTungguData;
window.loadJoinLinks = loadJoinLinks;
window.loadEventData = loadEventData;
window.loadStats = loadStats;

// ========== RIPPLE EFFECT (TOUCHSCREEN) ==========
let lastTouchTime = 0;
let isScrolling = false;
let scrollTimeout;

document.addEventListener('touchstart', function(e) {
    // Deteksi apakah ini sentuhan atau scrolling
    const touch = e.touches[0];
    const now = Date.now();
    
    // Jika jarak waktu antar touch terlalu dekat, skip (biasanya gesture)
    if (now - lastTouchTime < 50) {
        return;
    }
    lastTouchTime = now;
    
    // Tandai bahwa ini adalah tap, bukan scroll
    isScrolling = false;
    
    // Buat ripple di posisi sentuhan
    createRipple(touch.clientX, touch.clientY);
}, { passive: true });

// Deteksi scroll untuk menonaktifkan ripple
document.addEventListener('touchmove', function(e) {
    isScrolling = true;
    
    // Clear timeout sebelumnya
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        isScrolling = false;
    }, 300);
}, { passive: true });

// Mouse click (untuk desktop)
document.addEventListener('click', function(e) {
    // Skip jika sedang scrolling
    if (isScrolling) return;
    createRipple(e.clientX, e.clientY);
});

// Fungsi membuat ripple
function createRipple(x, y) {
    // Hapus ripple lama (biar ga numpuk)
    const oldRipples = document.querySelectorAll('.ripple');
    oldRipples.forEach(el => el.remove());
    
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    document.body.appendChild(ripple);
    
    // Hapus setelah animasi selesai
    setTimeout(() => {
        ripple.remove();
    }, 700);
}

// ========== MATIKAN RIPPLE PADA ELEMEN TERTENTU ==========
// (tombol, link, card) - biar ga double efek
document.addEventListener('click', function(e) {
    const target = e.target.closest('a, button, .btn, .leader-card, .tool-card, .event-card, .card');
    if (target) {
        // Hapus ripple yang dibuat oleh event click global
        const ripples = document.querySelectorAll('.ripple');
        ripples.forEach(el => el.remove());
    }
}, true); // true = capture phase, biar jalan duluan
