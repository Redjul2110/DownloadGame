function setActiveNav(section) {
  document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
  document.getElementById('nav-' + section).classList.add('active');
}

const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = this.getAttribute('href').replace('#', '');
    setActiveNav(target);
    document.getElementById(target).scrollIntoView({ behavior: 'smooth' });
  });
});

function downloadFile() {
  // Passe den Pfad ggf. an, wenn sich der Ordner oder Dateiname ändert!
  const fileUrl = 'game/Jumper.exe'; 
  const a = document.createElement('a');
  a.href = fileUrl;
  a.download = 'Jumper.exe';
  document.body.appendChild(a); // für Firefox-Support
  a.click();
  document.body.removeChild(a);
}

// Bild-Modal für große Vorschau
function createImageModal(src, alt) {
  // Modal-Overlay erstellen
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.background = 'rgba(0,0,0,0.85)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = 9999;
  overlay.style.cursor = 'zoom-out';

  // Großes Bild
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.style.maxWidth = '90vw';
  img.style.maxHeight = '90vh';
  img.style.borderRadius = '16px';
  img.style.boxShadow = '0 8px 32px #000b';
  img.style.background = '#222';
  img.style.objectFit = 'contain';

  overlay.appendChild(img);
  document.body.appendChild(overlay);

  overlay.addEventListener('click', () => {
    overlay.remove();
  });
}

// Klick-Event für alle Spielbilder
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.spiel-vorschau').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function() {
      createImageModal(this.src, this.alt);
    });
  });
});
