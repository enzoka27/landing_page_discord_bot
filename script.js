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

/* ===== CURSOR ===== */
const curDot  = document.getElementById('cur-dot');
const curArc  = document.getElementById('cur-arc');
const arcLbl  = document.getElementById('arcLabel');

let mx = -200, my = -200;
let rx = -200, ry = -200;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  curDot.style.left = mx + 'px';
  curDot.style.top  = my + 'px';
});

(function loopArc() {
  rx += (mx - rx) * 0.11;
  ry += (my - ry) * 0.11;
  curArc.style.left = rx + 'px';
  curArc.style.top  = ry + 'px';
  requestAnimationFrame(loopArc);
})();

document.querySelectorAll('a, button, .cmd-item, .pill, .tech-pill').forEach(el => {
  const label = el.dataset.cursor || '';
  el.addEventListener('mouseenter', () => {
    arcLbl.textContent = label;
    curArc.classList.add('on-link');
  });
  el.addEventListener('mouseleave', () => {
    curArc.classList.remove('on-link');
  });
});

document.addEventListener('mousedown', () => curArc.classList.add('clicking'));
document.addEventListener('mouseup',   () => curArc.classList.remove('clicking'));

document.addEventListener('mouseleave', () => {
  curDot.style.opacity = '0';
  curArc.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  curDot.style.opacity = '1';
  curArc.style.opacity = '1';
});