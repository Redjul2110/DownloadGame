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
    // Wenn Home, dann zur h1-Überschrift scrollen
    if (target === 'home') {
      const heading = document.querySelector('#home h1');
      if (heading) {
        heading.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    }
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

// === Dynamische Spiele-Liste ===
const spiele = [
  {
    titel: "Jumper.exe",
    beschreibung: "Ein cooles Jump'n'Run-Spiel komplet kostenlos.",
    bilder: ["gameicon/1.png", "gameicon/2.png", "gameicon/3.png"],
    downloadText: "Widows11: Download", // <--- Hier geändert
    downloadDatei: "Jumper.exe",
    downloadPfad: "game/Jumper.exe"
  },
  // Beispiel für ein weiteres Spiel:
  // {
  //   titel: 'Jumper 2.exe',
  //   bilder: ['gameicon/4.png', 'gameicon/5.png', 'gameicon/6.png'],
  //   beschreibung: "Der Nachfolger mit neuen Features und noch mehr Spaß!",
  //   download: 'game/Jumper2.exe'
  // }
];

// Dark/Light Mode Umschalter
const modeToggle = document.getElementById('mode-toggle');
if (modeToggle) {
  function setMode(mode) {
    if (mode === 'light') {
      document.body.classList.add('light-mode');
      modeToggle.textContent = 'Dark';
    } else {
      document.body.classList.remove('light-mode');
      modeToggle.textContent = 'Light';
    }
    localStorage.setItem('colorMode', mode);
  }
  modeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.contains('light-mode');
    setMode(isLight ? 'dark' : 'light');
  });
  // Beim Laden Modus setzen
  const saved = localStorage.getItem('colorMode');
  setMode(saved === 'light' ? 'light' : 'dark');
}

// Download-Zähler (lokal)
function getDownloadCount(key) {
  return parseInt(localStorage.getItem('dl_' + key) || '0', 10);
}
function incDownloadCount(key) {
  const count = getDownloadCount(key) + 1;
  localStorage.setItem('dl_' + key, count);
  return count;
}

function renderSpiele(listeSpiele = spiele) {
  const liste = document.getElementById('spiele-liste');
  liste.innerHTML = '';
  listeSpiele.forEach(spiel => {
    const block = document.createElement('div');
    block.className = 'spiel-vorschau-block';
    let bilderHtml = (spiel.bilder || []).map(bild => `<img src="${bild}" alt="${spiel.titel} Vorschau" class="spiel-vorschau klein">`).join('');
    const dlKey = spiel.titel.replace(/[^a-z0-9]/gi, '').toLowerCase();
    const dlCount = getDownloadCount(dlKey);
    block.innerHTML = `
      <div class="spiel-vorschau-bilder">${bilderHtml}</div>
      <div class="spiel-beschreibung">
        <strong>${spiel.titel}</strong><br>
        ${spiel.beschreibung}
      </div>
      <button class="download-btn">${spiel.downloadText || ('Download ' + spiel.titel)}</button>
      <div class="download-counter">Downloads: <span id="dl-count-${dlKey}">${dlCount}</span></div>
    `;
    block.querySelectorAll('.spiel-vorschau').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function() {
        createImageModal(this.src, spiel.titel + ' Vorschau');
      });
    });
    block.querySelector('.download-btn').addEventListener('click', function() {
      const a = document.createElement('a');
      a.href = spiel.downloadPfad;
      a.download = spiel.downloadDatei;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      // Zähler erhöhen
      const newCount = incDownloadCount(dlKey);
      const counter = block.querySelector(`#dl-count-${dlKey}`);
      if (counter) counter.textContent = newCount;
    });
    liste.appendChild(block);
  });
}

// Mobile Menü-Button und Side-Menu Funktionalität
window.addEventListener('DOMContentLoaded', () => {
  renderSpiele();

  const menuToggle = document.getElementById('menu-toggle');
  const sideMenu = document.getElementById('side-menu');
  const sideNavLinks = sideMenu.querySelectorAll('nav a');

  menuToggle.addEventListener('click', () => {
    sideMenu.classList.toggle('open');
  });

  // Side-Menu schließt sich beim Klick auf einen Link
  sideNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.getAttribute('href').replace('#', '');
      setActiveNav(target);
      document.getElementById(target).scrollIntoView({ behavior: 'smooth' });
      sideMenu.classList.remove('open');
    });
  });

  // Schließt das Menü beim Klick außerhalb
  document.addEventListener('click', function(e) {
    if (sideMenu.classList.contains('open') && !sideMenu.contains(e.target) && e.target !== menuToggle && !menuToggle.contains(e.target)) {
      sideMenu.classList.remove('open');
    }
  });

  // Suchleiste bei Hover auf Spiele-Überschrift ein-/ausblenden
  const spieleUeberschrift = document.getElementById('spiele-ueberschrift');
  const sucheContainer = document.getElementById('spiele-suche-container');
  if (spieleUeberschrift && sucheContainer) {
    spieleUeberschrift.addEventListener('mouseenter', () => {
      sucheContainer.style.display = 'flex';
    });
    spieleUeberschrift.addEventListener('mouseleave', () => {
      setTimeout(() => {
        if (!sucheContainer.matches(':hover')) {
          sucheContainer.style.display = 'none';
        }
      }, 200);
    });
    sucheContainer.addEventListener('mouseenter', () => {
      sucheContainer.style.display = 'flex';
    });
    sucheContainer.addEventListener('mouseleave', () => {
      sucheContainer.style.display = 'none';
    });
    // Beim Laden einmal anzeigen, damit User weiß, dass es die Suche gibt
    setTimeout(() => {
      sucheContainer.style.display = 'flex';
      setTimeout(() => {
        if (!sucheContainer.matches(':hover') && !spieleUeberschrift.matches(':hover')) {
          sucheContainer.style.display = 'none';
        }
      }, 2500);
    }, 500);
  }

  // Suchfunktion für die Spiele-Liste (Titel muss mit Suchtext beginnen)
  const suchInput = document.getElementById('spiele-suche');
  if (suchInput) {
    suchInput.addEventListener('input', function() {
      const query = this.value.trim().toLowerCase();
      if (!query) {
        renderSpiele(spiele);
        return;
      }
      const gefiltert = spiele.filter(spiel =>
        spiel.titel && spiel.titel.toLowerCase().startsWith(query)
      );
      renderSpiele(gefiltert);
    });
  }
});
