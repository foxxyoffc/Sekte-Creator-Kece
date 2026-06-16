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
        const response = await fetch(`https://tikwm.com/api/?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        
        if (data.code === 0) {
            const videoUrl = data.data.play;
            const title = data.data.title || 'TikTok Video';
            const author = data.data.author?.unique_id || 'Unknown';
            const duration = data.data.duration || '0';
            const music = data.data.music_info?.title || 'Unknown';
            
            if (typeof addTiktokHistory === 'function') {
                addTiktokHistory(url, { title, author, videoUrl });
            }
            
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
    
    resultDiv.innerHTML = '<div class="alert alert-info"><i class="fas fa-spinner fa-spin"></i> Memproses...</div>';
    
    try {
        const response = await fetch(`https://pinterest-video-downloader.p.rapidapi.com/url?url=${encodeURIComponent(url)}`, {
            headers: {
                'x-rapidapi-key': 'YOUR_API_KEY_HERE',
                'x-rapidapi-host': 'pinterest-video-downloader.p.rapidapi.com'
            }
        });
        
        const data = await response.json();
        
        if (data && data.media_url) {
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

// ========== YOUTUBE DOWNLOADER ==========

async function downloadYouTube(type = 'video') {
    const urlInput = document.getElementById('youtubeUrl');
    const resultDiv = document.getElementById('youtubeResult');
    const url = urlInput.value.trim();
    
    if (!url) {
        alert('Masukkan URL YouTube terlebih dahulu!');
        return;
    }
    
    resultDiv.innerHTML = '<div class="alert alert-info"><i class="fas fa-spinner fa-spin"></i> Memproses video...</div>';
    
    try {
        const apiUrl = `https://api.ryzendesu.vip/api/downloader/ytmp4?url=${encodeURIComponent(url)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.status === 200 || data.url) {
            const videoUrl = data.url || data.download_url;
            const title = data.title || 'YouTube Video';
            const duration = data.duration || 'Unknown';
            const quality = type === 'video' ? (data.quality || '720p') : 'MP3 Audio';
            
            if (type === 'video') {
                resultDiv.innerHTML = `
                    <div class="video-preview">
                        <video src="${videoUrl}" controls></video>
                        <div class="video-info">
                            <p><strong><i class="fab fa-youtube"></i> Judul:</strong> ${title}</p>
                            <p><strong><i class="fas fa-clock"></i> Durasi:</strong> ${duration}</p>
                            <p><strong><i class="fas fa-tachometer-alt"></i> Kualitas:</strong> ${quality}</p>
                            <a href="${videoUrl}" download class="download-link"><i class="fas fa-download"></i> Download Video (${quality})</a>
                        </div>
                    </div>
                `;
            } else {
                const audioApi = `https://api.ryzendesu.vip/api/downloader/ytmp3?url=${encodeURIComponent(url)}`;
                const audioResponse = await fetch(audioApi);
                const audioData = await audioResponse.json();
                const audioUrl = audioData.url || audioData.download_url;
                
                resultDiv.innerHTML = `
                    <div class="video-preview">
                        <div style="text-align: center; padding: 20px;">
                            <i class="fas fa-music" style="font-size: 3rem; color: var(--neon-blue);"></i>
                        </div>
                        <div class="video-info">
                            <p><strong><i class="fab fa-youtube"></i> Judul:</strong> ${title}</p>
                            <p><strong><i class="fas fa-clock"></i> Durasi:</strong> ${duration}</p>
                            <p><strong><i class="fas fa-file-audio"></i> Format:</strong> MP3</p>
                            <a href="${audioUrl}" download class="download-link"><i class="fas fa-download"></i> Download Audio (MP3)</a>
                        </div>
                    </div>
                `;
            }
        } else {
            resultDiv.innerHTML = `
                <div class="video-preview">
                    <div class="alert alert-info">
                        <i class="fas fa-info-circle"></i> Untuk download YouTube, silakan gunakan situs alternatif:<br><br>
                        <a href="https://yt1s.com" target="_blank" style="color: var(--neon-blue); margin-right: 15px;">yt1s.com</a>
                        <a href="https://savefrom.net" target="_blank" style="color: var(--neon-blue); margin-right: 15px;">savefrom.net</a>
                        <a href="https://y2mate.com" target="_blank" style="color: var(--neon-blue);">y2mate.com</a>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('YouTube Download Error:', error);
        resultDiv.innerHTML = `
            <div class="video-preview">
                <div class="alert alert-info">
                    <i class="fas fa-exclamation-triangle"></i> Gagal memproses.<br><br>
                    <a href="https://yt1s.com" target="_blank" style="color: var(--neon-blue);">Klik di sini untuk download via yt1s.com</a>
                </div>
            </div>
        `;
    }
}

// ========== INSTAGRAM DOWNLOADER ==========

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
        const apiUrl = `https://api.ryzendesu.vip/api/downloader/igdl?url=${encodeURIComponent(url)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.status === 200 && data.url) {
            const mediaUrl = data.url;
            const isVideo = mediaUrl.includes('.mp4') || mediaUrl.includes('.mov');
            const caption = data.caption || 'Instagram Media';
            const username = data.username || 'instagram_user';
            
            if (isVideo) {
                resultDiv.innerHTML = `
                    <div class="video-preview">
                        <video src="${mediaUrl}" controls></video>
                        <div class="video-info">
                            <p><strong><i class="fab fa-instagram"></i> Username:</strong> @${username}</p>
                            <p class="video-caption"><strong><i class="fas fa-caption"></i> Caption:</strong> ${caption.substring(0, 200)}${caption.length > 200 ? '...' : ''}</p>
                            <a href="${mediaUrl}" download class="download-link"><i class="fas fa-download"></i> Download Video</a>
                        </div>
                    </div>
                `;
            } else {
                resultDiv.innerHTML = `
                    <div class="video-preview">
                        <img src="${mediaUrl}" style="width: 100%; border-radius: 15px;" alt="Instagram Image">
                        <div class="video-info">
                            <p><strong><i class="fab fa-instagram"></i> Username:</strong> @${username}</p>
                            <p class="video-caption"><strong><i class="fas fa-caption"></i> Caption:</strong> ${caption.substring(0, 200)}${caption.length > 200 ? '...' : ''}</p>
                            <a href="${mediaUrl}" download class="download-link"><i class="fas fa-download"></i> Download Gambar</a>
                        </div>
                    </div>
                `;
            }
        } else {
            resultDiv.innerHTML = `
                <div class="video-preview">
                    <div class="alert alert-info">
                        <i class="fas fa-exclamation-triangle"></i> Gagal memproses. Pastikan URL valid.<br><br>
                        <small>URL: <a href="${url}" target="_blank" style="color: var(--neon-blue); word-break: break-all;">${url}</a></small>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Instagram Download Error:', error);
        resultDiv.innerHTML = `
            <div class="video-preview">
                <div class="alert alert-info">
                    <i class="fas fa-exclamation-triangle"></i> Gagal memproses. Coba lagi nanti.
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
        
        const btn = document.querySelector('.video-info button');
        if (btn) {
            const originalText = btn.innerHTML;
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
    
    return patterns[type] ? patterns[type].test(url) : false;
}

// ========== EXPORT FUNCTIONS ==========
window.downloadTikTok = downloadTikTok;
window.downloadPinterest = downloadPinterest;
window.downloadYouTube = downloadYouTube;
window.downloadInstagram = downloadInstagram;
window.copyCaption = copyCaption;
window.showTiktokHistory = showTiktokHistory;
window.clearHistory = clearHistory;
window.validateUrl = validateUrl;
