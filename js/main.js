// ============================================================
// main.js — portfolio Guilhem Rebéjac
// Fonctionnalités partagées par toutes les pages.
// Chaque module ne s'active que si ses éléments existent.
// ============================================================

// ---------- MENU BURGER ----------
(function(){
  const burger=document.getElementById('burger');
  const menu=document.getElementById('menu');
  if(!burger||!menu)return;
  burger.addEventListener('click',()=>menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a=>
    a.addEventListener('click',()=>menu.classList.remove('open')));
})();

// ---------- ANNÉE COURANTE (footer + compteur) ----------
(function(){
  const year=new Date().getFullYear();
  const c=document.getElementById('copyright');
  if(c)c.textContent='© '+year+' Guilhem Rebéjac';
  const r=document.getElementById('year-range');
  if(r)r.textContent='2024 — '+year;
})();

// ---------- LOADER (si chargement > 700ms) ----------
(function(){
  const loader=document.getElementById('loader');
  if(!loader)return;
  setTimeout(()=>{if(document.readyState!=='complete')loader.classList.add('show');},700);
  window.addEventListener('load',()=>loader.classList.remove('show'));
})();

// ---------- CURSEUR (PC uniquement) ----------
(function(){
  const cursor=document.getElementById('cursor');
  if(!cursor||!matchMedia('(hover:hover)').matches)return;
  let x=innerWidth/2,y=innerHeight/2,tx=x,ty=y;
  addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY;cursor.style.opacity=1;});
  (function loop(){
    x+=(tx-x)*.25;y+=(ty-y)*.25;
    cursor.style.transform='translate('+(x-7)+'px,'+(y-7)+'px)';
    requestAnimationFrame(loop);
  })();
  addEventListener('mouseover',e=>{
  cursor.classList.toggle('big',
    !!e.target.closest('a,.tile,button'));});
})();

// ---------- MARQUEE : défilement au doigt ----------
(function(){
  const marquee=document.querySelector('.marquee span');
  if(!marquee)return;
  // --- boucle parfaite : on s'assure que le contenu est doublé à l'identique ---
  if(!marquee.dataset.loop){
    marquee.textContent=marquee.textContent+marquee.textContent;
    marquee.dataset.loop='done';
  }
  let drag=0,lastX=null;
  marquee.addEventListener('touchstart',e=>{
    lastX=e.touches[0].clientX;
    marquee.style.animationPlayState='paused';
  },{passive:true});
  marquee.addEventListener('touchmove',e=>{
    if(lastX===null)return;
    const x=e.touches[0].clientX;
    drag+=(x-lastX);lastX=x;
    marquee.style.setProperty('--drag',drag+'px');
  },{passive:true});
  marquee.addEventListener('touchend',()=>{
    lastX=null;marquee.style.animationPlayState='running';
  });
})();

// ---------- EFFET TACTILE : couleur au passage du doigt ----------
(function(){
  if(!document.querySelector('.tile'))return;
  document.addEventListener('touchstart',e=>{
    const t=e.target.closest('.tile');
    if(t)t.classList.add('touched');
  },{passive:true});
  document.addEventListener('touchmove',e=>{
    const finger=document.elementFromPoint(e.touches[0].clientX,e.touches[0].clientY);
    const tile=finger?finger.closest('.tile'):null;
    document.querySelectorAll('.tile.touched').forEach(t=>{
      if(t!==tile)t.classList.remove('touched');
    });
    if(tile)tile.classList.add('touched');
  },{passive:true});
  document.addEventListener('touchend',e=>{
    const t=e.target.closest('.tile');
    if(t)setTimeout(()=>t.classList.remove('touched'),400);
  });
})();

// ---------- PHOTOGRAPHIES (page audiovisuel) ----------
(function(){
  const photoGrid=document.getElementById('photo-grid');
  if(!photoGrid)return;
  const PHOTOS=[
    "église-vincennes.jpg",
    "rue-de-marseille.jpg",
    "haut-parleur.jpg",
    "vignes.png",
    "café-du-matin.jpg",
    "eiffel-rose-1.jpg",
    "empreinte-sable.jpg",
    "montmartre.jpg",
    "20230715_113454.jpg",
    "platanes-d'aigouze.JPG",
    "lune-maritime.JPG",
    "palmier-menton.JPG",
    "crépuscule.JPG",
    "palmiers-niçois.JPG",
    "20221231_225303.jpg",
    "bateau-garrigue.JPG",
    "sète-au-loin.jpg",
    "sillon-d'avion.jpg",
    "fenêtre-sur-toit.jpg",
    "alexandre-III.jpg",
    "C15-D.jpg",
    "feuilles-de-vigne.JPG",
    "tisséo.jpg",
    "aube-salante.jpg",
    "sainte-victoire.jpg",
    "20230816_192314.jpg",
    "soir-d'orange.jpg",
    "arbre-de-fer.jpg",
    "rose.jpg",
    "port-de-sète.JPG",
    "branche-racine.jpg",
    "bateau-de-pêche.jpg",
    "eiffel-rose-2.jpg",
    "nuage-maritime.jpg",
    "jardin-provençal.JPG",
    "anniversaire.png",
    "nice.JPG",
    "nuage-mauve.jpg",
    "palmiers-orange.png",
    "vespa-bleue.JPG",
    "abeille-sur-fleur.jpg",
    "marseillan-soir.png",
    "paisible-provence.png",
    "versailles.jpg",
    "nuage-sur-toit.jpg",
    "garrigue-photographe.JPG",
    "artiste.jpg",
    "menton.JPG",
    "dune-de-sable.jpg",
    "palmiers-grain.jpg",
  ];
  const PHOTO_DIR="./assets/images/photographies/";
  function photoTitle(f){
    return f.replace(/\.[^.]+$/,'').replace(/[-_]+/g,' ')
            .replace(/\b\w/g,c=>c.toUpperCase());
  }
  PHOTOS.forEach(f=>{
    const tile=document.createElement('div');
    tile.className='tile';
    tile.dataset.title=photoTitle(f);
    tile.dataset.desc='';tile.dataset.year='';tile.dataset.youtube='';
    tile.innerHTML='<img src="'+PHOTO_DIR+f+'" alt="'+photoTitle(f)+'" loading="lazy">'
      +'<span class="tile-title">'+photoTitle(f)+'</span>';
    photoGrid.appendChild(tile);
  });
})();

// ---------- LIGHTBOX + NAVIGATION (pages design & audiovisuel) ----------
(function(){
  const lb=document.getElementById('lightbox');
  if(!lb)return;
  const lbImg=document.getElementById('lb-img');
  const lbTitle=document.getElementById('lb-title');
  const lbDesc=document.getElementById('lb-desc');
  const lbYear=document.getElementById('lb-year');
  const lbYt=document.getElementById('lb-youtube');
  const lbPrev=document.getElementById('lb-prev');
  const lbNext=document.getElementById('lb-next');
  const tiles=[...document.querySelectorAll('.tile')];
  let current=0;

  function show(i){
    current=(i+tiles.length)%tiles.length;
    const t=tiles[current];
    lbImg.src=t.querySelector('img').src;
    lbImg.alt=t.querySelector('img').alt;
    if(lbTitle)lbTitle.textContent=t.dataset.title||'';
    if(lbDesc)lbDesc.textContent=t.dataset.desc||'';
    if(lbYear)lbYear.textContent=t.dataset.year?('Année — '+t.dataset.year):'';
    if(lbYt){
      if(t.dataset.youtube){lbYt.href=t.dataset.youtube;lbYt.style.display='';}
      else lbYt.style.display='none';
    }
  }

  if(lbPrev)lbPrev.addEventListener('click',e=>{e.stopPropagation();show(current-1);});
  if(lbNext)lbNext.addEventListener('click',e=>{e.stopPropagation();show(current+1);});

  tiles.forEach(t=>t.addEventListener('click',()=>{
    if(t.closest('a[href]')&&t.tagName==='A')return; // tuiles-liens web : ne pas intercepter
    show(tiles.indexOf(t));
    lb.classList.add('open');
  }));

  function closeLb(){lb.classList.remove('open');}
  const close=document.getElementById('lb-close');
  if(close)close.addEventListener('click',closeLb);
  lb.addEventListener('click',e=>{if(e.target===lb)closeLb();});
  document.addEventListener('keydown',e=>{
    if(!lb.classList.contains('open'))return;
    if(e.key==='Escape')closeLb();
    if(e.key==='ArrowLeft')show(current-1);
    if(e.key==='ArrowRight')show(current+1);
  });
})();