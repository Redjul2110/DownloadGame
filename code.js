function showSection(section) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(section).classList.add('active');
  document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
  document.getElementById('nav-' + section).classList.add('active');
}
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
