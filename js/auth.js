// ========== AUTHENTICATION SYSTEM ==========

// Default credentials (bisa diubah via Only Developer page)
let validCredentials = JSON.parse(localStorage.getItem('adminCredentials')) || [
    { username: 'nowamura', password: 'nowa001', role: 'owner' },
    { username: 'rorandokkodok', password: 'rora001', role: 'co-owner 02' },
    { username: 'foxxybziir', password: 'foxxy001', role: 'co-owner 01' }
];

// Developer credentials (hanya untuk Only Developer page)
let devCredentials = JSON.parse(localStorage.getItem('devCredentials')) || [
    { username: 'foxxy', password: 'foxxy_001' },
    { username: 'nowamura', password: 'nowamura_001' }
];

// Save credentials to localStorage
function saveCredentials() {
    localStorage.setItem('adminCredentials', JSON.stringify(validCredentials));
    localStorage.setItem('devCredentials', JSON.stringify(devCredentials));
}

// Login function untuk Set Web
function loginSetWeb(username, password) {
    const user = validCredentials.find(u => u.username === username && u.password === password);
    if (user) {
        sessionStorage.setItem('isAdminLoggedIn', 'true');
        sessionStorage.setItem('adminRole', user.role);
        sessionStorage.setItem('adminUsername', user.username);
        return true;
    }
    return false;
}

// Login function untuk Only Developer
function loginDeveloper(username, password) {
    const dev = devCredentials.find(d => d.username === username && d.password === password);
    if (dev) {
        sessionStorage.setItem('isDevLoggedIn', 'true');
        sessionStorage.setItem('devUsername', username);
        return true;
    }
    return false;
}

// Check if admin is logged in
function isAdminLoggedIn() {
    return sessionStorage.getItem('isAdminLoggedIn') === 'true';
}

// Check if developer is logged in
function isDevLoggedIn() {
    return sessionStorage.getItem('isDevLoggedIn') === 'true';
}

// Get current user role
function getCurrentRole() {
    if (isDevLoggedIn()) return 'developer';
    return sessionStorage.getItem('adminRole') || 'guest';
}

// Logout
function logout() {
    sessionStorage.removeItem('isAdminLoggedIn');
    sessionStorage.removeItem('isDevLoggedIn');
    sessionStorage.removeItem('adminRole');
    sessionStorage.removeItem('adminUsername');
    sessionStorage.removeItem('devUsername');
    window.location.href = '../index.html';
}

// Protect page (redirect if not logged in)
function protectPage(requiredRole = null) {
    if (!isAdminLoggedIn() && !isDevLoggedIn()) {
        window.location.href = '../index.html';
        return false;
    }
    
    if (requiredRole && requiredRole !== 'developer') {
        const role = getCurrentRole();
        if (role !== requiredRole && role !== 'owner') {
            alert('Akses ditolak! Halaman ini hanya untuk ' + requiredRole);
            window.location.href = '../index.html';
            return false;
        }
    }
    
    return true;
}

// Add new admin user
function addAdminUser(username, password, role = 'admin') {
    if (!validCredentials.find(u => u.username === username)) {
        validCredentials.push({ username, password, role });
        saveCredentials();
        return true;
    }
    return false;
}

// Remove admin user
function removeAdminUser(username) {
    const currentUser = sessionStorage.getItem('adminUsername');
    if (currentUser === username) {
        alert('Tidak bisa menghapus akun sendiri!');
        return false;
    }
    validCredentials = validCredentials.filter(u => u.username !== username);
    saveCredentials();
    return true;
}

// Update admin password
function updateAdminPassword(username, newPassword) {
    const user = validCredentials.find(u => u.username === username);
    if (user) {
        user.password = newPassword;
        saveCredentials();
        return true;
    }
    return false;
}

// Add developer user
function addDevUser(username, password) {
    if (!devCredentials.find(d => d.username === username)) {
        devCredentials.push({ username, password });
        saveCredentials();
        return true;
    }
    return false;
}

// Remove developer user
function removeDevUser(username) {
    const currentDev = sessionStorage.getItem('devUsername');
    if (currentDev === username) {
        alert('Tidak bisa menghapus akun developer sendiri!');
        return false;
    }
    devCredentials = devCredentials.filter(d => d.username !== username);
    saveCredentials();
    return true;
}

// ========== ORGANIZATION DATA MANAGEMENT ==========

// Default structure data
let organizationData = JSON.parse(localStorage.getItem('organizationData')) || {
    owner: { name: 'Nowamura', wa: '6283847663188', bio: 'Owner/Founder, pecinta lanang, ati ati aja🗿' },
    coOwners: [
        { name: 'Foxxybziir', wa: '6281997149736', bio: 'Co-Founder/Co-Owner/Developer, gw ganteng banget pokoknya (kata mak gw)' },
        { name: 'Rorandokkodok', wa: '6283872836975', bio: 'Co-Founder/Co-Owner, sefuhh japanese, minus bisu dikit🗿' }
    ],
    leaders: [
        { division: 'Divisi 01', name: 'XannXXX', wa: '6285393603293', bio: 'Admin Divisi 01, anak pungut node' },
        { division: 'Divisi 02', name: 'LukaFekfek', wa: '6282318999818', bio: 'Leader Div 02, Pecinta Mommy' },
        { division: 'Divisi 02', name: 'Jemxnxx', wa: '6285157038644', bio: 'Admin Div 02, Babu admin🗿' }
    ],
    divisions: [
        { name: 'Divisi 01', members: 63 },
        { name: 'Divisi 02', members: 17 },
        { name: 'SCK Family', members: 19 }
    ],
    profileImage: 'https://j.top4top.io/p_38195t90r1.jpg',
    heroVideoUrl: 'https://d.top4top.io/m_3819tiava1.mp4'
};

// Save organization data
function saveOrgData() {
    localStorage.setItem('organizationData', JSON.stringify(organizationData));
}

// Get total members
function getTotalMembers() {
    let total = 0;
    organizationData.divisions.forEach(div => {
        total += div.members;
    });
    return total;
}

// Get total divisions
function getTotalDivisions() {
    return organizationData.divisions.length;
}

// Update stats display
function updateStatsDisplay() {
    const totalMembers = getTotalMembers();
    const totalDivisions = getTotalDivisions();
    
    const membersEl = document.getElementById('totalMembers');
    const divisionsEl = document.getElementById('totalDivisions');
    
    if (membersEl) membersEl.textContent = totalMembers;
    if (divisionsEl) divisionsEl.textContent = totalDivisions;
    
    localStorage.setItem('totalMembers', totalMembers);
    localStorage.setItem('totalDivisions', totalDivisions);
}

// Add new co-owner
function addCoOwner(name, wa, bio) {
    organizationData.coOwners.push({ name, wa, bio });
    saveOrgData();
}

// Remove co-owner
function removeCoOwner(index) {
    organizationData.coOwners.splice(index, 1);
    saveOrgData();
}

// Update co-owner
function updateCoOwner(index, name, wa, bio) {
    if (organizationData.coOwners[index]) {
        organizationData.coOwners[index] = { name, wa, bio };
        saveOrgData();
    }
}

// Add new leader
function addLeader(division, name, wa, bio) {
    organizationData.leaders.push({ division, name, wa, bio });
    saveOrgData();
}

// Remove leader
function removeLeader(index) {
    organizationData.leaders.splice(index, 1);
    saveOrgData();
}

// Update leader
function updateLeader(index, division, name, wa, bio) {
    if (organizationData.leaders[index]) {
        organizationData.leaders[index] = { division, name, wa, bio };
        saveOrgData();
    }
}

// Add new division
function addDivision(name, members = 0) {
    organizationData.divisions.push({ name, members });
    saveOrgData();
    updateStatsDisplay();
}

// Remove division
function removeDivision(index) {
    organizationData.divisions.splice(index, 1);
    saveOrgData();
    updateStatsDisplay();
}

// Update division members
function updateDivisionMembers(index, members) {
    if (organizationData.divisions[index]) {
        organizationData.divisions[index].members = members;
        saveOrgData();
        updateStatsDisplay();
    }
}

// Update division name
function updateDivisionName(index, name) {
    if (organizationData.divisions[index]) {
        organizationData.divisions[index].name = name;
        saveOrgData();
    }
}

// Update owner
function updateOwner(name, wa, bio) {
    organizationData.owner = { name, wa, bio };
    saveOrgData();
}

// Update profile image
function updateProfileImage(url) {
    organizationData.profileImage = url;
    saveOrgData();
    const profileImg = document.getElementById('profileImage');
    if (profileImg) profileImg.src = url;
}

// Update hero video
function updateHeroVideo(url) {
    organizationData.heroVideoUrl = url;
    saveOrgData();
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) heroVideo.src = url;
}

// ========== EVENT MANAGEMENT ==========

let eventData = JSON.parse(localStorage.getItem('eventData')) || {
    hasEvent: false,
    imageUrl: '',
    description: '',
    contacts: ['6281997149736', '6283872836975', '6283847663188']
};

function saveEventData() {
    localStorage.setItem('eventData', JSON.stringify(eventData));
}

function setEvent(hasEvent, imageUrl, description) {
    eventData.hasEvent = hasEvent;
    eventData.imageUrl = imageUrl;
    eventData.description = description;
    saveEventData();
}

function addEventContact(waNumber) {
    if (!eventData.contacts.includes(waNumber)) {
        eventData.contacts.push(waNumber);
        saveEventData();
        return true;
    }
    return false;
}

function removeEventContact(index) {
    eventData.contacts.splice(index, 1);
    saveEventData();
}

function updateEventContact(index, waNumber) {
    if (eventData.contacts[index]) {
        eventData.contacts[index] = waNumber;
        saveEventData();
    }
}

// ========== JOIN LINKS MANAGEMENT ==========

let joinLinks = JSON.parse(localStorage.getItem('joinLinks')) || {
    seleksi: { title: 'Link Seleksi', description: 'Klik untuk bergabung ke grup seleksi Creator', url: 'https://chat.whatsapp.com/GN5f9uK7URH0OZb665xi9Q?s=cl&p=a&mlu=0' },
    family: { title: 'SCK FAMILY', description: 'Klik untuk bergabung ke grup utama SCK [no seleksi]', url: 'https://chat.whatsapp.com/Fl4UBHHDPpg2DdxpQwHNeK?s=cl&p=a&mlu=0' }
};

function saveJoinLinks() {
    localStorage.setItem('joinLinks', JSON.stringify(joinLinks));
}

function updateJoinLink(type, title, description, url) {
    if (joinLinks[type]) {
        joinLinks[type] = { title, description, url };
        saveJoinLinks();
    }
}

// ========== TOOLS DATA ==========

// TikTok download history
let tiktokHistory = JSON.parse(localStorage.getItem('tiktokHistory')) || [];

function addTiktokHistory(url, data) {
    tiktokHistory.unshift({ url, data, timestamp: new Date().toISOString() });
    if (tiktokHistory.length > 10) tiktokHistory.pop();
    localStorage.setItem('tiktokHistory', JSON.stringify(tiktokHistory));
}

function clearTiktokHistory() {
    tiktokHistory = [];
    localStorage.setItem('tiktokHistory', JSON.stringify(tiktokHistory));
}

// Export all functions for global use
window.loginSetWeb = loginSetWeb;
window.loginDeveloper = loginDeveloper;
window.isAdminLoggedIn = isAdminLoggedIn;
window.isDevLoggedIn = isDevLoggedIn;
window.getCurrentRole = getCurrentRole;
window.logout = logout;
window.protectPage = protectPage;
window.addAdminUser = addAdminUser;
window.removeAdminUser = removeAdminUser;
window.updateAdminPassword = updateAdminPassword;
window.addDevUser = addDevUser;
window.removeDevUser = removeDevUser;
window.organizationData = organizationData;
window.getTotalMembers = getTotalMembers;
window.getTotalDivisions = getTotalDivisions;
window.updateStatsDisplay = updateStatsDisplay;
window.addCoOwner = addCoOwner;
window.removeCoOwner = removeCoOwner;
window.updateCoOwner = updateCoOwner;
window.addLeader = addLeader;
window.removeLeader = removeLeader;
window.updateLeader = updateLeader;
window.addDivision = addDivision;
window.removeDivision = removeDivision;
window.updateDivisionMembers = updateDivisionMembers;
window.updateDivisionName = updateDivisionName;
window.updateOwner = updateOwner;
window.updateProfileImage = updateProfileImage;
window.updateHeroVideo = updateHeroVideo;
window.eventData = eventData;
window.setEvent = setEvent;
window.addEventContact = addEventContact;
window.removeEventContact = removeEventContact;
window.updateEventContact = updateEventContact;
window.joinLinks = joinLinks;
window.updateJoinLink = updateJoinLink;
window.tiktokHistory = tiktokHistory;
window.addTiktokHistory = addTiktokHistory;
window.clearTiktokHistory = clearTiktokHistory;
