(() => {
'use strict';

const LESSONS = [
  { id:1, name:'Урок 1: Базовый ряд (ФЫВА)', desc:'Левая рука: Ф, Ы, В, А', keys:['ф','ы','в','а'] },
  { id:2, name:'Урок 2: Базовый ряд (ОЛДЖ)', desc:'Правая рука: О, Л, Д, Ж', keys:['о','л','д','ж'] },
  { id:3, name:'Урок 3: Базовый ряд (полный)', desc:'Обе руки: ФЫВА + ОЛДЖ', keys:['ф','ы','в','а','о','л','д','ж'] },
  { id:4, name:'Урок 4: Верхний ряд (ЙЦУК)', desc:'Левая рука: Й, Ц, У, К', keys:['й','ц','у','к'] },
  { id:5, name:'Урок 5: Верхний ряд (ЕНГШ)', desc:'Правая рука: Е, Н, Г, Ш', keys:['е','н','г','ш'] },
  { id:6, name:'Урок 6: Верхний ряд (полный)', desc:'Обе руки: ЙЦУК + ЕНГШ', keys:['й','ц','у','к','е','н','г','ш'] },
  { id:7, name:'Урок 7: Нижний ряд (ЯЧСМ)', desc:'Левая рука: Я, Ч, С, М', keys:['я','ч','с','м'] },
  { id:8, name:'Урок 8: Нижний ряд (ИТЬБ)', desc:'Правая рука: И, Т, Ь, Б', keys:['и','т','ь','б'] },
  { id:9, name:'Урок 9: Нижний ряд (полный)', desc:'Обе руки: ЯЧСМ + ИТЬБ', keys:['я','ч','с','м','и','т','ь','б'] },
  { id:10, name:'Урок 10: Все ряды', desc:'Все буквы трёх рядов', keys:'фываолджйцукенгшячсмитьб'.split('') },
  { id:11, name:'Урок 11: Цифры', desc:'Цифры 0–9', keys:'1234567890'.split('') },
  { id:12, name:'Урок 12: Простые слова', desc:'Практика на простых словах', words:['мама','папа','дом','сад','кот','книга','стол','стул','окно','дверь','комната','кухня','пол','стена','двор','дерево','цветок','трава','небо','река'] },
  { id:13, name:'Урок 13: Предложения', desc:'Слова в предложениях', words:['мама','мыла','раму','папа','читал','книгу','кот','спал','на','стуле','дети','играли','во','дворе','солнце','светило','ярко','птицы','пели','в','саду','книга','лежала','на','столе','вода','текла','реке'] },
  { id:14, name:'Урок 14: Связный текст', desc:'Практика на связном тексте', words:['в','саду','растут','яблони','груши','дети','играют','на','траве','солнце','светит','ярко','птицы','поют','красивые','песни','мама','готовит','обед','на','кухне','папа','читает','газету','гостиной','бабушка','вяжет','шарф','дедушка','поливает','цветы'] },
  { id:15, name:'Урок 15: Сложный текст', desc:'IT-лексика и длинные слова', words:['программирование','искусство','создания','программ','разработчики','пишут','код','на','разных','языках','каждый','язык','имеет','свои','особенности','современные','технологии','позволяют','создавать','сложные','приложения','алгоритмы','помогают','решать','задачи','базы','данных','хранят','информацию','сети','соединяют','компьютеры'] },
];

const KB_LAYOUT = [
  { keys:['й','ц','у','к','е','н','г','ш','щ','з','х','ъ'], offset:0 },
  { keys:['ф','ы','в','а','п','р','о','л','д','ж','э'], offset:0.5 },
  { keys:['я','ч','с','м','и','т','ь','б','ю','.'], offset:1.5 }
];

let state = { lesson:null, text:'', typed:'', idx:0, errors:0, startTime:null, active:false, history:[], progress:{} };

function $(sel){ return document.querySelector(sel); }
function $$(sel){ return document.querySelectorAll(sel); }

function load(){ try{ const d=JSON.parse(localStorage.getItem('skl_typing')||'{}'); state.history=d.history||[]; state.progress=d.progress||{}; }catch(e){} }
function save(){ localStorage.setItem('skl_typing',JSON.stringify({history:state.history,progress:state.progress})); }

function genText(keys, len=220){
  const words=[];let cur=0;
  while(cur<len){
    const wl=2+Math.floor(Math.random()*3);
    let w='';for(let i=0;i<wl;i++) w+=keys[Math.floor(Math.random()*keys.length)];
    if(words.length) cur++;
    words.push(w);cur+=w.length;
  }
  return words.join(' ');
}

function genSentences(wordList, len=280){
  const result=[];let cur=0,sl=0,ml=6+Math.floor(Math.random()*5),cap=true;
  while(cur<len){
    let w=wordList[Math.floor(Math.random()*wordList.length)];
    if(cap){w=w[0].toUpperCase()+w.slice(1);cap=false;}
    if(result.length)cur++;
    result.push(w);cur+=w.length;sl++;
    if(sl>=ml){result[result.length-1]+='.';cur++;cap=true;sl=0;ml=6+Math.floor(Math.random()*5);}
  }
  if(result.length&&!result[result.length-1].endsWith('.'))result[result.length-1]+='.';
  return result.join(' ');
}

function buildText(lesson){
  if(lesson.words) return genSentences(lesson.words);
  return genText(lesson.keys);
}

function renderSelect(){
  const sel=$('#lesson-select');
  LESSONS.forEach(l=>{
    const o=document.createElement('option');
    o.value=l.id;
    const done=state.progress[l.id]?.completed;
    o.textContent=(done?'✓ ':'')+l.name;
    sel.appendChild(o);
  });
}

function renderKeyboard(){
  const kb=$('#keyboard');kb.innerHTML='';
  KB_LAYOUT.forEach((row,ri)=>{
    const r=document.createElement('div');r.className='kb-row';
    if(ri===0){const t=mk('key wide','Tab');r.appendChild(t);}
    if(ri>0){const sp=document.createElement('div');sp.style.width=(row.offset*44)+'px';r.appendChild(sp);}
    row.keys.forEach(k=>{const el=mk('key','');el.textContent=k.toUpperCase();el.dataset.key=k;r.appendChild(el);});
    if(ri===0){r.appendChild(mk('key wide','⌫'));}
    if(ri===1){r.appendChild(mk('key wide','Enter'));}
    if(ri===2){r.appendChild(mk('key wide','Shift'));}
    kb.appendChild(r);
  });
  const sr=document.createElement('div');sr.className='kb-row';
  const sp=mk('key space','Пробел');sp.dataset.key=' ';sr.appendChild(sp);kb.appendChild(sr);
}
function mk(cls,txt){const d=document.createElement('div');d.className=cls;d.textContent=txt;return d;}

function renderText(){
  const container=$('#text-display');
  const placeholder=$('#typing-placeholder');
  if(!container)return;
  if(!state.lesson||!state.text.length){
    if(placeholder){placeholder.textContent='Выберите урок и нажмите «Начать»';placeholder.style.display='block';}
    container.querySelectorAll('.text-char').forEach(el=>el.remove());
    return;
  }
  placeholder.style.display='none';
  container.querySelectorAll('.text-char').forEach(el=>el.remove());
  var startIdx=Math.max(0,state.idx-20);
  var endIdx=Math.min(state.text.length,state.idx+45);
  for(var i=startIdx;i<endIdx;i++){
    var ch=state.text[i];
    var s=document.createElement('span');
    s.className='text-char';
    s.textContent=ch===' '?'\u00A0':ch;
    if(i<state.idx){s.classList.add(state.typed[i]===ch?'correct':'error');}
    else if(i===state.idx&&state.active){s.classList.add('current');}
    container.appendChild(s);
  }
  var cur=container.querySelector('.text-char.current');
  if(cur){cur.scrollIntoView({behavior:'auto',block:'nearest',inline:'nearest'});}
}

function updateProgressBar(){
  const slider=$('#progress-slider');
  if(!slider)return;
  if(!state.lesson||!state.text.length){slider.style.width='0%';return;}
  const pct=state.text.length?Math.round((state.idx/state.text.length)*100):0;
  slider.style.width=pct+'%';
}

function highlightKey(ch){
  $$('.key').forEach(k=>k.classList.remove('active','pressed','error'));
  if(!state.active||state.idx>=state.text.length)return;
  const cur=state.text[state.idx].toLowerCase();
  const el=document.querySelector(`.key[data-key="${cur}"]`);
  if(el)el.classList.add('active');
}

function flashKey(ch,ok){
  const el=document.querySelector(`.key[data-key="${ch}"]`);
  if(!el)return;
  el.classList.add(ok?'pressed':'error');
  setTimeout(()=>el.classList.remove('pressed','error'),120);
}

function updateLive(){
  if(!state.active||!state.startTime)return;
  const mins=(Date.now()-state.startTime)/60000;
  const speed=mins>0?Math.round(state.idx/mins):0;
  const acc=state.idx>0?Math.round((state.idx-state.errors)/state.idx*100):100;
  const pct=Math.round(state.idx/state.text.length*100);
  $('#ls-speed').textContent=speed;
  $('#ls-accuracy').textContent=acc;
  $('#ls-progress').textContent=pct;
}

function selectLesson(id){
  const lesson=LESSONS.find(l=>l.id===+id);
  if(!lesson){$('#typing-zone').classList.remove('has-lesson');state.lesson=null;state.text='';renderText();updateProgressBar();return;}
  state.lesson=lesson;state.text=buildText(lesson);
  state.typed='';state.idx=0;state.errors=0;state.active=false;state.startTime=null;
  $('#lesson-meta').textContent=lesson.desc;
  $('#start-btn').disabled=false;
  $('#start-btn').textContent='Начать';
  $('#reset-btn').style.display='none';
  $('#live-stats').style.display='none';
  $('#typing-zone').classList.remove('active');
  $('#typing-zone').classList.add('has-lesson');
  renderText();updateProgressBar();highlightKey();
}

function start(){
  if(!state.lesson)return;
  state.active=true;state.startTime=Date.now();state.typed='';state.idx=0;state.errors=0;
  $('#start-btn').style.display='none';
  $('#reset-btn').style.display='';
  $('#live-stats').style.display='flex';
  $('#typing-zone').classList.add('active');
  renderText();updateProgressBar();highlightKey();
  $('#hidden-input').value='';$('#hidden-input').focus();
}

function reset(){
  state.active=false;state.startTime=null;state.typed='';state.idx=0;state.errors=0;
  $('#start-btn').style.display='';$('#start-btn').disabled=false;$('#start-btn').textContent='Начать';
  $('#reset-btn').style.display='none';
  $('#live-stats').style.display='none';
  $('#typing-zone').classList.remove('active');
  state.text=buildText(state.lesson);
  renderText();updateProgressBar();highlightKey();
  $('#hidden-input').blur();
}

function complete(){
  state.active=false;
  const secs=Math.round((Date.now()-state.startTime)/1000);
  const mins=secs/60;
  const speed=Math.round(state.text.length/mins);
  const acc=Math.round((state.text.length-state.errors)/state.text.length*100);

  const result={lessonId:state.lesson.id,lessonName:state.lesson.name,speed,accuracy:acc,errors:state.errors,time:secs,date:new Date().toISOString()};
  state.history.unshift(result);
  if(state.history.length>50)state.history=state.history.slice(0,50);
  if(!state.progress[state.lesson.id]||state.progress[state.lesson.id].bestSpeed<speed){
    state.progress[state.lesson.id]={completed:true,bestSpeed:speed,bestAccuracy:acc};
  }
  save();refreshSelect();

  $('#r-speed').textContent=speed;
  $('#r-accuracy').textContent=acc+'%';
  $('#r-errors').textContent=state.errors;
  $('#r-time').textContent=secs;
  $('#result-overlay').style.display='flex';
}

function handleInput(e){
  if(!state.active||!state.lesson)return;
  const val=e.target.value;
  if(val.length>state.typed.length){
    const ch=val[val.length-1];
    const expected=state.text[state.idx];
    flashKey(ch.toLowerCase(),ch===expected);
    if(ch!==expected)state.errors++;
    state.typed=val;state.idx=val.length;
  }else{
    state.typed=val;state.idx=val.length;
  }
  renderText();updateProgressBar();highlightKey();updateLive();
  if(state.idx>=state.text.length)complete();
}

function refreshSelect(){
  const sel=$('#lesson-select');
  const cur=sel.value;
  sel.innerHTML='<option value="" disabled>Выберите урок...</option>';
  LESSONS.forEach(l=>{
    const o=document.createElement('option');o.value=l.id;
    const done=state.progress[l.id]?.completed;
    o.textContent=(done?'✓ ':'')+l.name;
    if(+cur===l.id)o.selected=true;
    sel.appendChild(o);
  });
}

function renderStats(){
  const comp=Object.keys(state.progress).filter(k=>state.progress[k].completed).length;
  const avgS=state.history.length?Math.round(state.history.reduce((a,h)=>a+h.speed,0)/state.history.length):0;
  const avgA=state.history.length?Math.round(state.history.reduce((a,h)=>a+h.accuracy,0)/state.history.length):0;
  $('#s-lessons').textContent=comp;
  $('#s-speed').textContent=avgS;
  $('#s-accuracy').textContent=avgA;

  const list=$('#history-list');
  if(!state.history.length){list.innerHTML='<p class="placeholder">Пока нет истории</p>';return;}
  list.innerHTML='';
  state.history.slice(0,20).forEach(h=>{
    const d=document.createElement('div');d.className='history-item';
    d.innerHTML=`<div><div class="history-name">${h.lessonName}</div><div class="history-date">${new Date(h.date).toLocaleString('ru-RU')}</div></div><div class="history-vals"><span><strong>${h.speed}</strong> зн/м</span><span><strong>${h.accuracy}</strong>%</span></div>`;
    list.appendChild(d);
  });
}

function init(){
  load();renderSelect();renderKeyboard();

  $('#lesson-select').addEventListener('change',e=>selectLesson(e.target.value));
  $('#start-btn').addEventListener('click',start);
  $('#reset-btn').addEventListener('click',reset);
  $('#hidden-input').addEventListener('input',handleInput);

  $('#typing-zone').addEventListener('click',()=>{if(state.active)$('#hidden-input').focus();});

  $('#stats-btn').addEventListener('click',()=>{renderStats();$('#stats-overlay').style.display='flex';});
  $('#close-stats').addEventListener('click',()=>{$('#stats-overlay').style.display='none';});
  $('#stats-overlay').addEventListener('click',e=>{if(e.target===$('#stats-overlay'))$('#stats-overlay').style.display='none';});

  $('#r-retry').addEventListener('click',()=>{$('#result-overlay').style.display='none';reset();});
  $('#r-next').addEventListener('click',()=>{
    $('#result-overlay').style.display='none';
    const nextId=state.lesson?state.lesson.id+1:1;
    const next=LESSONS.find(l=>l.id===nextId);
    if(next){$('#lesson-select').value=next.id;selectLesson(next.id);}else reset();
  });
  $('#result-overlay').addEventListener('click',e=>{if(e.target===$('#result-overlay'))$('#result-overlay').style.display='none';});

  $('#reset-all').addEventListener('click',()=>{
    if(!confirm('Сбросить весь прогресс?'))return;
    localStorage.removeItem('skl_typing');
    state.history=[];state.progress={};
    reset();selectLesson('');refreshSelect();renderStats();
    $('#lesson-select').value='';$('#start-btn').disabled=true;
    $('#lesson-meta').textContent='';
    const ph=$('#typing-placeholder');if(ph)ph.textContent='Выберите урок и нажмите «Начать»';const sl=$('#progress-slider');if(sl)sl.style.width='0%';
  });

  setInterval(()=>{if(state.active)updateLive();},1000);
}

document.addEventListener('DOMContentLoaded',init);
})();
