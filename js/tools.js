// ========== TIKTOK VIDEO DOWNLOADER ==========

async function downloadTikTok() {
    const urlInput = document.getElementById('tiktokUrl');
    const resultDiv = document.getElementById('tiktokResult');
    const url = urlInput.value.trim();
    
    if (!url) {
        alert('Masukkan URL TikTok terlebih dahulu!');
        return;
    }
    
    resultDiv.innerHTML = '<div class="alert alert-info"><i class="fas fa-spinner fa-spin"></i> Memproses video...</div>';
    
    try {
        // Menggunakan API tikwm.com (gratis, tanpa API key)
        const response = await fetch(`https://tikwm.com/api/?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        
        if (data.code === 0) {
            const videoUrl = data.data.play;
            const title = data.data.title || 'TikTok Video';
            const author = data.data.author?.unique_id || 'Unknown';
            const duration = data.data.duration || '0';
            const music = data.data.music_info?.title || 'Unknown';
            
            // Simpan ke history
            addTiktokHistory(url, { title, author, videoUrl });
            
            resultDiv.innerHTML = `
                <div class="video-preview">
                    <video src="${videoUrl}" controls poster="${data.data.cover || ''}"></video>
                    <div class="video-info">
                        <p><strong><i class="fab fa-tiktok"></i> Author:</strong> @${author}</p>
                        <p><strong><i class="fas fa-clock"></i> Durasi:</strong> ${duration} detik</p>
                        <p><strong><i class="fas fa-music"></i> Musik:</strong> ${music}</p>
                        <p class="video-caption"><strong><i class="fas fa-caption"></i> Caption:</strong> ${title.substring(0, 300)}${title.length > 300 ? '...' : ''}</p>
                        <div style="display: flex; gap: 10px; margin-top: 15px; flex-wrap: wrap;">
                            <a href="${videoUrl}" download class="download-link"><i class="fas fa-download"></i> Download Video (HD)</a>
                            <button onclick="copyCaption()" class="download-link" style="background: var(--glass-bg); color: var(--neon-blue);"><i class="fas fa-copy"></i> Salin Caption</button>
                        </div>
                    </div>
                </div>
            `;
        } else {
            resultDiv.innerHTML = '<div class="alert alert-info"><i class="fas fa-exclamation-triangle"></i> Gagal memproses video. Pastikan URL valid dan video tidak private.</div>';
        }
    } catch (error) {
        console.error('TikTok Download Error:', error);
        resultDiv.innerHTML = '<div class="alert alert-info"><i class="fas fa-exclamation-triangle"></i> Terjadi kesalahan. Coba lagi nanti.</div>';
    }
}

// ========== PINTEREST DOWNLOADER ==========

async function downloadPinterest() {
    const urlInput = document.getElementById('pinterestUrl');
    const resultDiv = document.getElementById('pinterestResult');
    const url = urlInput.value.trim();
    
    if (!url) {
        alert('Masukkan URL Pinterest terlebih dahulu!');
        return;
    }
    
    resultDiv.innerHTML = '<div class="alert alert-info"><i class="fas fa-spinner fa-spin"></i> Memproses video/gambar...</div>';
    
    try {
        // Menggunakan API pinterest video downloader
        const response = await fetch(`https://pinterestdownloader.io/api/download?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        
        if (data.success && data.media_url) {
            const mediaUrl = data.media_url;
            const isVideo = mediaUrl.includes('.mp4') || mediaUrl.includes('.mov');
            const title = data.title || 'Pinterest Media';
            
            if (isVideo) {
                resultDiv.innerHTML = `
                    <div class="video-preview">
                        <video src="${mediaUrl}" controls></video>
                        <div class="video-info">
                            <p><strong><i class="fab fa-pinterest"></i> Judul:</strong> ${title}</p>
                            <a href="${mediaUrl}" download class="download-link"><i class="fas fa-download"></i> Download Video</a>
                        </div>
                    </div>
                `;
            } else {
                resultDiv.innerHTML = `
                    <div class="video-preview">
                        <img src="${mediaUrl}" style="width: 100%; border-radius: 15px;" alt="Pinterest Image">
                        <div class="video-info">
                            <p><strong><i class="fab fa-pinterest"></i> Judul:</strong> ${title}</p>
                            <a href="${mediaUrl}" download class="download-link"><i class="fas fa-download"></i> Download Gambar</a>
                        </div>
                    </div>
                `;
            }
        } else {
            // Fallback: alternative method using no-api
            resultDiv.innerHTML = `
                <div class="video-preview">
                    <div class="alert alert-info">
                        <i class="fas fa-info-circle"></i> Untuk download Pinterest, silakan buka link langsung:<br>
                        <a href="${url}" target="_blank" style="color: var(--neon-blue); word-break: break-all;">${url}</a><br><br>
                        <small>Atau gunakan situs seperti pinterestdownloader.com untuk hasil maksimal.</small>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Pinterest Download Error:', error);
        resultDiv.innerHTML = `
            <div class="video-preview">
                <div class="alert alert-info">
                    <i class="fas fa-exclamation-triangle"></i> Gagal memproses.<br>
                    <a href="${url}" target="_blank" style="color: var(--neon-blue);">Buka langsung di Pinterest</a>
                </div>
            </div>
        `;
    }
}

// ========== COPY CAPTION FUNCTION ==========

function copyCaption() {
    const captionText = document.querySelector('.video-caption');
    if (captionText) {
        let text = captionText.innerText.replace('📝 Caption:', '').trim();
        text = text.replace('Caption:', '').trim();
        navigator.clipboard.writeText(text);
        
        // Show notification
        const btn = document.querySelector('.video-info button');
        const originalText = btn?.innerHTML;
        if (btn) {
            btn.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
            setTimeout(() => {
                btn.innerHTML = originalText;
            }, 2000);
        } else {
            alert('Caption berhasil disalin!');
        }
    } else {
        alert('Tidak ada caption untuk disalin.');
    }
}

// ========== INSTAGRAM DOWNLOADER (EXTRA TOOL) ==========

async function downloadInstagram() {
    const urlInput = document.getElementById('instagramUrl');
    const resultDiv = document.getElementById('instagramResult');
    const url = urlInput.value.trim();
    
    if (!url) {
        alert('Masukkan URL Instagram terlebih dahulu!');
        return;
    }
    
    resultDiv.innerHTML = '<div class="alert alert-info"><i class="fas fa-spinner fa-spin"></i> Memproses...</div>';
    
    try {
        // Using instagram API
        const response = await fetch(`https://insta-api.vercel.app/api/video?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        
        if (data.url) {
            resultDiv.innerHTML = `
                <div class="video-preview">
                    <video src="${data.url}" controls></video>
                    <div class="video-info">
                        <a href="${data.url}" download class="download-link"><i class="fas fa-download"></i> Download Video</a>
                    </div>
                </div>
            `;
        } else {
            resultDiv.innerHTML = '<div class="alert alert-info">Gagal memproses. Pastikan URL valid.</div>';
        }
    } catch (error) {
        resultDiv.innerHTML = '<div class="alert alert-info">Gagal memproses. Coba lagi nanti.</div>';
    }
}

// ========== YOUTUBE DOWNLOADER (EXTRA TOOL) ==========

async function downloadYoutube() {
    const urlInput = document.getElementById('youtubeUrl');
    const resultDiv = document.getElementById('youtubeResult');
    const url = urlInput.value.trim();
    
    if (!url) {
        alert('Masukkan URL YouTube terlebih dahulu!');
        return;
    }
    
    resultDiv.innerHTML = '<div class="alert alert-info"><i class="fas fa-spinner fa-spin"></i> Memproses...</div>';
    
    try {
        // Using youtube API (limited)
        resultDiv.innerHTML = `
            <div class="video-preview">
                <div class="alert alert-info">
                    <i class="fas fa-info-circle"></i> Untuk download YouTube, silakan gunakan situs:<br>
                    <a href="https://yt1s.com" target="_blank" style="color: var(--neon-blue);">yt1s.com</a> atau 
                    <a href="https://savefrom.net" target="_blank" style="color: var(--neon-blue);">savefrom.net</a><br><br>
                    <small>URL video: <a href="${url}" target="_blank" style="color: var(--neon-blue); word-break: break-all;">${url.substring(0, 50)}...</a></small>
                </div>
            </div>
        `;
    } catch (error) {
        resultDiv.innerHTML = '<div class="alert alert-info">Gagal memproses.</div>';
    }
}

// ========== HISTORY FUNCTIONS ==========

function showTiktokHistory() {
    const history = JSON.parse(localStorage.getItem('tiktokHistory')) || [];
    const historyDiv = document.getElementById('historyContainer');
    
    if (!historyDiv) return;
    
    if (history.length === 0) {
        historyDiv.innerHTML = '<div class="alert alert-info">Belum ada riwayat download.</div>';
        return;
    }
    
    let html = '<div class="grid-2">';
    history.forEach((item, index) => {
        html += `
            <div class="card" onclick="window.open('${item.data.videoUrl}', '_blank')">
                <h3><i class="fab fa-tiktok"></i> @${item.data.author}</h3>
                <p>${item.data.title.substring(0, 100)}...</p>
                <small>${new Date(item.timestamp).toLocaleString('id-ID')}</small>
            </div>
        `;
    });
    html += '</div>';
    historyDiv.innerHTML = html;
}

function clearHistory() {
    if (confirm('Hapus semua riwayat download?')) {
        localStorage.removeItem('tiktokHistory');
        showTiktokHistory();
        alert('Riwayat berhasil dihapus!');
    }
}

// ========== UTILITY FUNCTIONS ==========

function validateUrl(url, type) {
    const patterns = {
        tiktok: /(tiktok\.com|tiktok\.com\/@|vm\.tiktok\.com)/,
        instagram: /(instagram\.com|instagr\.am)/,
        pinterest: /(pinterest\.com|pin\.it)/,
        youtube: /(youtube\.com|youtu\.be)/
    };
    
    if (patterns[type] && patterns[type].test(url)) {
        return true;
    }
    return false;
}

function autoDetectUrl() {
    const urlInput = document.getElementById('autoUrl');
    const resultDiv = document.getElementById('autoResult');
    const url = urlInput.value.trim();
    
    if (!url) {
        alert('Masukkan URL terlebih dahulu!');
        return;
    }
    
    if (validateUrl(url, 'tiktok')) {
        downloadTikTok();
    } else if (validateUrl(url, 'instagram')) {
        downloadInstagram();
    } else if (validateUrl(url, 'pinterest')) {
        downloadPinterest();
    } else if (validateUrl(url, 'youtube')) {
        downloadYoutube();
    } else {
        resultDiv.innerHTML = '<div class="alert alert-info">Platform tidak dikenali. Silakan pilih tool yang sesuai.</div>';
    }
}

// ========== INITIALIZATION ==========

document.addEventListener('DOMContentLoaded', () => {
    // Load history if on history page
    if (document.getElementById('historyContainer')) {
        showTiktokHistory();
    }
});

// Export functions for global use
window.downloadTikTok = downloadTikTok;
window.downloadPinterest = downloadPinterest;
window.downloadInstagram = downloadInstagram;
window.downloadYoutube = downloadYoutube;
window.copyCaption = copyCaption;
window.autoDetectUrl = autoDetectUrl;
window.showTiktokHistory = showTiktokHistory;
window.clearHistory = clearHistory;
window.validateUrl = validateUrl;
