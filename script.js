// Open the popup
function openPopup() {
    document.getElementById("popup").style.display = "flex";
    getUserInfo();
}

// Close the popup
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// Get system information
function getUserInfo() {
    document.getElementById("device").textContent = navigator.userAgent.includes("Mobile") ? "Mobile" : "Desktop";
    document.getElementById("os").textContent = navigator.platform;
    document.getElementById("browser").textContent = getBrowserName();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation);
    } else {
        document.getElementById("location").textContent = "Geolocation is not supported.";
    }
}

function getBrowserName() {
    let userAgent = navigator.userAgent;
    if (userAgent.includes("Chrome")) return "Google Chrome";
    if (userAgent.includes("Firefox")) return "Mozilla Firefox";
    if (userAgent.includes("Safari")) return "Apple Safari";
    if (userAgent.includes("Edge")) return "Microsoft Edge";
    return "Unknown Browser";
}

function showLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    document.getElementById("location").textContent = `Lat: ${lat}, Lon: ${lon}`;

    let map = L.map('map').setView([lat, lon], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    L.marker([lat, lon]).addTo(map)
        .bindPopup("Your Location")
        .openPopup();
    
    setTimeout(() => {
        map.invalidateSize(); // Fixes display issues inside the popup
    }, 300);
}
