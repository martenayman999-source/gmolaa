/* =========================================================
   levels.js — مغامرة جمولة: المراحل الجديدة
   4) أوضة جمولة   5) الوحش العملاق (راوند 1)
   6) الجيم + فيديو gmmal.mp4   7) الحساب (راوند 2) + الشهادة
   للتجربة السريعة: افتح الصفحة بـ ?lvl=4 أو 5 أو 6 أو 7
   ========================================================= */
(() => {

/* ---------- صورة محمد مصطفى (لو الوش مش في النص عدّل الأرقام) ---------- */
const MOS = { file:'mostafa.jpeg', cx:.46, cy:.44, r:.25 };
const MSKIN = '#c08a68';
const mosImg = new Image(); let mosOK = false;
mosImg.onload = () => { mosOK = true; }; mosImg.src = MOS.file;
const LVL = new URLSearchParams(location.search).get('lvl');

function photo(c,img,cfg,x,y,r,ring){
  const w = img.naturalWidth, h = img.naturalHeight, rad = cfg.r*w;
  c.save(); c.beginPath(); c.arc(x,y,r,0,6.283); c.clip();
  c.drawImage(img, cfg.cx*w-rad, cfg.cy*h-rad, rad*2, rad*2, x-r, y-r, r*2, r*2);
  c.restore();
  if (ring){ c.strokeStyle = ring; c.lineWidth = Math.max(2, r*.08); c.beginPath(); c.arc(x,y,r,0,6.283); c.stroke(); }
}
function cartoonMos(c,x,y,r){
  c.fillStyle = '#1a120d';
  for (let i=0;i<9;i++){ const a = Math.PI*(1.05+i*.11); c.beginPath(); c.arc(x+Math.cos(a)*r*.8, y+Math.sin(a)*r*.8-4, r*.32, 0, 6.283); c.fill(); }
  c.fillStyle = MSKIN; c.beginPath(); c.arc(x,y,r*.86,0,6.283); c.fill();
  c.fillStyle = '#1a120d'; c.beginPath(); c.arc(x,y,r*.86,.12*Math.PI,.88*Math.PI);
  c.quadraticCurveTo(x, y+r*.25, x+Math.cos(.12*Math.PI)*r*.86, y+Math.sin(.12*Math.PI)*r*.86); c.fill();
  c.fillRect(x-r*.3, y+r*.28, r*.6, r*.1);
  c.beginPath(); c.arc(x-r*.3,y-r*.08,r*.08,0,6.283); c.arc(x+r*.3,y-r*.08,r*.08,0,6.283); c.fill();
  c.strokeStyle = '#111'; c.lineWidth = r*.09; c.beginPath();
  c.moveTo(x-r*.5,y-r*.34); c.lineTo(x-r*.12,y-r*.2); c.moveTo(x+r*.5,y-r*.34); c.lineTo(x+r*.12,y-r*.2); c.stroke();
}
const mosHead = (c,x,y,r) => mosOK ? photo(c,mosImg,MOS,x,y,r,'#fff') : cartoonMos(c,x,y,r);
function gamHead(c,x,y,r){
  if (faceOK) return photo(c,faceImg,FACE,x,y,r,'#fff');
  c.save(); c.translate(x,y); c.scale(r/14,r/14); cartoonGamal(c,-2); c.restore();
}

/* ---------- CSS ---------- */
document.head.insertAdjacentHTML('beforeend', `<style>
#pad{position:fixed;left:0;right:0;bottom:calc(14px + env(safe-area-inset-bottom));display:flex;justify-content:space-between;align-items:flex-end;padding:0 14px;z-index:18;direction:ltr;transition:opacity .3s}
#pad .pg{display:flex;gap:10px;align-items:flex-end}
#pad button{width:64px;height:64px;border-radius:50%;border:none;background:rgba(255,255,255,.9);font-size:1.7rem;box-shadow:0 5px 0 #f5b98a;touch-action:none;cursor:pointer}
#pad button.on,#pad button:active{transform:translateY(4px);box-shadow:0 1px 0 #f5b98a}
#pad #bHit{width:80px;height:80px;background:linear-gradient(#ffb347,#ff7a1a);font-size:2.1rem}
#pad #bSuper{opacity:.35;filter:grayscale(1)}
#pad #bSuper.ready{opacity:1;filter:none;background:linear-gradient(#ffe066,#ffb000);animation:pulse .7s infinite}
#story,#vs{background:radial-gradient(circle at 50% 40%,#3a1a10,#0d0505 75%)}
#storyLines{display:flex;flex-direction:column;gap:16px;max-width:460px}
#storyLines div{font-family:'Lalezar';font-size:clamp(1.5rem,6.5vw,2.3rem);color:#fff;text-shadow:0 3px 0 #b34700;opacity:0;transform:translateY(24px) scale(.85);transition:.55s cubic-bezier(.2,1.5,.4,1)}
#storyLines div.in{opacity:1;transform:none}
#storyBtn{opacity:0;pointer-events:none;transition:opacity .4s}
#storyBtn.on{opacity:1;pointer-events:auto}
.vsr{font-family:'Lalezar';font-size:clamp(1.3rem,6vw,2rem);color:#ffd0a8}
.vsrow{display:flex;align-items:center;gap:6px;direction:ltr}
.fighter{display:flex;flex-direction:column;align-items:center;gap:4px;color:#fff;font-family:'Lalezar';font-size:clamp(1.1rem,4.6vw,1.6rem)}
.fighter img{width:min(32vw,165px);height:min(32vw,165px);border-radius:50%;object-fit:cover;border:5px solid #ffe066;box-shadow:0 0 30px rgba(255,200,0,.5);background:#333}
.fighter.boss img{width:min(40vw,205px);height:min(40vw,205px);border-color:#e63946;box-shadow:0 0 45px rgba(230,57,70,.85)}
.pw{font-family:'Tajawal';font-weight:700;font-size:.85rem;color:#ffd0a8}
#vsTxt{font-family:'Lalezar';font-size:clamp(3rem,14vw,5rem);color:#ffe066;text-shadow:0 5px 0 #e63946;animation:zoom .45s infinite alternate}
#vs.show .fighter{animation:slideL .7s cubic-bezier(.2,1.4,.4,1) both}
#vs.show .fighter.boss{animation-name:slideR}
@keyframes slideL{from{transform:translateX(-130%)}} @keyframes slideR{from{transform:translateX(130%)}}
#vid{background:#000;gap:12px}
.vwrap{position:relative;height:min(76vh,150vw);aspect-ratio:9/16;border-radius:18px;overflow:hidden;background:#111;box-shadow:0 0 0 3px #ffe066,0 0 60px rgba(255,160,0,.5)}
#gv{width:100%;height:100%;object-fit:cover;filter:contrast(1.15) saturate(1.35) brightness(1.05);transform-origin:50% 40%}
#vid.playing #gv{animation:kb 8s ease-in-out infinite alternate}
@keyframes kb{to{transform:scale(1.14)}}
.vgn{position:absolute;inset:0;background:radial-gradient(ellipse at center,transparent 45%,rgba(0,0,0,.7));pointer-events:none}
.lb{position:absolute;left:0;right:0;height:7%;background:#000}.lb.t{top:0}.lb.b{bottom:0}
#cap{position:absolute;left:4%;right:4%;bottom:13%;text-align:center;font-family:'Lalezar';font-size:clamp(1.6rem,7vw,2.6rem);color:#ffe066;text-shadow:0 3px 0 #b34700,0 0 18px rgba(0,0,0,.9);line-height:1.2;pointer-events:none}
#cap.pop{animation:capPop .55s cubic-bezier(.2,1.6,.4,1)}
@keyframes capPop{from{transform:scale(2.3) rotate(-7deg);opacity:0}}
.rec{position:absolute;top:9%;left:6%;color:#fff;font:700 .85rem Tajawal;direction:ltr;animation:pulse 1s infinite}
.rec b{color:#e63946}
#vbar{position:absolute;left:0;bottom:7%;height:4px;width:0;background:#ffe066}
#vflash{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none}
#vPlay{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);white-space:nowrap;z-index:3}
#vPlay:active{transform:translate(-50%,-45%)}
#vSkip{background:none;border:2px solid rgba(255,255,255,.5);color:#fff;border-radius:14px;padding:6px 18px;font:700 1rem Tajawal;cursor:pointer}
#win{background:rgba(20,8,0,.78);gap:14px;overflow:hidden}
.rays{position:fixed;inset:-60%;background:repeating-conic-gradient(rgba(255,224,102,.13) 0 10deg,transparent 10deg 20deg);animation:spin 24s linear infinite;z-index:-1}
@keyframes spin{to{transform:rotate(360deg)}}
#cert{width:min(94vw,640px);height:auto;border-radius:10px;box-shadow:0 20px 60px rgba(0,0,0,.6)}
#win.show #cert{animation:certIn 1s cubic-bezier(.2,1.4,.4,1) both}
@keyframes certIn{from{transform:scale(.2) rotate(-15deg);opacity:0}}
.wbtns{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
.wbtns .gbtn{font-size:1.25rem;padding:10px 22px 6px}
.cred{color:#ffd0a8;opacity:.8;font-size:.85rem}
</style>`);

/* ---------- HTML ---------- */
document.body.insertAdjacentHTML('beforeend', `
<div id="pad" class="hidden">
  <div class="pg"><button id="bL" data-k="ArrowLeft">◀</button><button id="bR" data-k="ArrowRight">▶</button></div>
  <div class="pg"><button id="bSuper">⚡</button><button id="bJump">⬆</button><button id="bHit">👊</button></div>
</div>
<div id="story" class="screen"><div id="storyLines"></div><button class="gbtn" id="storyBtn"></button></div>
<div id="vs" class="screen">
  <div class="vsr" id="vsRound"></div>
  <div class="vsrow">
    <div class="fighter"><img src="gmmal.jpeg" style="object-position:52% 42%" onerror="this.style.visibility='hidden'"><span>جمولة</span><span class="pw" id="gPow"></span></div>
    <div id="vsTxt">VS</div>
    <div class="fighter boss"><img src="mostafa.jpeg" style="object-position:46% 39%" onerror="this.style.visibility='hidden'"><span>محمد مصطفى 😈</span><span class="pw" id="mPow"></span></div>
  </div>
  <button class="gbtn" id="vsBtn">يلا نتخانق 🥊</button>
</div>
<div id="vid" class="screen">
  <div class="vwrap">
    <video id="gv" src="gmmal.mp4" playsinline webkit-playsinline preload="auto"></video>
    <div class="vgn"></div><div class="lb t"></div><div class="lb b"></div>
    <div class="rec"><b>●</b> REC • GYM</div>
    <div id="cap"></div><div id="vbar"></div><div id="vflash"></div>
    <button class="gbtn" id="vPlay">▶ شوف جمولة في الجيم</button>
  </div>
  <button id="vSkip">تخطي ⏭</button>
</div>
<div id="win" class="screen">
  <div class="rays"></div>
  <canvas id="cert" width="1000" height="700"></canvas>
  <div class="wbtns"><button class="gbtn" id="dlCert">📥 حمّل الشهادة</button><button class="gbtn" id="againAll">↺ العب تاني</button></div>
  <small class="cred">بطولة: جمال (جمولة) • الوحش: محمد مصطفى • السواقة: محمد مصطفى • اللوكيشن: سطح عدنان</small>
</div>`);

/* ---------- helpers ---------- */
const show = id => $(id).classList.add('show'), hide = id => $(id).classList.remove('show');
let tapX = 0, tapY = 0;
const vpt = e => [(e.clientX-OX)/S, (e.clientY-OY)/S];
addEventListener('pointerdown', e => { [tapX,tapY] = vpt(e); }, true);

function story(lines, btn, cb){
  phase = 'story'; $('#pad').classList.add('hidden');
  const box = $('#storyLines'), b = $('#storyBtn'); box.innerHTML = ''; b.textContent = btn; b.classList.remove('on');
  lines.forEach((t,i) => { const d = document.createElement('div'); d.textContent = t; box.appendChild(d);
    setTimeout(() => { d.classList.add('in'); SFX.tick(); }, 450+i*1150); });
  setTimeout(() => b.classList.add('on'), 450+lines.length*1150);
  b.onclick = () => { if (!b.classList.contains('on')) return; hide('#story'); SFX.go(); cb(); };
  show('#story');
}
function vs(round, cb){
  phase = 'story'; $('#pad').classList.add('hidden');
  $('#vsRound').textContent = round === 1 ? 'الراوند الأول' : 'الراوند التاني • الحساب 😤';
  $('#gPow').textContent = round === 1 ? 'القوة: 12 😅' : 'القوة: 99999 🔥';
  $('#mPow').textContent = 'القوة: 9999 😈';
  show('#vs'); SFX.weird();
  $('#vsBtn').onclick = () => { hide('#vs'); SFX.go(); cb(); };
}

/* =========================================================
   المرحلة 4: تنضيف أوضة جمولة
   ========================================================= */
const BINS = [
  {k:'c', x:75,  y:640, e:'🧺', n:'الغسيل'},
  {k:'k', x:200, y:640, e:'🫖', n:'المطبخ'},
  {k:'t', x:325, y:640, e:'🗑️', n:'الزبالة'}
];
const JUNK = { c:['👕','👖','🧦','🩳','🧥','👟','🧢'], k:['☕','🍵','☕','🍽️','🥛'], t:['🥡','🧻','📦','🍟','🥫','🍌'] };
const RM = {};
function rmItem(k,x,y){ const l = JUNK[k]; RM.items.push({k, e:l[Math.random()*l.length|0], x, y, hx:x, hy:y, rot:(Math.random()-.5)*1.2, s:0, back:0}); }
function rmPos(){ return Math.random() < .28 ? [40+Math.random()*140, 372+Math.random()*26] : [25+Math.random()*350, 455+Math.random()*130]; }
function initRoom(){
  scene = 'room'; flashFade(); parts = []; endChaos(); lives = 3; coinsAtStart = coins;
  Object.assign(RM, {items:[], drag:null, t:70, done:0, cat:null, catT:8, extra:6, combo:0, comboT:0, bump:[0,0,0], cheer:0, warned:false});
  const ks = 'ccccccckkkkkkttttt'.split('');
  ks.forEach(k => { const [x,y] = rmPos(); rmItem(k,x,y); });
  RM.total = ks.length + RM.extra;
  $('#hud').classList.remove('hidden'); $('#pad').classList.add('hidden');
  intro('المرحلة 4','نضّف أوضة جمولة 🧹','اسحب كل حاجة لمكانها: 🧺 هدوم • 🫖 كبايات • 🗑️ زبالة');
}
addEventListener('pointerdown', e => {
  if (scene !== 'room' || phase !== 'play' || e.target.closest('button')) return;
  const [x,y] = vpt(e); let best = null, bd = 34;
  for (const it of RM.items){ const d = Math.hypot(it.x-x, it.y-y); if (d < bd){ bd = d; best = it; } }
  if (!best) return;
  RM.items.splice(RM.items.indexOf(best),1); RM.items.push(best);
  best.hx = best.x; best.hy = best.y; best.back = 0;
  RM.drag = {it:best, ox:best.x-x, oy:best.y-y, id:e.pointerId}; sweep(500,700,.05,'sine',.03);
});
addEventListener('pointermove', e => {
  if (!RM.drag || e.pointerId !== RM.drag.id) return;
  const [x,y] = vpt(e); RM.drag.it.x = clamp(x+RM.drag.ox, 12, 388); RM.drag.it.y = clamp(y+RM.drag.oy, 300, 690);
});
function rmDrop(e){
  if (!RM.drag || e.pointerId !== RM.drag.id) return;
  const it = RM.drag.it; RM.drag = null;
  if (scene !== 'room' || phase !== 'play') return;
  const bi = BINS.findIndex(b => Math.hypot(b.x-it.x, b.y-it.y) < 54);
  if (bi < 0){ it.y = clamp(it.y, 370, 592); it.hx = it.x; it.hy = it.y; return; }
  if (BINS[bi].k === it.k) rmCollect(it, bi);
  else {
    lives--; falls++; it.back = 1; shake = .25; SFX.hit(); RM.combo = 0;
    toast(`😅 لأ! ده مكانه ${BINS.find(b => b.k === it.k).n}`);
    if (lives <= 0) gameOver();
  }
}
addEventListener('pointerup', rmDrop); addEventListener('pointercancel', rmDrop);
function rmCollect(it, bi){
  RM.items.splice(RM.items.indexOf(it),1); RM.done++; coins++;
  RM.combo = RM.comboT > 0 ? RM.combo+1 : 1; RM.comboT = 1.7;
  RM.bump[bi] = 1; RM.cheer = .8; SFX.coin(); sparkle(BINS[bi].x, BINS[bi].y-20, 10);
  if (RM.combo >= 3 && RM.combo % 3 === 0){ RM.t += 3; toast(`🔥 كومبو ×${RM.combo} • +3 ثواني`); }
  if (RM.done >= RM.total) rmClear();
}
function rmClear(){
  phase = 'clear'; RM.drag = null; SFX.win(); confettiRain(); banner('برافو يا جمولة','الأوضة بتلمع ✨','',2600);
  setTimeout(() => story(['الأوضة بقت بتلمع ✨','بس فجأة... حد بيخبط على الباب 🚪','😈 الوحش العملاق محمد مصطفى وصل!'],
    'افتح الباب 🚪', () => vs(1, () => initBoss(1))), 2900);
}
function updRoom(dt){
  RM.bump = RM.bump.map(b => Math.max(0, b-dt*4)); RM.cheer = Math.max(0, RM.cheer-dt); RM.comboT = Math.max(0, RM.comboT-dt);
  for (const it of RM.items){
    it.s = Math.min(1, it.s+dt*5);
    if (it.back > 0){ it.back = Math.max(0, it.back-dt*3); it.x += (it.hx-it.x)*Math.min(1,dt*12); it.y += (it.hy-it.y)*Math.min(1,dt*12); }
  }
  if (phase !== 'play') return;
  RM.t -= dt;
  if (RM.t <= 10 && !RM.warned){ RM.warned = true; toast('⏰ ماما جاية! بسرعة','weird'); SFX.weird(); }
  if (RM.t <= 0){ RM.drag = null; toast('😱 ماما دخلت والأوضة لسه مكركبة'); gameOver(); return; }
  RM.catT -= dt;
  if (!RM.cat && RM.extra > 0 && (RM.catT <= 0 || RM.items.length === 0)){
    RM.cat = {x:-40, drops:[110+Math.random()*60, 230+Math.random()*90]}; toast('🐈 القطة داخلة تبوّظ الدنيا!','weird');
  }
  if (RM.cat){
    const c = RM.cat; c.x += 190*dt;
    while (c.drops.length && c.x >= c.drops[0] && RM.extra > 0){
      c.drops.shift(); RM.extra--; rmItem('ckt'[Math.random()*3|0], c.x, 535+Math.random()*45); SFX.bump(); dust(c.x,560,6);
    }
    if (c.x > VW+50){ RM.cat = null; RM.catT = 7+Math.random()*3; }
  }
}
function drawRoom(){
  let g = ctx.createLinearGradient(0,0,0,440); g.addColorStop(0,'#ffe3c4'); g.addColorStop(1,'#ffd0a1');
  ctx.fillStyle = g; ctx.fillRect(0,0,VW,440);
  ctx.fillStyle = 'rgba(255,255,255,.18)'; for (let x=0;x<VW;x+=36) ctx.fillRect(x,0,14,440);
  // شباك
  ctx.fillStyle = '#8ecdf5'; rr(ctx,150,110,110,100,8); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.8)'; cloud(165,150,.45);
  ctx.fillStyle = '#fff'; ctx.fillRect(203,110,5,100); ctx.fillRect(150,158,110,5);
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 6; rr(ctx,150,110,110,100,8); ctx.stroke();
  ctx.fillStyle = '#e76f51';
  ctx.beginPath(); ctx.moveTo(136,98); ctx.quadraticCurveTo(168,160,150,226); ctx.lineTo(134,226); ctx.fill();
  ctx.beginPath(); ctx.moveTo(274,98); ctx.quadraticCurveTo(242,160,260,226); ctx.lineTo(276,226); ctx.fill();
  ctx.fillStyle = '#6b4226'; ctx.fillRect(128,94,154,6);
  // بوستر
  ctx.save(); ctx.translate(70,170); ctx.rotate(-.08);
  ctx.fillStyle = '#1f2a44'; ctx.fillRect(-32,-44,64,88);
  ctx.fillStyle = '#ffe066'; ctx.font = '20px Lalezar'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('جمولة',0,-12);
  ctx.font = `22px ${EMOJI}`; ctx.fillText('🔥',0,18); ctx.restore();
  // دولاب
  ctx.fillStyle = '#9c6644'; ctx.fillRect(285,170,105,270);
  ctx.fillStyle = '#7f5539'; ctx.fillRect(336,170,3,270); ctx.fillRect(285,170,105,8);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(326,290,4,16); ctx.fillRect(345,290,4,16);
  ctx.fillStyle = '#457b9d'; ctx.beginPath(); ctx.moveTo(334,240); ctx.lineTo(350,246); ctx.lineTo(344,300); ctx.lineTo(332,296); ctx.fill();
  // أرضية
  g = ctx.createLinearGradient(0,440,0,700); g.addColorStop(0,'#c98d5a'); g.addColorStop(1,'#a86d3e');
  ctx.fillStyle = g; ctx.fillRect(0,440,VW,260);
  ctx.strokeStyle = 'rgba(0,0,0,.12)'; ctx.lineWidth = 1;
  for (let y=470,i=0; y<700; y+=30,i++){ ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(VW,y); ctx.stroke();
    for (let x=(i%2)*60; x<VW; x+=120){ ctx.beginPath(); ctx.moveTo(x,y-30); ctx.lineTo(x,y); ctx.stroke(); } }
  ctx.fillStyle = '#8a5a33'; ctx.fillRect(0,436,VW,7);
  ctx.fillStyle = 'rgba(199,125,255,.3)'; ctx.beginPath(); ctx.ellipse(200,525,150,42,0,0,6.283); ctx.fill();
  // سرير
  ctx.fillStyle = '#6b4226'; ctx.fillRect(12,330,14,115); ctx.fillRect(12,412,186,30); ctx.fillRect(186,395,12,50);
  ctx.fillStyle = '#fff'; rr(ctx,24,384,170,30,8); ctx.fill();
  ctx.fillStyle = '#4ea8de'; ctx.beginPath(); ctx.moveTo(70,386);
  for (let x=70;x<=196;x+=21) ctx.quadraticCurveTo(x+10, 376+Math.sin(x)*6, x+21, 388);
  ctx.lineTo(196,414); ctx.lineTo(62,414); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#fff4e6'; ctx.beginPath(); ctx.ellipse(46,384,22,10,-.2,0,6.283); ctx.fill();
  // جمولة
  drawDude(ctx, 362, 442, time, {v:variant, gamal:true, wave:RM.cheer>0, dir:-1});
  // القطة
  if (RM.cat){ ctx.save(); ctx.translate(RM.cat.x, 560+Math.abs(Math.sin(time*14))*-4); ctx.scale(-1,1);
    ctx.font = `34px ${EMOJI}`; ctx.textAlign = 'center'; ctx.textBaseline = 'bottom'; ctx.fillText('🐈',0,0); ctx.restore(); }
  // مكان الحاجات
  ctx.fillStyle = 'rgba(255,255,255,.5)'; rr(ctx,10,598,380,96,22); ctx.fill();
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  BINS.forEach((b,i) => {
    const s = 1 + RM.bump[i]*.35 + (RM.drag ? .06+.04*Math.sin(time*8+i) : 0);
    ctx.save(); ctx.translate(b.x,b.y-6); ctx.scale(s,s);
    ctx.fillStyle = RM.drag ? 'rgba(255,209,102,.65)' : 'rgba(255,255,255,.75)';
    ctx.beginPath(); ctx.arc(0,0,32,0,6.283); ctx.fill();
    ctx.font = `38px ${EMOJI}`; ctx.fillText(b.e,0,2); ctx.restore();
    ctx.fillStyle = '#3a2414'; ctx.font = '16px Lalezar'; ctx.fillText(b.n, b.x, b.y+40);
  });
  // الحاجات المرمية
  for (const it of RM.items){
    const dr = RM.drag && RM.drag.it === it;
    ctx.save(); ctx.translate(it.x,it.y);
    ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(dr?6:0, dr?20:13, 14,4,0,0,6.283); ctx.fill();
    const sc = it.s*(dr?1.3:1); ctx.scale(sc,sc); if (!dr) ctx.rotate(it.rot);
    ctx.font = `30px ${EMOJI}`; ctx.fillText(it.e,0,0); ctx.restore();
  }
  if (RM.combo >= 2 && RM.comboT > 0){
    ctx.font = '30px Lalezar'; ctx.lineWidth = 5; ctx.strokeStyle = '#b34700'; ctx.fillStyle = '#ffe066';
    ctx.strokeText(`كومبو ×${RM.combo}`,200,280); ctx.fillText(`كومبو ×${RM.combo}`,200,280);
  }
  if (phase === 'play' && RM.t < 10){ ctx.strokeStyle = `rgba(230,57,70,${.35+.3*Math.sin(time*10)})`; ctx.lineWidth = 18; ctx.strokeRect(0,0,VW,VH); }
}

/* =========================================================
   المرحلة 5 و 7: محمد مصطفى – الوحش العملاق
   ========================================================= */
const BG = 560;
const B = {waves:[], shots:[], rain:[], txt:[]}, GM = {};
const gk = () => B.round === 2 ? 1.35 : 1;
function initBoss(round){
  scene = 'boss'; flashFade(); parts = []; endChaos(); lives = 3; coinsAtStart = coins;
  Object.assign(B, {round, hp:100, shown:100, x:300, y:BG, vy:0, face:-1, st:'idle', stT:1.3, atk:'', hurt:0, dead:false, fall:0,
    rage:false, t:0, slow:0, walk:0, tips:0, waves:[], shots:[], rain:[], txt:[]});
  Object.assign(GM, {x:90, y:BG, vy:0, ground:true, face:1, inv:0, punch:0, pcd:0, sup:0, kb:0, fly:false, kbx:0, rot:0, mv:0});
  $('#hud').classList.remove('hidden'); $('#pad').classList.remove('hidden');
  $('#bSuper').style.display = round === 2 ? '' : 'none';
  if (round === 1) intro('المرحلة 5','الوحش العملاق 😈','◀ ▶ اتحرك • ⬆ نط • 👊 اضرب');
  else intro('المرحلة الأخيرة','الحساب 😤','نط لما تشوف ❗ وفوق الموجة • اضربه وهو تعبان 💫 • ⚡ ضربة الحمولة');
}
function gJump(){
  if (scene !== 'boss' || phase !== 'play' || !GM.ground || GM.fly) return;
  GM.vy = B.round === 2 ? -760 : -660; GM.ground = false; SFX.jump(); dust(GM.x,BG,5);
}
function gPunch(){
  if (scene !== 'boss' || phase !== 'play' || GM.pcd > 0 || GM.fly) return;
  GM.pcd = .26; GM.punch = .18; GM.face = Math.sign(B.x-GM.x) || GM.face;
  const reach = B.round === 2 ? 64 : 50;
  if (!B.dead && Math.abs(B.x-GM.x) < 46+reach && GM.y > BG-240){
    let dmg = B.round === 1 ? .7 : 3.2; if (B.st === 'tired') dmg *= 2;
    hitBoss(dmg, GM.x+GM.face*30, GM.y-40*gk());
  } else sweep(300,120,.07,'square',.025);
}
function gSuper(){
  if (scene !== 'boss' || B.round !== 2 || GM.sup < 100 || phase !== 'play') return;
  GM.sup = 0; shake = .2; SFX.jump2(); toast('⚡ ضربة الحمولة!!','weird');
  B.shots.push({own:true, x:GM.x, y:GM.y-55, vx:(Math.sign(B.x-GM.x)||1)*520, vy:-140, r:0, e:'🏋️', d:0});
}
function hitBoss(dmg,x,y){
  B.hurt = .15; sparkle(x,y,8); SFX.bump(); shake = Math.max(shake,.12);
  B.txt.push({x:x+(Math.random()-.5)*20, y, s:B.round===1 ? '-'+dmg.toFixed(1) : '-'+Math.round(dmg), l:1});
  if (B.round === 1){
    B.hp = Math.max(97, B.hp-dmg);
    if (Math.random() < .35) toast(['😂 دغدغة؟','🥱 ده ضرب ده؟','😴 صحّيني لما تبدأ','🤏 حاسس بحاجة بتهوّي'][Math.random()*4|0]);
    return;
  }
  B.hp = Math.max(0, B.hp-dmg); GM.sup = Math.min(100, GM.sup+9);
  if (B.hp <= 0) return bossDown();
  if (B.hp < 50 && !B.rage){ B.rage = true; toast('😡 محمد مصطفى اتعصب!','weird'); SFX.weird(); }
}
function hurtG(dir){
  if (GM.inv > 0 || phase !== 'play' || GM.fly) return;
  lives--; falls++; GM.inv = 1.3; GM.kb = dir*420; GM.vy = -360; GM.ground = false; shake = .35; SFX.hit();
  toast(['💥 آآآه','😵 يا ساتر','🤕 إيدك تقيلة يا محمد'][Math.random()*3|0]);
  if (lives <= 0){ if (B.round === 1) koScene(); else gameOver(); }
}
function bcd(){ return B.round === 1 ? .45+Math.random()*.35 : (B.rage ? .55 : .95)+Math.random()*.4; }
function pickAtk(){
  const d = Math.abs(GM.x-B.x), r = Math.random(); let a;
  if (d < 180) a = r < .55 ? 'slap' : r < .85 ? 'slam' : 'throw';
  else a = r < .6 ? 'throw' : 'slam';
  if (B.round === 2 && B.rage && Math.random() < .28) a = 'rain';
  B.atk = a; B.st = 'wind'; B.face = Math.sign(GM.x-B.x) || -1;
  B.stT = a === 'slap' ? (B.round === 1 ? .42 : .55) : a === 'rain' ? .8 : .6;
  if (a === 'rain') toast('☄️ مطر طعمية!','weird');
}
function doAtk(){
  const a = B.atk;
  if (a === 'slap'){
    B.st = 'slap'; B.stT = .35; sweep(220,60,.25,'sawtooth',.06); shake = Math.max(shake,.12); dust(B.x+B.face*130, BG, 10);
    const dx = (GM.x-B.x)*B.face; if (dx > 0 && dx < 190 && GM.y > BG-55) hurtG(B.face);
  } else if (a === 'slam'){ B.st = 'jump'; B.vy = -720; SFX.jump(); }
  else if (a === 'throw'){
    B.st = 'throw'; B.stT = .45; SFX.jump2();
    const n = B.round === 2 && B.rage ? 3 : 2;
    for (let i=0;i<n;i++){
      const tt = .85+i*.2, sx = B.x+B.face*40, sy = BG-200, tx = clamp(GM.x+(i-(n-1)/2)*55, 15, 385), ty = BG-14;
      B.shots.push({x:sx, y:sy, vx:(tx-sx)/tt, vy:(ty-sy-450*tt*tt)/tt, r:0, e:['🧆','🪑','🛞','🧱'][Math.random()*4|0], d:i*.12});
    }
  } else if (a === 'rain'){
    for (let i=0;i<6;i++) B.rain.push({x:25+Math.random()*350, y:-60-Math.random()*160, vy:0, w:.9});
    B.st = 'idle'; B.stT = 1.6;
  }
}
function land(){
  shake = .45; SFX.bump(); sweep(90,40,.4,'sawtooth',.08); dust(B.x-30,BG,10); dust(B.x+30,BG,10);
  const sp = B.rage ? 360 : 300;
  B.waves.push({x:B.x-50, v:-sp}, {x:B.x+50, v:sp});
  if (Math.abs(GM.x-B.x) < 60 && GM.y > BG-40) hurtG(Math.sign(GM.x-B.x) || 1);
  B.st = 'tired'; B.stT = B.round === 1 ? .5 : 1.5;
  if (B.round === 2 && B.tips < 2){ B.tips++; toast('💫 تعب! اضربه دلوقتي'); }
}
function bossAI(dt){
  B.stT -= dt;
  if (B.st === 'idle'){
    const toP = Math.sign(GM.x-B.x) || -1; B.face = toP;
    const d = (GM.x - toP*110) - B.x;
    B.walk = Math.abs(d) > 6 ? Math.sign(d) : 0;
    B.x = clamp(B.x + B.walk*(B.round === 1 ? 90 : 70)*(B.rage ? 1.4 : 1)*dt, 60, 340);
    if (B.stT <= 0) pickAtk();
  } else if (B.st === 'wind'){ if (B.stT <= 0) doAtk(); }
  else if (B.st === 'slap' || B.st === 'throw'){ if (B.stT <= 0){ B.st = 'idle'; B.stT = bcd(); } }
  else if (B.st === 'tired'){ if (B.stT <= 0){ B.st = 'idle'; B.stT = bcd()*.6; } }
}
function koScene(){
  if (phase === 'ko') return;
  phase = 'ko'; lives = 0; B.st = 'slap'; B.face = Math.sign(GM.x-B.x) || -1;
  GM.fly = true; GM.vy = -950; GM.kbx = B.face*230; GM.rot = 0; GM.inv = 0;
  B.waves = []; B.shots = []; B.rain = [];
  shake = .7; SFX.hit(); setTimeout(() => sweep(1200,200,.8,'sine',.05), 150); sparkle(GM.x,GM.y-30,30);
  banner('K.O 😵','محمد مصطفى طيّر جمولة','',2200);
  setTimeout(() => story(['😵 محمد مصطفى ضرب جمولة علقة محترمة','جمولة: «كده كتير... أنا لازم أتمرن»','💪 جمولة قرر يروح الجيم ويشيل الحمولة'],
    'يلا على الجيم 🏋️', initGym), 2600);
}
function bossDown(){
  B.dead = true; phase = 'clear'; B.slow = 1.6; B.waves = []; B.shots = []; B.rain = [];
  shake = .6; SFX.win(); confettiRain(); $('#pad').classList.add('hidden');
  banner('K.O!','🏆 جمولة كسب','الوحش وقع 😂',3200);
  setTimeout(showWin, 3800);
}
function updBoss(dt){
  if (B.slow > 0){ B.slow -= dt; dt *= .3; }
  const play = phase === 'play'; if (play) B.t += dt;
  GM.inv = Math.max(0,GM.inv-dt); GM.punch = Math.max(0,GM.punch-dt); GM.pcd = Math.max(0,GM.pcd-dt);
  if (GM.fly){ GM.x += GM.kbx*dt; GM.vy += 500*dt; GM.y += GM.vy*dt; GM.rot += 14*dt; }
  else {
    GM.mv = play ? steer() : 0;
    GM.x += GM.mv*(B.round === 2 ? 240 : 200)*dt + GM.kb*dt; GM.kb *= Math.max(0, 1-5*dt);
    GM.face = GM.mv || (Math.sign(B.x-GM.x) || 1);
    GM.vy += 1900*dt; GM.y += GM.vy*dt;
    if (GM.y >= BG){ GM.y = BG; GM.vy = 0; GM.ground = true; }
    GM.x = clamp(GM.x, 18, 382);
    if (!B.dead && B.st !== 'jump' && GM.y > BG-150){
      const d = GM.x-B.x, m = 40+14*gk(), s = d >= 0 ? 1 : -1;
      if (Math.abs(d) < m){ GM.x = B.x + s*m; if (GM.x < 18 || GM.x > 382){ GM.x = clamp(GM.x,18,382); B.x = GM.x - s*m; } }
    }
  }
  B.hurt = Math.max(0, B.hurt-dt); B.shown += (B.hp-B.shown)*Math.min(1, dt*3);
  if (B.round === 1 && B.hp < 100) B.hp = Math.min(100, B.hp+dt*2);
  if (B.dead) B.fall = Math.min(1, B.fall+dt*1.6);
  else if (play) bossAI(dt);
  if (B.st === 'jump'){
    B.vy += 1900*dt; B.y += B.vy*dt; B.x = clamp(B.x + clamp(GM.x-B.x,-1,1)*120*dt, 60, 340);
    if (B.y >= BG && B.vy > 0){ B.y = BG; B.vy = 0; land(); }
  }
  for (const w of B.waves){
    w.x += w.v*dt;
    if (Math.abs(w.x-GM.x) < 18 && !GM.fly){
      if (GM.y > BG-26){ if (!w.hit){ w.hit = true; hurtG(Math.sign(w.v)); } }
      else if (!w.dodged){ w.dodged = true; if (B.round === 2){ GM.sup = Math.min(100, GM.sup+10); sparkle(GM.x,GM.y-20,6); } }
    }
  }
  B.waves = B.waves.filter(w => w.x > -40 && w.x < VW+40);
  for (const s of B.shots){
    if (s.d > 0){ s.d -= dt; continue; }
    if (s.own){
      s.x += s.vx*dt; s.vy += 300*dt; s.y += s.vy*dt; s.r += dt*12;
      if (!B.dead && Math.abs(s.x-B.x) < 55 && s.y > BG-260){
        s.dead = true; B.st = 'tired'; B.stT = 1.6; B.vy = 0; B.y = BG; B.waves = [];
        shake = .5; sparkle(B.x,BG-150,30); toast('💥 الحمولة نزلت عليه!'); hitBoss(16, B.x, BG-150);
      }
      continue;
    }
    s.vy += 900*dt; s.x += s.vx*dt; s.y += s.vy*dt; s.r += dt*8;
    if (!GM.fly && Math.hypot(s.x-GM.x, s.y-(GM.y-28*gk())) < 26*gk()){ s.dead = true; hurtG(Math.sign(s.vx) || 1); }
    if (s.y >= BG-8){ s.dead = true; dust(s.x,BG,8); SFX.bump(); }
  }
  B.shots = B.shots.filter(s => !s.dead && s.x > -60 && s.x < VW+60 && s.y < VH);
  for (const r of B.rain){
    if (r.w > 0){ r.w -= dt; continue; }
    r.vy += 1300*dt; r.y += r.vy*dt;
    if (!GM.fly && Math.abs(r.x-GM.x) < 20*gk() && r.y > GM.y-60*gk() && r.y < GM.y){ r.dead = true; hurtG(0); }
    if (r.y >= BG-6){ r.dead = true; dust(r.x,BG,6); }
  }
  B.rain = B.rain.filter(r => !r.dead);
  for (const t of B.txt){ t.y -= 45*dt; t.l -= dt*1.2; }
  B.txt = B.txt.filter(t => t.l > 0);
  if (play && B.round === 1 && B.t >= 24) koScene();
  $('#bSuper').classList.toggle('ready', GM.sup >= 100);
}
function drawArena(){
  const r2 = B.round === 2;
  sky(r2 ? '#1a0508' : '#24123d', r2 ? (B.rage ? '#b3261e' : '#7a2a3a') : '#ff8a5c');
  ctx.fillStyle = r2 ? '#ffb3a7' : '#ffe7b0'; ctx.beginPath(); ctx.arc(80,170,40,0,6.283); ctx.fill();
  skyline(220, BG-40, .8, .5);
  ctx.fillStyle = 'rgba(255,250,210,.07)';
  for (const [sx,ph] of [[30,0],[370,2]]){
    ctx.save(); ctx.translate(sx,0); ctx.rotate(Math.sin(time*.8+ph)*.35);
    ctx.beginPath(); ctx.moveTo(-10,0); ctx.lineTo(10,0); ctx.lineTo(90,BG); ctx.lineTo(-90,BG); ctx.fill(); ctx.restore();
  }
  for (let i=0;i<22;i++){
    const cx = i*19+5, by = BG-30-Math.abs(Math.sin(time*6+i*1.7))*(phase === 'clear' ? 12 : 3);
    ctx.fillStyle = i%2 ? '#20131f' : '#2b1a2a'; ctx.beginPath(); ctx.arc(cx,by,9,0,6.283); ctx.fill(); ctx.fillRect(cx-9,by,18,32);
  }
  ctx.fillStyle = '#ddd'; ctx.fillRect(4,BG-120,8,120); ctx.fillRect(388,BG-120,8,120);
  ['#e63946','#fff','#457b9d'].forEach((c,i) => { ctx.strokeStyle = c; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(8,BG-110+i*30); ctx.lineTo(392,BG-110+i*30); ctx.stroke(); });
  ctx.fillStyle = '#e9e2d6'; ctx.fillRect(0,BG,VW,26); ctx.fillStyle = '#3d2a3d'; ctx.fillRect(0,BG+26,VW,VH-BG-26);
  ctx.fillStyle = '#ffe066'; ctx.font = '22px Lalezar'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('حلبة سطح عدنان', 200, BG+62);
}
function arm(x1,y1,x2,y2,big){
  ctx.strokeStyle = '#1b1b1b'; ctx.lineWidth = 22; ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
  ctx.fillStyle = MSKIN; ctx.beginPath(); ctx.arc(x2,y2,big ? 19 : 14,0,6.283); ctx.fill();
}
function drawBossChar(){
  const x = B.x + (B.hurt > 0 ? (Math.random()-.5)*6 : 0), y = B.y, st = B.st;
  const air = clamp((BG-y)/140, 0, 1);
  ctx.fillStyle = `rgba(0,0,0,${.3-.15*air})`; ctx.beginPath(); ctx.ellipse(B.x,BG+2,62*(1-.3*air),10,0,0,6.283); ctx.fill();
  ctx.save(); ctx.translate(x,y);
  if (B.dead) ctx.rotate(-B.face*B.fall*1.45);
  if (B.rage && !B.dead){
    const g = ctx.createRadialGradient(0,-130,20,0,-130,170); g.addColorStop(0,'rgba(255,40,40,.4)'); g.addColorStop(1,'rgba(255,40,40,0)');
    ctx.fillStyle = g; ctx.fillRect(-180,-310,360,320);
  }
  ctx.save(); ctx.scale(-B.face,1);
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const wk = st === 'idle' ? Math.sin(time*8)*B.walk : 0, br = Math.sin(time*2.5)*2;
  const up = st === 'jump' || (st === 'wind' && (B.atk === 'slam' || B.atk === 'rain'));
  arm(48,-158+br, up ? 40 : 60, up ? -250 : -82+br);
  ctx.strokeStyle = '#2b3a55'; ctx.lineWidth = 20; ctx.beginPath();
  ctx.moveTo(-18,-78); ctx.lineTo(-20+wk*10,-8); ctx.moveTo(18,-78); ctx.lineTo(20-wk*10,-8); ctx.stroke();
  ctx.fillStyle = '#111';
  ctx.beginPath(); ctx.ellipse(-26+wk*10,-4,17,8,0,0,6.283); ctx.fill();
  ctx.beginPath(); ctx.ellipse(14-wk*10,-4,17,8,0,0,6.283); ctx.fill();
  ctx.fillStyle = '#161616'; ctx.beginPath(); ctx.moveTo(-58,-172+br); ctx.lineTo(58,-172+br); ctx.lineTo(46,-70); ctx.lineTo(-46,-70); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#2a2323'; ctx.beginPath(); ctx.moveTo(-20,-172+br); ctx.lineTo(20,-172+br); ctx.lineTo(15,-70); ctx.lineTo(-15,-70); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#c9c9c9'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-20,-170+br); ctx.lineTo(-15,-72); ctx.moveTo(20,-170+br); ctx.lineTo(15,-72); ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,.07)'; ctx.beginPath(); ctx.moveTo(-54,-168+br); ctx.lineTo(-30,-168+br); ctx.lineTo(-34,-74); ctx.lineTo(-44,-74); ctx.fill();
  ctx.fillStyle = '#0d0d0d';
  ctx.beginPath(); ctx.moveTo(-30,-177+br); ctx.lineTo(-8,-172+br); ctx.lineTo(-24,-148+br); ctx.fill();
  ctx.beginPath(); ctx.moveTo(30,-177+br); ctx.lineTo(8,-172+br); ctx.lineTo(24,-148+br); ctx.fill();
  ctx.fillStyle = MSKIN; ctx.fillRect(-11,-192+br,22,22);
  let hx = -62, hy = -84+br;
  if (st === 'wind' && B.atk === 'slap'){ hx = -10; hy = -140; }
  if (st === 'slap'){ hx = -168; hy = -28; }
  if (st === 'wind' && B.atk === 'throw'){ hx = 10; hy = -250; }
  if (st === 'throw'){ hx = -95; hy = -190; }
  if (up){ hx = -40; hy = -250; }
  if (st === 'tired'){ hx = -56; hy = -70; }
  arm(-48,-158+br,hx,hy, st === 'slap');
  ctx.restore();
  const hy0 = -214 + Math.sin(time*2.5)*2 + (st === 'tired' ? Math.sin(time*6)*4 : 0);
  ctx.fillStyle = '#e63946';
  for (const s of [-1,1]){ ctx.beginPath(); ctx.moveTo(s*12,hy0-34); ctx.lineTo(s*38,hy0-66); ctx.lineTo(s*30,hy0-26); ctx.fill(); }
  mosHead(ctx,0,hy0,40);
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  if (st === 'wind' && !B.dead){ ctx.font = `34px ${EMOJI}`; ctx.fillText('❗',0,hy0-82+Math.sin(time*30)*3); }
  if (st === 'tired' || B.dead){ ctx.save(); ctx.translate(0,hy0-62); ctx.rotate(time*4); ctx.font = `26px ${EMOJI}`; ctx.fillText('💫',0,0); ctx.restore(); }
  if (B.rage && !B.dead){ ctx.font = `20px ${EMOJI}`; ctx.fillText('💢',34,hy0-34); }
  ctx.restore();
  if (!B.dead) nameTag('محمد مصطفى 👹', B.x, B.y-296);
}
function drawGM(){
  if (GM.inv > 0 && !GM.fly && Math.floor(time*14)%2) return;
  const k = gk();
  ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.beginPath(); ctx.ellipse(GM.x,BG+1,14*k,4,0,0,6.283); ctx.fill();
  ctx.save(); ctx.translate(GM.x,GM.y);
  if (GM.fly){ ctx.translate(0,-30); ctx.rotate(GM.rot); ctx.translate(0,30); }
  ctx.scale(k,k);
  if (B.round === 2){ ctx.fillStyle = `rgba(255,209,102,${.25+.12*Math.sin(time*10)})`; ctx.beginPath(); ctx.ellipse(0,-30,28,42,0,0,6.283); ctx.fill(); }
  drawDude(ctx,0,0,time,{v:variant, gamal:true, run:GM.ground && GM.mv !== 0 && !GM.fly, dir:GM.face});
  if (GM.punch > 0){ ctx.font = `20px ${EMOJI}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(GM.face > 0 ? '🤜' : '🤛', GM.face*(22+(1-GM.punch/.18)*12), -26); }
  ctx.restore();
  if (!GM.fly) nameTag('جمولة', GM.x, GM.y-82*k);
}
function drawBossBar(){
  const x0 = 24, y0 = 96, w = 352;
  ctx.fillStyle = 'rgba(0,0,0,.55)'; rr(ctx,x0-4,y0-4,w+8,22,10); ctx.fill();
  if (B.shown > 1){ ctx.fillStyle = '#fff'; rr(ctx,x0,y0,Math.max(14,w*B.shown/100),14,7); ctx.fill(); }
  if (B.hp > 0){ const g = ctx.createLinearGradient(x0,0,x0+w,0); g.addColorStop(0,'#ff4d4d'); g.addColorStop(1,'#b3001b');
    ctx.fillStyle = g; rr(ctx,x0,y0,Math.max(14,w*B.hp/100),14,7); ctx.fill(); }
  ctx.font = '18px Lalezar'; ctx.textBaseline = 'middle'; ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.fillStyle = '#fff';
  ctx.textAlign = 'right'; ctx.strokeText('😈 محمد مصطفى', x0+w, y0-14); ctx.fillText('😈 محمد مصطفى', x0+w, y0-14);
  const hpT = B.round === 1 ? 'القوة: ∞' : `${Math.ceil(B.hp)}%`;
  ctx.textAlign = 'left'; ctx.strokeText(hpT, x0, y0-14); ctx.fillText(hpT, x0, y0-14);
  if (B.round === 2){
    ctx.fillStyle = 'rgba(0,0,0,.5)'; rr(ctx,x0,y0+26,170,12,6); ctx.fill();
    ctx.fillStyle = GM.sup >= 100 ? (Math.floor(time*8)%2 ? '#fff' : '#ffd166') : '#ffd166';
    if (GM.sup > 4){ rr(ctx,x0,y0+26,170*GM.sup/100,12,6); ctx.fill(); }
    ctx.font = '14px Lalezar'; ctx.fillStyle = '#fff'; ctx.textAlign = 'left'; ctx.fillText('⚡ ضربة الحمولة', x0+178, y0+33);
  }
}
function drawBoss(){
  drawArena();
  for (const w of B.waves){
    ctx.fillStyle = 'rgba(255,140,40,.9)'; ctx.beginPath(); ctx.moveTo(w.x-16,BG); ctx.quadraticCurveTo(w.x,BG-46,w.x+16,BG); ctx.fill();
    ctx.fillStyle = 'rgba(255,230,150,.9)'; ctx.beginPath(); ctx.moveTo(w.x-8,BG); ctx.quadraticCurveTo(w.x,BG-24,w.x+8,BG); ctx.fill();
  }
  for (const r of B.rain){ ctx.fillStyle = `rgba(230,57,70,${.35+.25*Math.sin(time*20)})`; ctx.beginPath(); ctx.ellipse(r.x,BG+2,20,5,0,0,6.283); ctx.fill(); }
  if (!B.dead || B.fall < 1 || true) drawBossChar();
  drawGM();
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  for (const s of B.shots){ if (s.d > 0) continue; ctx.save(); ctx.translate(s.x,s.y); ctx.rotate(s.r); ctx.font = `${s.own ? 44 : 30}px ${EMOJI}`; ctx.fillText(s.e,0,0); ctx.restore(); }
  for (const r of B.rain){ if (r.w > 0) continue; ctx.font = `30px ${EMOJI}`; ctx.fillText('🧆', r.x, r.y); }
  ctx.font = '24px Lalezar'; ctx.lineWidth = 4;
  for (const t of B.txt){ ctx.globalAlpha = clamp(t.l,0,1); ctx.strokeStyle = '#7a0010'; ctx.fillStyle = '#ffe066'; ctx.strokeText(t.s,t.x,t.y); ctx.fillText(t.s,t.x,t.y); }
  ctx.globalAlpha = 1;
  drawBossBar();
}

/* =========================================================
   المرحلة 6: الجمولة بيشيل الحمولة (الجيم)
   ========================================================= */
const REPS = [
  {kg:20,  g:.5,  pw:.2,  n:'تسخين 😎'},
  {kg:40,  g:.7,  pw:.2,  n:'بدأنا نسخن 🔥'},
  {kg:60,  g:.9,  pw:.2,  n:'تقيلة شوية 😬'},
  {kg:80,  g:1.1, pw:.2,  n:'الدنيا بتلف 😵‍💫'},
  {kg:150, g:1.3, pw:.21, n:'الحمولة 🧆', big:true}
];
const GY = {};
function gyReset(){
  Object.assign(GY, {L:0, vL:0, a:0, aV:0, hold:0, t:12, drop:0});
  if (REPS[GY.rep] && REPS[GY.rep].big) toast('🧆 دي الحمولة الحقيقية!','weird');
}
function initGym(){
  scene = 'gym'; flashFade(); parts = []; endChaos(); lives = 3; coinsAtStart = coins;
  $('#pad').classList.add('hidden'); $('#hud').classList.remove('hidden');
  Object.assign(GY, {rep:0, n:0, nT:0, nTarget:0, flex:0, wait:0, fl:0, fr:0});
  gyReset();
  intro('المرحلة 6','جمولة في الجيم 🏋️','دوس بسرعة بالصباعين • شمال يرفع الناحية الشمال ويمين يرفع اليمين • خلي البار فوق الخط ثانية');
}
function gymTap(side){
  if (scene !== 'gym' || phase !== 'play' || GY.wait > 0) return;
  GY.vL += REPS[GY.rep].pw; GY.aV += -side*.32;
  if (side < 0) GY.fl = 1; else GY.fr = 1;
  sweep(140+Math.random()*60, 90, .05, 'square', .012);
}
addEventListener('keydown', e => {
  if (scene !== 'gym' || e.repeat) return;
  if (e.key === 'ArrowLeft' || e.key === 'a') gymTap(-1);
  if (e.key === 'ArrowRight' || e.key === 'd') gymTap(1);
});
function gyFail(msg){
  lives--; falls++; GY.drop = 1; GY.L = 0; GY.vL = 0; shake = .4; SFX.hit(); dust(120,560,10); dust(280,560,10);
  toast(msg); GY.wait = 1.1; if (lives <= 0) gameOver();
}
function gyRep(){
  GY.rep++; GY.flex = 1.3; GY.wait = 1.4; GY.L = 1; GY.vL = 0; SFX.win(); sparkle(200,400,24);
  toast(['💪 وحش يا جمولة','🔥 الحمولة اتشالت','😤 كمان واحدة','🦍 جمولة بقى غوريلا','🏆 شال الحمولة كلها!'][GY.rep-1]);
  if (GY.rep >= 5){ phase = 'clear'; confettiRain(); banner('💪💪💪','جمولة بقى وحش','',2400); setTimeout(showVideo, 2700); }
}
function updGym(dt){
  GY.fl = Math.max(0, GY.fl-dt*4); GY.fr = Math.max(0, GY.fr-dt*4); GY.flex = Math.max(0, GY.flex-dt); GY.drop = Math.max(0, GY.drop-dt*1.2);
  if (phase !== 'play') return;
  if (GY.wait > 0){ GY.wait -= dt; if (GY.wait <= 0) gyReset(); return; }
  const r = REPS[GY.rep];
  GY.t -= dt;
  GY.vL -= r.g*dt; GY.vL *= Math.max(0, 1-1.2*dt); GY.L += GY.vL*dt;
  if (GY.L <= 0){ GY.L = 0; if (GY.vL < 0) GY.vL = 0; }
  if (GY.L >= 1){ GY.L = 1; if (GY.vL > 0) GY.vL = 0; }
  GY.nT -= dt; if (GY.nT <= 0){ GY.nT = .5+Math.random()*.7; GY.nTarget = (Math.random()-.5)*(.5+GY.rep*.22); }
  GY.n += (GY.nTarget-GY.n)*Math.min(1, dt*3);
  const lifted = GY.L > .05 ? 1 : .2;
  GY.aV += (GY.n + GY.a*1.4)*lifted*dt; GY.aV *= Math.max(0, 1-2*dt); GY.a += GY.aV*dt;
  if (GY.L < .05) GY.a *= Math.max(0, 1-3*dt);
  if (Math.abs(GY.a) > .5) return gyFail('🫠 البار مال ووقع');
  if (GY.t <= 0) return gyFail('😮‍💨 الوقت خلص');
  if (GY.L >= .8){ GY.hold += dt; if (GY.hold >= 1) gyRep(); } else GY.hold = Math.max(0, GY.hold-dt*.6);
  if (GY.L > .5 && Math.random() < dt*3) parts.push({k:'w', x:200+(Math.random()-.5)*30, y:465, vx:(Math.random()-.5)*120, vy:-80-Math.random()*60, life:1, dc:1.5, s:2, c:'#8ecae6'});
}
function drawLifter(L){
  const r = REPS[Math.min(GY.rep,4)];
  const strain = phase === 'play' && GY.wait <= 0 ? clamp(L*.6+GY.rep*.1, 0, 1) : 0;
  const jit = strain > .3 ? (Math.random()-.5)*strain*2.5 : 0;
  ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.beginPath(); ctx.ellipse(200,562,70,8,0,0,6.283); ctx.fill();
  ctx.save(); ctx.translate(200+jit, 560); ctx.scale(2.1,2.1);
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const sq = clamp(1-L*1.5, 0, 1)*7, hip = -14+sq, ty = hip-17;
  ctx.strokeStyle = SKIN; ctx.lineWidth = 4.2; ctx.beginPath();
  ctx.moveTo(-4,hip); ctx.lineTo(-7-sq*.7,-6); ctx.lineTo(-6,-1); ctx.moveTo(4,hip); ctx.lineTo(7+sq*.7,-6); ctx.lineTo(6,-1); ctx.stroke();
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(-7,0,4.4,2.4,0,0,6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(7,0,4.4,2.4,0,0,6.283); ctx.fill();
  ctx.fillStyle = '#1f2a44'; rr(ctx,-9.5,hip-3,19,8,2); ctx.fill();
  ctx.fillStyle = '#ff7a1a'; ctx.beginPath(); ctx.moveTo(-7,ty); ctx.lineTo(7,ty); ctx.lineTo(9,hip); ctx.lineTo(-9,hip); ctx.closePath(); ctx.fill();
  ctx.fillStyle = SKIN; ctx.fillRect(-9,ty,2.5,6); ctx.fillRect(6.5,ty,2.5,6);
  ctx.fillStyle = '#fff'; ctx.font = 'bold 3.6px Tajawal'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('جمولة',0,ty+8);
  const hy = ty-13;
  gamHead(ctx,0,hy,15);
  if (strain > 0){ ctx.fillStyle = `rgba(230,40,40,${strain*.4})`; ctx.beginPath(); ctx.arc(0,hy,15,0,6.283); ctx.fill(); }
  if (variant === 0){ ctx.fillStyle = '#111'; rr(ctx,-10,hy-4,9,5,2); ctx.fill(); rr(ctx,1,hy-4,9,5,2); ctx.fill(); ctx.fillRect(-2,hy-2.5,4,1.3); }
  ctx.font = `7px ${EMOJI}`;
  if (variant === 2 && strain < .3) ctx.fillText('💤',14,hy-13);
  if (strain > .55 || variant === 1) ctx.fillText('💢',13,hy-12);
  if (GY.drop > 0){ ctx.font = `9px ${EMOJI}`; ctx.fillText('😵',0,hy-22); }
  if (GY.flex > 0){ ctx.font = `10px ${EMOJI}`; ctx.fillText('💪',-22,hy-4+Math.sin(time*12)*2); ctx.fillText('💪',22,hy-4-Math.sin(time*12)*2); }
  const by = -5*(1-L) + (ty-32)*L, a = GY.a;
  ctx.strokeStyle = SKIN; ctx.lineWidth = 3.4; ctx.beginPath();
  ctx.moveTo(-7,ty+2); ctx.quadraticCurveTo(-15,(ty+by)/2,-12,by-12*Math.sin(a));
  ctx.moveTo(7,ty+2); ctx.quadraticCurveTo(15,(ty+by)/2,12,by+12*Math.sin(a)); ctx.stroke();
  ctx.save(); ctx.translate(0,by); ctx.rotate(a);
  ctx.strokeStyle = '#cfd4da'; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(-37,0); ctx.lineTo(37,0); ctx.stroke();
  if (r.big){ ctx.font = `17px ${EMOJI}`; ctx.fillText('🧆',-30,0); ctx.fillText('🧆',30,0); ctx.fillStyle = '#ffe066'; ctx.font = '5px Lalezar'; ctx.fillText('الحمولة',0,-6); }
  else {
    const ph = 7+r.kg/10, col = {20:'#2a9d8f',40:'#457b9d',60:'#e9c46a',80:'#e63946'}[r.kg];
    for (const s of [-1,1]){ ctx.fillStyle = col; rr(ctx,s*28-2.5,-ph/2,5,ph,1.2); ctx.fill(); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(s*32-1,-ph/2+1,2,ph-2); }
  }
  ctx.restore(); ctx.restore();
}
function drawGym(){
  let g = ctx.createLinearGradient(0,0,0,560); g.addColorStop(0,'#2b2d42'); g.addColorStop(1,'#1b1c2b'); ctx.fillStyle = g; ctx.fillRect(0,0,VW,560);
  ctx.shadowColor = '#ff7a1a'; ctx.shadowBlur = 20; ctx.fillStyle = '#ff7a1a'; ctx.fillRect(0,232,VW,4); ctx.shadowBlur = 0;
  ctx.fillStyle = '#ffe066'; rr(ctx,14,262,104,58,10); ctx.fill();
  ctx.fillStyle = '#3a2414'; ctx.font = '15px Lalezar'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('مفيش ألم',66,282); ctx.fillText('من غير طعمية 🧆',66,302);
  ctx.strokeStyle = '#555'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(52,236); ctx.lineTo(52,350); ctx.stroke();
  ctx.fillStyle = '#b3202a'; rr(ctx,36,350,32,100,12); ctx.fill();
  ctx.fillStyle = '#3a3a48'; ctx.fillRect(310,420,80,140);
  for (let i=0;i<4;i++){ const y = 440+i*30; ctx.fillStyle = '#888'; ctx.fillRect(322,y,56,4); ctx.fillStyle = '#222'; ctx.fillRect(316,y-6,10,16); ctx.fillRect(374,y-6,10,16); }
  ctx.fillStyle = '#151515'; ctx.fillRect(0,560,VW,VH-560);
  ctx.fillStyle = '#8b5a2b'; ctx.fillRect(90,556,220,10);
  ctx.strokeStyle = 'rgba(255,255,255,.05)'; for (let x=0;x<VW;x+=50){ ctx.beginPath(); ctx.moveTo(x,566); ctx.lineTo(x,VH); ctx.stroke(); }
  if (GY.fl){ ctx.fillStyle = `rgba(255,209,102,${GY.fl*.15})`; ctx.fillRect(0,0,200,VH); }
  if (GY.fr){ ctx.fillStyle = `rgba(255,209,102,${GY.fr*.15})`; ctx.fillRect(200,0,200,VH); }
  drawLifter(GY.L);
  const r = REPS[Math.min(GY.rep,4)];
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineWidth = 5; ctx.strokeStyle = '#b34700';
  ctx.font = '34px Lalezar'; ctx.fillStyle = '#fff';
  const t1 = `العدّة ${Math.min(GY.rep+1,5)}/5`; ctx.strokeText(t1,200,128); ctx.fillText(t1,200,128);
  ctx.font = '20px Lalezar'; ctx.fillStyle = '#ffd166'; ctx.fillText(`${r.kg} كجم • ${r.n}`,200,160);
  ctx.fillStyle = 'rgba(255,255,255,.2)'; rr(ctx,70,180,260,8,4); ctx.fill();
  if (GY.t > 0){ ctx.fillStyle = GY.t < 4 ? '#e63946' : '#4ade80'; rr(ctx,70,180,Math.max(8,260*GY.t/12),8,4); ctx.fill(); }
  const mx = 200, my = 210;
  ctx.fillStyle = 'rgba(255,255,255,.85)'; rr(ctx,mx-120,my-9,240,18,9); ctx.fill();
  ctx.fillStyle = 'rgba(230,57,70,.6)'; ctx.fillRect(mx-116,my-5,34,10); ctx.fillRect(mx+82,my-5,34,10);
  ctx.fillStyle = 'rgba(74,222,128,.6)'; ctx.fillRect(mx-36,my-5,72,10);
  ctx.fillStyle = '#3a2414'; ctx.fillRect(mx+clamp(GY.a/.5,-1,1)*114-2.5, my-13, 5, 26);
  const x0 = 376, top = 250, bot = 540, h = bot-top;
  ctx.fillStyle = 'rgba(255,255,255,.15)'; rr(ctx,x0-9,top,18,h,9); ctx.fill();
  ctx.fillStyle = 'rgba(74,222,128,.45)'; ctx.fillRect(x0-9,top,18,h*.2);
  ctx.fillStyle = '#ffd166'; rr(ctx,x0-6,bot-h*GY.L,12,Math.max(6,h*GY.L),6); ctx.fill();
  ctx.strokeStyle = '#4ade80'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x0,top-22,14,-Math.PI/2,-Math.PI/2+6.283*clamp(GY.hold,0,1)); ctx.stroke();
  ctx.font = `14px ${EMOJI}`; ctx.fillText('🏁',x0,top-22);
  ctx.globalAlpha = .55+.25*Math.sin(time*6); ctx.fillStyle = '#fff'; ctx.font = '20px Lalezar';
  ctx.fillText('👆 دوس شمال',100,630); ctx.fillText('دوس يمين 👆',300,630); ctx.globalAlpha = 1;
}

/* ---------- فيديو الجيم (متعدّل) ---------- */
const CAPS = [[0,'الجمولة في الجيم 🔥'],[.28,'شايل الحمولة 💪'],[.55,'مفيش حاجة اسمها مستحيل 😤'],[.8,'⚡ LEVEL UP ⚡']];
let vidBad = false, vidDone = false, capI = -1;
const gv = $('#gv');
gv.addEventListener('error', () => { vidBad = true; });
gv.addEventListener('ended', () => afterVideo());
function showVideo(){
  phase = 'video'; $('#hud').classList.add('hidden');
  if (vidBad) return afterVideo();
  $('#cap').textContent = ''; $('#vbar').style.width = 0; $('#vPlay').style.display = '';
  show('#vid');
}
$('#vPlay').onclick = () => {
  $('#vPlay').style.display = 'none';
  song.pause(); if (master) master.gain.setTargetAtTime(0, AC.currentTime, .05);
  gv.currentTime = 0; gv.muted = muted; gv.playbackRate = .6; capI = -1;
  $('#vid').classList.add('playing');
  gv.play().catch(() => { gv.muted = true; gv.play().catch(afterVideo); });
};
$('#vSkip').onclick = () => afterVideo();
function vidTick(){
  if (!gv.duration || gv.paused) return;
  const p = gv.currentTime/gv.duration;
  $('#vbar').style.width = p*100+'%';
  const rate = gv.currentTime < 1.4 ? .6 : (p > .78 && p < .86) ? .45 : 1;
  if (Math.abs(gv.playbackRate-rate) > .01) gv.playbackRate = rate;
  let i = -1; CAPS.forEach((c,j) => { if (p >= c[0]) i = j; });
  if (i !== capI && i >= 0){
    capI = i; const el = $('#cap'); el.textContent = CAPS[i][1];
    el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop');
    $('#vflash').animate([{opacity:.85},{opacity:0}], {duration:450});
    document.querySelector('.vwrap').animate([{transform:'scale(1.05) rotate(-1deg)'},{transform:'none'}], {duration:350});
  }
}
function afterVideo(){
  if (vidDone) return; vidDone = true;
  gv.pause(); hide('#vid'); $('#vid').classList.remove('playing');
  if (!muted){ if (master) master.gain.setTargetAtTime(.8, AC.currentTime, .05); if (!music) song.play().catch(()=>{}); }
  flashFade(); $('#hud').classList.remove('hidden');
  story(['⚡ جمولة اتحوّل بعد التمرين','قوة جمولة: 99999 💪','دلوقتي... الحساب يا محمد مصطفى 😤'], 'يلا الراوند التاني 🥊', () => vs(2, () => initBoss(2)));
}

/* ---------- الانتصار + الشهادة ---------- */
function drawCert(){
  const cv2 = $('#cert'), c = cv2.getContext('2d'), w = 1000, h = 700;
  const g = c.createRadialGradient(500,350,100,500,350,650); g.addColorStop(0,'#fffdf5'); g.addColorStop(1,'#f3e2b8');
  c.fillStyle = g; c.fillRect(0,0,w,h);
  c.fillStyle = 'rgba(201,162,39,.08)'; for (let y=80;y<h-60;y+=28) for (let x=80;x<w-60;x+=28){ c.beginPath(); c.arc(x,y,2,0,6.283); c.fill(); }
  c.strokeStyle = '#b8860b'; c.lineWidth = 14; c.strokeRect(22,22,w-44,h-44);
  c.strokeStyle = '#e0b84a'; c.lineWidth = 3; c.strokeRect(46,46,w-92,h-92);
  c.setLineDash([2,10]); c.strokeRect(60,60,w-120,h-120); c.setLineDash([]);
  c.textAlign = 'center'; c.textBaseline = 'middle';
  for (const [x,y] of [[46,46],[w-46,46],[46,h-46],[w-46,h-46]]){ c.fillStyle = '#b8860b'; c.beginPath(); c.arc(x,y,22,0,6.283); c.fill(); c.font = `22px ${EMOJI}`; c.fillText('⭐',x,y+1); }
  c.fillStyle = '#8a5a00'; c.font = `64px Lalezar, ${EMOJI}`; c.fillText('🏆 شهادة تقدير 🏆',500,108);
  c.strokeStyle = '#c9a227'; c.lineWidth = 2; c.beginPath(); c.moveTo(330,148); c.lineTo(670,148); c.stroke();
  if (faceOK) photo(c,faceImg,FACE,500,226,66,'#c9a227'); else { c.font = `100px ${EMOJI}`; c.fillText('🥇',500,226); }
  c.fillStyle = '#555'; c.font = 'bold 26px Tajawal'; c.fillText('تُمنح هذه الشهادة للبطل',500,322);
  c.fillStyle = '#ff7a1a'; c.font = '62px Lalezar'; c.fillText('جمال (جمولة)',500,378);
  c.fillStyle = '#444'; c.font = 'bold 22px Tajawal'; c.fillText('لإنهائه مغامرة جمولة كلها وهزيمة الوحش العملاق محمد مصطفى بالضربة القاضية',500,428);
  c.fillStyle = '#d62828'; c.font = `60px Lalezar, ${EMOJI}`; c.fillText('الف مبروووووك يا جمولة 🎉',500,500);
  c.fillStyle = '#2a9d8f'; c.font = `42px Lalezar, ${EMOJI}`; c.fillText('مع تحيات بابا و ماما ❤️',500,566);
  c.fillStyle = '#7a6a50'; c.font = `bold 18px Tajawal, ${EMOJI}`;
  c.fillText(`🪙 ${coins}  •  🧆 ${taameya}  •  ☕ 5/5  •  💥 ${falls}  •  💦 ${spills}`,500,616);
  c.fillStyle = '#c9a227'; c.beginPath();
  for (let i=0;i<32;i++){ const a = i/32*6.283, rad = i%2 ? 50 : 58; c.lineTo(150+Math.cos(a)*rad, 565+Math.sin(a)*rad); } c.fill();
  c.fillStyle = '#e8c547'; c.beginPath(); c.arc(150,565,42,0,6.283); c.fill();
  c.font = `34px ${EMOJI}`; c.fillText('🏅',150,553); c.fillStyle = '#7a4a00'; c.font = '18px Lalezar'; c.fillText('بطل',150,588);
  c.fillStyle = '#7a6a50'; c.font = 'bold 18px Tajawal'; c.fillText(new Date().toLocaleDateString('ar-EG'),850,552);
  c.strokeStyle = '#7a6a50'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(770,572); c.lineTo(930,572); c.stroke();
  c.fillText('التاريخ',850,592);
}
function showWin(){
  phase = 'end'; $('#pad').classList.add('hidden'); $('#hud').classList.add('hidden');
  drawCert(); (document.fonts ? document.fonts.ready : Promise.resolve()).then(drawCert);
  show('#win'); SFX.win(); setTimeout(SFX.win, 600); setTimeout(confettiRain, 300);
}
$('#dlCert').onclick = () => {
  try { const a = document.createElement('a'); a.href = $('#cert').toDataURL('image/png'); a.download = 'شهادة-جمولة.png'; document.body.appendChild(a); a.click(); a.remove(); }
  catch(e){ toast('📸 خد سكرين شوت للشهادة'); }
};
$('#againAll').onclick = () => location.reload();

/* ---------- أزرار الخناقة ---------- */
document.querySelectorAll('#pad [data-k]').forEach(b => {
  const k = b.dataset.k;
  b.addEventListener('pointerdown', e => { e.preventDefault(); initAudio(); keys[k] = true; b.classList.add('on'); });
  ['pointerup','pointercancel','pointerleave'].forEach(t => b.addEventListener(t, () => { keys[k] = false; b.classList.remove('on'); }));
});
$('#bJump').addEventListener('pointerdown', e => { e.preventDefault(); gJump(); });
$('#bHit').addEventListener('pointerdown', e => { e.preventDefault(); gPunch(); });
$('#bSuper').addEventListener('pointerdown', e => { e.preventDefault(); gSuper(); });
addEventListener('keydown', e => {
  if (scene !== 'boss' || e.repeat) return;
  if ('fjx'.includes(e.key)) gPunch();
  if ('gkz'.includes(e.key)) gSuper();
});

/* =========================================================
   ربط المراحل الجديدة باللعبة الأصلية
   ========================================================= */
const NEW = {
  room: {upd:updRoom, draw:drawRoom, tap:null, retry:initRoom,
    hud:() => ({pr:RM.done/RM.total, me:'🧹', goal:'✨', sc:`⏱️ ${Math.ceil(Math.max(0,RM.t))}`})},
  boss: {upd:updBoss, draw:drawBoss, tap:gJump, retry:() => initBoss(2),
    hud:() => ({pr:1-B.hp/100, me:'👊', goal:'😈', sc:B.round === 2 ? `⚡ ${Math.floor(GM.sup)}%` : '😬'})},
  gym:  {upd:updGym, draw:drawGym, tap:() => gymTap(tapX < VW/2 ? -1 : 1), retry:initGym,
    hud:() => ({pr:(Math.min(GY.rep,5)+(GY.rep < 5 ? clamp(GY.hold,0,1) : 0))/5, me:'🏋️', goal:'💪', sc:`${REPS[Math.min(GY.rep,4)].kg} كجم`})}
};
const _update = update, _draw = draw, _onTap = onTap, _hud = updHUD, _initRoof = initRoof, _initWalk = initWalk;
initRoof = function(){ _initRoof(); $('#bSub').textContent = 'المرحلة 3'; };
initWalk = function(){ _initWalk(); $('#bSub').textContent = 'المرحلة 3'; };
showEnd = function(){ initRoom(); };
update = function(dt){
  if (!NEW[scene]) return _update(dt);
  time += dt; shake = Math.max(0, shake-dt);
  NEW[scene].upd(dt); updParts(dt); updHUD();
  if (phase === 'video') vidTick();
};
draw = function(){
  if (!NEW[scene]) return _draw();
  ctx.setTransform(DPR,0,0,DPR,0,0); ctx.fillStyle = '#1b1020'; ctx.fillRect(0,0,W,H);
  const sx = shake ? (Math.random()-.5)*12*shake/.35 : 0, sy = shake ? (Math.random()-.5)*12*shake/.35 : 0;
  ctx.setTransform(DPR*S,0,0,DPR*S,DPR*(OX+sx*S),DPR*(OY+sy*S));
  ctx.save(); ctx.beginPath(); ctx.rect(0,0,VW,VH); ctx.clip();
  NEW[scene].draw(); drawParts(); ctx.restore();
};
onTap = function(){
  if (scene === 'warn' && LVL && '4567'.includes(LVL)){
    $('#warn').classList.remove('show'); $('#hud').classList.remove('hidden');
    ({4:initRoom, 5:() => vs(1, () => initBoss(1)), 6:initGym, 7:() => vs(2, () => initBoss(2))})[LVL]();
    return;
  }
  if (NEW[scene]){ if (phase === 'play' && NEW[scene].tap) NEW[scene].tap(); return; }
  _onTap();
};
updHUD = function(){
  if (!NEW[scene]) return _hud();
  const l = Math.max(0, lives); $('#lives').textContent = '💚'.repeat(l) + '🖤'.repeat(3-l);
  const h = NEW[scene].hud(), pr = clamp(h.pr, 0, 1);
  $('#fill').style.width = pr*100+'%'; $('#me').style.left = pr*100+'%';
  $('#me').textContent = h.me; $('#goal').textContent = h.goal; $('#score').textContent = h.sc;
};
$('#retry').onclick = () => {
  $('#over').classList.remove('show'); coins = coinsAtStart;
  if (NEW[scene]) NEW[scene].retry();
  else if (scene === 'run') initRun(); else if (scene === 'drive') initDrive(); else initWalk();
};

})();