// ── cursor
const dot=document.getElementById('cur-dot'),arc=document.getElementById('cur-arc');
let mx=-100,my=-100,cx=-100,cy=-100;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px'});
(function step(){cx+=(mx-cx)*.15;cy+=(my-cy)*.15;arc.style.left=cx+'px';arc.style.top=cy+'px';requestAnimationFrame(step)})();
document.addEventListener('mousedown',()=>arc.classList.add('clicking'));
document.addEventListener('mouseup',()=>arc.classList.remove('clicking'));
document.querySelectorAll('a,button,.cmd,.stat,.tag').forEach(el=>{
  el.addEventListener('mouseenter',()=>arc.classList.add('on-link'));
  el.addEventListener('mouseleave',()=>arc.classList.remove('on-link'));
});

// ── floating particles
const pc=document.getElementById('particles');
for(let i=0;i<35;i++){
  const d=document.createElement('div');d.className='pt'+(Math.random()>.6?' w':'');
  d.style.left=Math.random()*100+'%';
  d.style.setProperty('--d',(7+Math.random()*14)+'s');
  d.style.setProperty('--dl',(Math.random()*12)+'s');
  d.style.setProperty('--o',(0.1+Math.random()*0.2).toFixed(2));
  const s=1+Math.random()*2.5;d.style.width=d.style.height=s+'px';
  pc.appendChild(d);
}

// ── cassette equalizer
const casEq=document.getElementById('casEq');
for(let i=0;i<20;i++){
  const b=document.createElement('div');b.className='eq';
  b.style.setProperty('--d',(0.3+Math.random()*0.5).toFixed(2)+'s');
  b.style.setProperty('--dl',(Math.random()*0.4).toFixed(2)+'s');
  b.style.setProperty('--h',(4+Math.random()*14)+'px');
  b.style.height='3px';
  casEq.appendChild(b);
}

// ── scroll fade
const fades=document.querySelectorAll('[data-fade]');
fades.forEach(el=>{const d=parseFloat(el.dataset.d||0);el.style.transitionDelay=d+'s'});
if('IntersectionObserver' in window){
  const ob=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');ob.unobserve(e.target)}})},{threshold:0.1});
  fades.forEach(el=>ob.observe(el));
}

// ── chat messages reveal
const msgs=document.querySelectorAll('[data-msg]');
const mo=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){const n=parseInt(e.target.dataset.msg);e.target.style.setProperty('--dl',n*.12+'s');mo.unobserve(e.target)}})},{threshold:.25});
msgs.forEach(el=>mo.observe(el));

// ── header scroll state
const hdr=document.querySelector('header');
window.addEventListener('scroll',()=>hdr.classList.toggle('glow',scrollY>40),{passive:true});

// ── mobile menu
const toggle=document.getElementById('menuToggle'),nav=document.querySelector('nav');
toggle?.addEventListener('click',()=>{toggle.classList.toggle('on');nav.classList.toggle('open')});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{toggle.classList.remove('on');nav.classList.remove('open')}));

// ── count-up stats
const counts=document.querySelectorAll('.count');
const co=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){
  const t=parseInt(e.target.dataset.to);let c=0;const s=Math.max(1,Math.floor(t/50));
  const iv=setInterval(()=>{c+=s;if(c>=t){c=t;clearInterval(iv)};e.target.textContent=c},25);
  co.unobserve(e.target);
}})},{threshold:.5});
counts.forEach(el=>co.observe(el));
