// Photo Gallery Data - Replace these placeholder URLs with your actual photo paths
const photos = [
    'photo1.jpg',  // Replace with your photo paths
    'photo2.jpg',
    'photo3.jpg',
    'photo4.jpg'
];

let currentPhotoIndex = 0;
let map = null;

// Gallery Functions
function openGallery() {
    const modal = document.getElementById('galleryModal');
    modal.style.display = 'block';
    showPhoto(0);
}

function closeGallery() {
    const modal = document.getElementById('galleryModal');
    modal.style.display = 'none';
}

function changePhoto(direction) {
    currentPhotoIndex += direction;
    
    // Loop back to start/end
    if (currentPhotoIndex >= photos.length) {
        currentPhotoIndex = 0;
    } else if (currentPhotoIndex < 0) {
        currentPhotoIndex = photos.length - 1;
    }
    
    showPhoto(currentPhotoIndex);
}

function goToPhoto(index) {
    currentPhotoIndex = index;
    showPhoto(currentPhotoIndex);
}

function showPhoto(index) {
    const img = document.getElementById('galleryImage');
    const counter = document.getElementById('currentPhoto');
    const dots = document.querySelectorAll('.dot');
    
    img.src = photos[index];
    counter.textContent = index + 1;
    
    // Update active dot
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Distance Modal Functions
function openDistance() {
    const modal = document.getElementById('distanceModal');
    modal.style.display = 'block';
    
    // Initialize map only once
    if (!map) {
        initMap();
    }
}

function closeDistance() {
    const modal = document.getElementById('distanceModal');
    modal.style.display = 'none';
}

function initMap() {
    // Taiwan (Shalu) coordinates
    const taiwan = [24.2255, 120.5686];
    // Mongolia (Ulaanbaatar) coordinates
    const mongolia = [47.8864, 106.9057];
    
    // Calculate center point
    const centerLat = (taiwan[0] + mongolia[0]) / 2;
    const centerLng = (taiwan[1] + mongolia[1]) / 2;
    
    // Create map
    map = L.map('map').setView([centerLat, centerLng], 4);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Custom heart icon for markers
    const heartIcon = L.divIcon({
        className: 'custom-heart-icon',
        html: '<div style="font-size: 30px; text-align: center;">💕</div>',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });
    
    // Add markers
    const taiwanMarker = L.marker(taiwan, { icon: heartIcon }).addTo(map)
        .bindPopup('<b>Taiwan (Shalu) 🇹🇼</b><br>Where you are');
    
    const mongoliaMarker = L.marker(mongolia, { icon: heartIcon }).addTo(map)
        .bindPopup('<b>Mongolia (Ulaanbaatar) 🇲🇳</b><br>Where I am');
    
    // Draw line between locations
    const line = L.polyline([taiwan, mongolia], {
        color: '#d81b60',
        weight: 3,
        opacity: 0.7,
        dashArray: '10, 10',
        smoothFactor: 1
    }).addTo(map);
    
    // Fit bounds to show both locations
    map.fitBounds(line.getBounds(), { padding: [50, 50] });
    
    // Open popups
    setTimeout(() => {
        taiwanMarker.openPopup();
    }, 500);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const galleryModal = document.getElementById('galleryModal');
    const distanceModal = document.getElementById('distanceModal');
    
    if (event.target === galleryModal) {
        closeGallery();
    }
    if (event.target === distanceModal) {
        closeDistance();
    }
}

// Keyboard navigation for gallery
document.addEventListener('keydown', function(event) {
    const galleryModal = document.getElementById('galleryModal');
    
    if (galleryModal.style.display === 'block') {
        if (event.key === 'ArrowLeft') {
            changePhoto(-1);
        } else if (event.key === 'ArrowRight') {
            changePhoto(1);
        } else if (event.key === 'Escape') {
            closeGallery();
        }
    }
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});