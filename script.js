const page = document.getElementById('page');
const openBtn = document.getElementById('openBtn');
const replayBtn = document.getElementById('replayBtn');
const musicBtn = document.getElementById('musicBtn');
const song = document.getElementById('song');
const card = document.getElementById('card');
const START_AT = 19;

function syncViewport(){
  const h = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  document.documentElement.style.setProperty('--app-h', `${h}px`);
}
syncViewport();
window.addEventListener('resize', syncViewport);
if(window.visualViewport){
  window.visualViewport.addEventListener('resize', syncViewport);
}

function startMusic(){
  try { song.currentTime = START_AT; } catch(e) {}
  song.volume = 0.78;
  song.muted = false;
  const p = song.play();
  if(p && typeof p.then === 'function'){
    p.then(()=>{
      musicBtn.hidden = false;
      musicBtn.textContent = '🔊';
      musicBtn.setAttribute('aria-label','Исклучи музика');
    }).catch(()=>{
      musicBtn.hidden = false;
      musicBtn.textContent = '▶';
      musicBtn.setAttribute('aria-label','Пушти музика');
    });
  }
}

function openInvitation(){
  if(page.classList.contains('open')) return;
  page.classList.add('open');
  card.setAttribute('aria-hidden','false');
  startMusic();
  setTimeout(()=>{ replayBtn.hidden = false; }, 900);
}

function resetInvitation(){
  page.classList.remove('open');
  card.setAttribute('aria-hidden','true');
  replayBtn.hidden = true;
  musicBtn.hidden = true;
  song.pause();
  try { song.currentTime = START_AT; } catch(e) {}
  song.muted = false;
}

openBtn.addEventListener('click', openInvitation);
replayBtn.addEventListener('click', resetInvitation);
musicBtn.addEventListener('click', ()=>{
  if(song.paused){
    if(song.currentTime < START_AT - .25) song.currentTime = START_AT;
    song.play();
    song.muted = false;
    musicBtn.textContent = '🔊';
    musicBtn.setAttribute('aria-label','Исклучи музика');
  } else {
    song.muted = !song.muted;
    musicBtn.textContent = song.muted ? '🔇' : '🔊';
    musicBtn.setAttribute('aria-label',song.muted ? 'Вклучи музика' : 'Исклучи музика');
  }
});

song.addEventListener('ended',()=>{
  song.currentTime = START_AT;
});
