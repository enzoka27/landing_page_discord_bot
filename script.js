// waveform
const waveform = document.getElementById('waveform');
const heights = [8,14,20,28,22,16,30,18,12,24,20,14,26,10,18,22];
heights.forEach((h, i) => {
  const bar = document.createElement('div');
  bar.className = 'bar';
  bar.style.setProperty('--h', h + 'px');
  bar.style.setProperty('--d', (0.4 + Math.random() * 0.6).toFixed(2) + 's');
  bar.style.animationDelay = (i * 0.05) + 's';
  waveform.appendChild(bar);
});

// cursor tape head
const head = document.getElementById('curHead');

document.addEventListener('mousemove', e => {
  head.style.left = e.clientX + 'px';
  head.style.top  = e.clientY + 'px';
});

const interactives = document.querySelectorAll('a, button, .cmd-card, .tech-pill');
interactives.forEach(el => {
  el.addEventListener('mouseenter', () => head.classList.add('on-link'));
  el.addEventListener('mouseleave', () => head.classList.remove('on-link'));
});

document.addEventListener('mousedown', () => head.classList.add('clicking'));
document.addEventListener('mouseup',   () => head.classList.remove('clicking'));

document.addEventListener('mouseleave', () => head.style.opacity = '0');
document.addEventListener('mouseenter', () => head.style.opacity = '1');