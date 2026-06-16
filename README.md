<div align="center">
  
  <img src="https://via.placeholder.com/150x150?text=SCK" alt="Logo" width="150" style="border-radius: 20px;">
  
  # ⚡ SEKTE CREATOR KECE ⚡
  
  ### Official Organization Website
  
  [![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
  [![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com)
  [![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
  
  *Website resmi komunitas Sekte Creator Kece - Tempat berkumpulnya para kreator keren!*

</div>

---

## 📖 Tentang Proyek

**Sekte Creator Kece (SCK)** adalah website resmi untuk komunitas kreator konten yang bergerak di bidang desain grafis, pengembangan teknologi, event organizer, dan marketing digital. Website ini dibangun untuk menjadi pusat informasi dan alat bantu bagi seluruh anggota komunitas.

### ✨ Fitur Unggulan

| Fitur | Deskripsi |
|-------|-----------|
| 🏠 **Beranda Dinamis** | Halaman utama dengan video background, jam digital, dan statistik实时 |
| 👥 **Struktur Organisasi** | Informasi lengkap Owner, Co-Owner, dan Leader Divisi dengan koneksi WhatsApp langsung |
| 📖 **Tentang SCK** | Profil organisasi, visi misi, dan detail setiap divisi |
| 🤝 **Join Organisasi** | Dua tautan bergabung (Link Seleksi & SCK FAMILY) dengan akses grup WhatsApp |
| 🎯 **Event Organisasi** | Informasi event terkini dengan kontak panitia + request event via WhatsApp |
| 🛠️ **Alat Bantu** | Downloader video dari TikTok, Pinterest, YouTube, dan Instagram tanpa watermark |
| 🔐 **Set Web** | Panel admin untuk mengelola konten website (event, anggota, divisi, link join) |
| 👨‍💻 **Only Developer** | Panel khusus developer untuk mengelola struktur organisasi dan akun |

---

## 🛠️ Alat Bantu Downloader

Website ini dilengkapi dengan **4 alat downloader canggih**:

| Platform | Fitur |
|----------|-------|
| <img src="https://img.shields.io/badge/TikTok-000000?style=flat&logo=tiktok&logoColor=white" width="70"> | Download video tanpa watermark + salin caption |
| <img src="https://img.shields.io/badge/Pinterest-BD081C?style=flat&logo=pinterest&logoColor=white" width="80"> | Download video/foto dari Pinterest |
| <img src="https://img.shields.io/badge/YouTube-FF0000?style=flat&logo=youtube&logoColor=white" width="80"> | Download video MP4 atau audio MP3 |
| <img src="https://img.shields.io/badge/Instagram-E4405F?style=flat&logo=instagram&logoColor=white" width="90"> | Download video, foto, reels, dan story |

---

## 🏗️ Struktur Website

sekte-creator-kece/
├── 📄 index.html              # Halaman utama
├── 📁 css/
│   └── style.css              # Styling neon blue + hitam
├── 📁 js/
│   ├── main.js                # Fungsi utama website
│   ├── auth.js                # Sistem autentikasi admin & developer
│   └── tools.js               # Downloader TikTok, Pinterest, YouTube, Instagram
├── 📁 pages/
│   ├── struktur.html          # Struktur organisasi
│   ├── tentang.html           # Tentang organisasi
│   ├── join.html              # Join organisasi
│   ├── event.html             # Event organisasi
│   ├── alat-bantu.html        # Menu alat bantu
│   ├── set-web.html           # Panel admin (login required)
│   ├── only-developer.html    # Panel developer (login required)
│   ├── login.html             # Halaman login admin
│   ├── download-tiktok.html   # Downloader TikTok
│   ├── download-pinterest.html # Downloader Pinterest
│   ├── download-youtube.html  # Downloader YouTube
│   └── download-instagram.html # Downloader Instagram
├── 📁 assets/
│   └── README.md              # Panduan assets
└── ⚙️ .vercel.json            # Konfigurasi deployment

---

## 🔐 Sistem Autentikasi

### Akun Default Admin (Set Web)

| Username | Password | Role |
|----------|----------|------|
| `owner` | `sck2025` | Owner |
| `admin1` | `admin123` | Admin |
| `moderator` | `mod123` | Moderator |

### Akun Default Developer (Only Developer)

| Username | Password |
|----------|----------|
| `raps` | `sektecreator123` |
| `developer` | `dev2025` |

> ⚠️ **Catatan:** Semua akun dapat diubah/ditambah melalui panel **Only Developer**.

---

## 🚀 Deployment ke Vercel

### Langkah-langkah:

1. **Upload ke GitHub**
   bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/sekte-creator-kece.git
   git push -u origin main

2. Deploy ke Vercel
   · Buka vercel.com
   · Login dengan GitHub
   · Klik Add New → Project
   · Pilih repository sekte-creator-kece
   · Framework Preset: Other
   · Klik Deploy
3. Selesai! Website live di https://sekte-creator-kece.vercel.app

---

🎨 Teknologi yang Digunakan

<div align="center">

  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white">

</div>

· Frontend: HTML5, CSS3, Vanilla JavaScript
· Hosting: Vercel (Free Tier)
· Storage: LocalStorage (data tersimpan di browser)
· API: TikTok, YouTube, Instagram, Pinterest downloader API

---

📱 Responsive Design

Website didesain responsif untuk berbagai perangkat:

Device Tampilan
💻 Desktop Optimal (1200px+)
📟 Tablet Menyesuaikan (768px - 1199px)
📱 Mobile Full responsive (< 768px)

---

🌈 Tema

Website mendukung 2 mode tema yang dapat diubah dengan tombol di pojok kanan:

· 🌙 Dark Mode (Default) - Neon blue + hitam
· ☀️ Light Mode - Cerah dengan aksen neon blue

---

📝 Customization

Mengubah Data Organisasi

1. Buka Only Developer → Login
2. Edit:
   · Owner & Co-Owner
   · Leader Divisi
   · Divisi & jumlah anggota
   · Foto profil & video hero

Mengubah Event

1. Buka Set Web → Login admin
2. Atur:
   · Status event (Ada/Tidak)
   · Foto event
   · Deskripsi event
   · Kontak panitia

Mengubah Link Join

1. Buka Set Web → Login admin
2. Edit:
   · Link Seleksi (judul, desk, URL)
   · SCK FAMILY (judul, desk, URL)

---

⚡ API yang Digunakan

Layanan Endpoint Fungsi
TikTok https://tikwm.com/api/ Download video tanpa watermark
YouTube https://api.ryzendesu.vip/api/downloader/ytmp4 Download video MP4
YouTube https://api.ryzendesu.vip/api/downloader/ytmp3 Download audio MP3
Instagram https://api.ryzendesu.vip/api/downloader/igdl Download media Instagram

ℹ️ Pinterest downloader memerlukan API key (dapat didaftarkan gratis di RapidAPI)

---

🤝 Kontribusi

Proyek ini bersifat private untuk organisasi Sekte Creator Kece. Jika Anda ingin berkontribusi:

1. Fork repository
2. Buat branch baru (git checkout -b fitur-baru)
3. Commit perubahan (git commit -m 'Menambahkan fitur baru')
4. Push ke branch (git push origin fitur-baru)
5. Buat Pull Request

---

📞 Kontak

Kontak Informasi
📧 Email : sektecreatorkece@gmail.com
📱 WhatsApp : +62 8199-7149-736
🌐 Website : https://sekte-creator-kece.vercel.app

---

📄 Lisensi

Copyright © 2025 Sekte Creator Kece

---

<div align="center">

⭐ Made with love by SCK Team ⭐

"Bersama kita berkarya, bersama kita kece!"

---

https://img.shields.io/github/stars/username/sekte-creator-kece?style=social
https://img.shields.io/github/forks/username/sekte-creator-kece?style=social

</div>
