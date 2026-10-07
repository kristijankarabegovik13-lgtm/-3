const scene = document.getElementById('scene');
const openButton = document.getElementById('openButton');
const replay = document.getElementById('replay');
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const card = document.getElementById('card');
const sparklesWrap = document.getElementById('sparkles');

function createSparkles(){
  for(let i=0;i<44;i++){
    const s=document.createElement('span');
    s.className='sparkle';
    s.style.left=(Math.random()*100)+'%';
    s.style.top=(Math.random()*100)+'%';
    s.style.animationDelay=(Math.random()*4)+'s';
    s.style.animationDuration=(2.6+Math.random()*3.8)+'s';
    sparklesWrap.appendChild(s);
  }
}

function openInvitation(){
  if(scene.classList.contains('open')) return;
  scene.classList.add('open');
  card.setAttribute('aria-hidden','false');

  bgMusic.currentTime = 0;
  bgMusic.volume = 0.8;
  bgMusic.muted = false;
  bgMusic.play().then(()=>{
    musicToggle.hidden = false;
    musicToggle.textContent = '🔊';
    musicToggle.setAttribute('aria-label','Исклучи музика');
  }).catch(()=>{
    musicToggle.hidden = false;
    musicToggle.textContent = '▶';
    musicToggle.setAttribute('aria-label','Пушти музика');
  });

  setTimeout(()=>{ replay.hidden=false; }, 1450);
}

function resetInvitation(){
  scene.classList.remove('open');
  replay.hidden = true;
  musicToggle.hidden = true;
  bgMusic.pause();
  bgMusic.currentTime = 0;
  bgMusic.muted = false;
  card.setAttribute('aria-hidden','true');
}

openButton.addEventListener('click', openInvitation);
openButton.addEventListener('keydown', e=>{
  if(e.key === 'Enter' || e.key === ' ') openInvitation();
});
replay.addEventListener('click', resetInvitation);
musicToggle.addEventListener('click', ()=>{
  if(bgMusic.paused){
    bgMusic.play();
    bgMusic.muted = false;
    musicToggle.textContent='🔊';
    musicToggle.setAttribute('aria-label','Исклучи музика');
  }else{
    bgMusic.muted = !bgMusic.muted;
    musicToggle.textContent = bgMusic.muted ? '🔇' : '🔊';
    musicToggle.setAttribute('aria-label', bgMusic.muted ? 'Вклучи музика' : 'Исклучи музика');
  }
});

createSparkles();

// Keep the invitation inside the actually visible phone viewport.
// This avoids cropping caused by Safari/Chrome address bars on smaller phones.
function syncRealViewportHeight(){
  document.documentElement.style.setProperty('--real-vh', `${window.innerHeight * 0.01}px`);
}
syncRealViewportHeight();
window.addEventListener('resize', syncRealViewportHeight, {passive:true});
window.addEventListener('orientationchange', ()=>setTimeout(syncRealViewportHeight, 120), {passive:true});
