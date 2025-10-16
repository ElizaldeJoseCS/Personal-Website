const cursor = document.querySelector('.cursor');
let x = 0, y = 0;
let targetX = 0, targetY = 0;

// Try to restore last saved cursor position
const savedX = localStorage.getItem('cursorX');
const savedY = localStorage.getItem('cursorY');
if (savedX && savedY) {
  x = targetX = parseFloat(savedX);
  y = targetY = parseFloat(savedY);
  cursor.style.transform = `translate(${x}px, ${y}px)`; // Set immediately to avoid jump
}

// Hide cursor until moved
cursor.style.opacity = 0;

document.addEventListener('mousemove', (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
  cursor.style.opacity = 1;
});

function animate() {
  x += (targetX - x) * 0.1;
  y += (targetY - y) * 0.1;
  cursor.style.transform = `translate(${x}px, ${y}px)`;
  requestAnimationFrame(animate);
}
animate();

// Prevent jump when navigating between pages
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', (e) => {
    // Save position right before navigating
    localStorage.setItem('cursorX', targetX);
    localStorage.setItem('cursorY', targetY);

    // Optional: small delay to ensure storage is written
    setTimeout(() => {
      window.location = link.href;
    }, 50);

    e.preventDefault(); // Prevent immediate jump
  });
});
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});