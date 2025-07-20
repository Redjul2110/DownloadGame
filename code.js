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
  img.style.transform = 'scale(0.85)';
  img.style.opacity = '0';
  img.style.transition = 'transform 0.6s cubic-bezier(.4,1.4,.6,1.0), opacity 0.6s cubic-bezier(.4,1.4,.6,1.0)';

  overlay.appendChild(img);
  document.body.appendChild(overlay);

  // Animation nach kleinem Timeout triggern
  setTimeout(() => {
    img.style.transform = 'scale(1)';
    img.style.opacity = '1';
  }, 10);

  function closeModal() {
    img.style.transform = 'scale(0.5)';
    img.style.opacity = '0';
    setTimeout(() => overlay.remove(), 600);
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
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
    titel: "Discord",
    beschreibung: "Discord.",
    bilder: ["icon/main.png", "icon/main.png", "icon/main.png"],
    downloadText: "Join Discord", // <--- Hier geändert
    downloadDatei: "",
    downloadPfad: "",
    changelog: ""
  },

    {
    titel: "Web App",
    beschreibung: "Enthelt alle spiele.",
    bilder: ["icon/main.png", "icon/main.png", "icon/main.png"],
    downloadText: "Download für Windows 11", // <--- Hier geändert
    downloadDatei: "DownloadApp.exe",
    downloadPfad: "https://github.com/Redjul2110/DownloadGame/releases/download/1.0.3/DownloadApp.exe",
    changelog: "none"
  },

  {
    titel: "Jumper.exe",
    beschreibung: "Ein cooles Jump'n'Run-Spiel komplet kostenlos.",
    bilder: ["gameicon/1.png", "gameicon/2.png", "gameicon/3.png"],
    downloadText: "Download für Windows 11", // <--- Hier geändert
    downloadDatei: "Jumper.exe",
    downloadPfad: "game/Jumper.exe",
    changelog: "- Bugfixes\n- Mehr kommt noch"
  },


   {
    titel: "Jumper.exe",
    beschreibung: "Ein cooles Jump'n'Run-Spiel komplet kostenlos im browser.",
    bilder: ["gameicon/1.png", "gameicon/2.png", "gameicon/3.png"],
    downloadText: "Link öffnen Jumper", // <--- Hier geändert
    downloadDatei: "",
    downloadPfad: "",
    changelog: "- Bugfixes\n- Mehr kommt noch"
  },


  {
    titel: "Controller Flight",
    beschreibung: "Ein cooles Flugspiel direkt im Browser.",
    bilder: ["gameicon/4.png", "gameicon/5.png", "gameicon/6.png"],
    downloadText: "Link öffnen Controller Flight",
    downloadDatei: "",
    downloadPfad: "",
    changelog: "- Erstveröffentlichung\n- Spiele jetzt im Browser!"
  }

  // Beispiel für ein weiteres Spiel:
  // {
  //   titel: 'Jumper 2.exe',
  //   bilder: ['gameicon/4.png', 'gameicon/5.png', 'gameicon/6.png'],
  //   beschreibung: "Der Nachfolger mit neuen Features und noch mehr Spaß!",
  //   download: 'game/Jumper2.exe',
  //   changelog: "- Neue Power-Ups\n- Mehr Gegner\n- Soundtrack überarbeitet"
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
  // Beim Laden Modus setzen: Immer Dark Mode als Standard beim ersten Laden
  let saved = localStorage.getItem('colorMode');
  if (!saved) {
    setMode('dark'); // Setzt und speichert dark als Standard
  } else {
    setMode(saved === 'light' ? 'light' : 'dark');
  }
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
  listeSpiele.forEach((spiel, idx) => {
    const block = document.createElement('div');
    block.className = 'spiel-vorschau-block';
    let bilderHtml = (spiel.bilder || []).map(bild => `<img src="${bild}" alt="${spiel.titel} Vorschau" class="spiel-vorschau klein">`).join('');
    block.innerHTML = `
      <div class="spiel-vorschau-bilder">${bilderHtml}</div>
      <div class="spiel-beschreibung">
        <strong>${spiel.titel}</strong><br>
        ${spiel.beschreibung}
      </div>
      <button class="download-btn">${spiel.downloadText || ('Download ' + spiel.titel)}</button>
      <div class="download-hinweis">Bitte auf Download klicken &rarr;</div>
      <button class="changelog-btn" data-idx="${idx}">Change Log</button>
      <div class="changelog-modal" id="changelog-modal-${idx}">
        <div class="changelog-modal-content">
          <h3>Change Log Report</h3>
          <pre style="text-align:left;white-space:pre-line;">${spiel.changelog || 'Noch kein Changelog vorhanden.'}</pre>
          <button class="changelog-ok-btn">OK</button>
        </div>
      </div>
    `;
    block.querySelectorAll('.spiel-vorschau').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function() {
        createImageModal(this.src, spiel.titel + ' Vorschau');
      });
    });
    block.querySelector('.download-btn').addEventListener('click', function() {
      if (spiel.downloadText === 'Link öffnen Jumper') {
        window.open('https://redjul2110.github.io/Jumper-Web/Jumper.html', '_blank');
      } else if (spiel.downloadText === 'Link öffnen Controller Flight') {
        window.open('https://redjul2110.github.io/controller-flight/', '_blank');
        } else if (spiel.downloadText === 'Join Discord') {
        window.open('https://discord.gg/KcMQffBdpw', '_blank');
      } else if (spiel.downloadPfad) {
        const a = document.createElement('a');
        a.href = spiel.downloadPfad;
        a.download = spiel.downloadDatei;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    });
    
    // Change Look Button Funktionalität für jedes Spiel
    const changelogBtn = block.querySelector('.changelog-btn');
    const changelogModal = block.querySelector('.changelog-modal');
    const changelogOk = block.querySelector('.changelog-ok-btn');
    const changelogContent = block.querySelector('.changelog-modal-content');
    // Hilfsfunktion: Modal zurück in den Block verschieben
    function restoreChangelogModal() {
      if (!block.contains(changelogModal)) {
        block.appendChild(changelogModal);
      }
    }
    function closeChangelogModal() {
      changelogContent.classList.add('popup-out');
      setTimeout(() => {
        changelogModal.classList.remove('open');
        changelogContent.classList.remove('popup-out');
        restoreChangelogModal();
      }, 320);
    }
    changelogBtn.addEventListener('click', () => {
      // Alle anderen Changelog-Modals schließen
      document.querySelectorAll('.changelog-modal.open').forEach(modal => {
        modal.classList.remove('open');
        const content = modal.querySelector('.changelog-modal-content');
        if(content) content.classList.remove('popup-out');
        // Modal zurück in den Block verschieben, falls nötig
        const parentBlock = modal.closest('.spiel-vorschau-block');
        if (parentBlock && !parentBlock.contains(modal)) {
          parentBlock.appendChild(modal);
        }
      });
      // Modal in den Body verschieben, damit es immer ganz oben ist
      document.body.appendChild(changelogModal);
      changelogModal.classList.add('open');
      changelogContent.classList.remove('popup-out');
    });
    changelogOk.addEventListener('click', closeChangelogModal);
    changelogModal.addEventListener('click', (e) => {
      if (e.target === changelogModal) closeChangelogModal();
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

  // Suchfunktion für die Spiele-Liste (Titel muss mit Suchtext beginnen oder spezielle Begriffe)
  const suchInput = document.getElementById('spiele-suche');
  if (suchInput) {
    suchInput.addEventListener('input', function() {
      const query = this.value.trim().toLowerCase();
      if (!query) {
        renderSpiele(spiele);
        // Webseiten-Vorschlag entfernen, falls vorhanden
        const vorschlag = document.getElementById('webseiten-vorschlag');
        if (vorschlag) vorschlag.remove();
        return;
      }
      // Zusätzliche Keywords für Webseiten-Vorschlag
      const keywords = [
        "redjul2110",
        "jumper",
        "games",
        "download game",
        "game download",
        "controller flight"
      ];
      if (keywords.some(keyword => query.includes(keyword))) {
        renderSpiele(spiele);
        // Vorschlag für Webseite anzeigen
        let vorschlag = document.getElementById('webseiten-vorschlag');
        if (!vorschlag) {
          vorschlag = document.createElement('div');
          vorschlag.id = 'webseiten-vorschlag';
          vorschlag.style.margin = '2rem auto 0 auto';
          vorschlag.style.textAlign = 'center';
          vorschlag.innerHTML = '<a href="https://redjul2110.github.io/DownloadGame/" target="_blank" style="font-size:1.3rem;font-weight:700;color:#5865f2;text-decoration:underline;">Zur Webseite von redjul2110</a>';
          suchInput.parentElement.appendChild(vorschlag);
        }
      } else {
        // Normale Filterung
        renderSpiele(spiele.filter(spiel =>
          spiel.titel && spiel.titel.toLowerCase().startsWith(query)
        ));
        // Webseiten-Vorschlag entfernen, falls vorhanden
        const vorschlag = document.getElementById('webseiten-vorschlag');
        if (vorschlag) vorschlag.remove();
      }
    });
  }
});


// Change Look Button & Modal Funktionalität (veraltet, entfernt)
