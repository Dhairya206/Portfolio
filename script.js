// simple hover glow (optional)
const card = document.querySelector('.card');
card.addEventListener('mousemove', e => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  card.style.background =
    `radial-gradient(circle at ${x}px ${y}px, rgba(96,165,250,.4), rgba(255,255,255,.1))`;
});
card.addEventListener('mouseleave', () => {
  card.style.background = 'rgba(255,255,255,0.1)';
});
