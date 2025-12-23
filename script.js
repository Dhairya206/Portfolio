// simple hover glow on main card
const card = document.querySelector('.card');
if (card) {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.background =
      `radial-gradient(circle at ${x}px ${y}px, rgba(96,165,250,.35), rgba(15,23,42,.9))`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = 'rgba(15,23,42,0.85)';
  });
}