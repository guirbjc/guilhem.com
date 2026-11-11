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
    {f:"église-vincennes.jpg",y:"2023"},
    {f:"rue-de-marseille.jpg",y:"2022"},
    {f:"haut-parleur.jpg",y:"2022"},
    {f:"vignes.png",y:"2025"},
    {f:"café-du-matin.jpg",y:"2024"},
    {f:"eiffel-rose-1.jpg",y:"2023"},
    {f:"empreinte-sable.jpg",y:"2021"},
    {f:"montmartre.jpg",y:"2023"},
    "20230715_113454.jpg",
    {f:"platanes-d'aigouze.JPG",y:"2024"},
    {f:"lune-maritime.JPG",y:"2024"},
    {f:"palmier-menton.JPG",y:"2022"},
    {f:"crépuscule.JPG",y:"2020"},
    {f:"palmiers-niçois.JPG",y:"2022"},
    "20221231_225303.jpg",
    {f:"bateau-garrigue.JPG",y:"2024"},
    {f:"sète-au-loin.jpg",y:"2021"},
    {f:"sillon-d'avion.jpg",y:"2022"},
    {f:"fenêtre-sur-toit.jpg",y:"2023"},
    {f:"alexandre-III.jpg",y:"2024"},
    {f:"C15-D.jpg",y:"2021"},
    {f:"feuilles-de-vigne.JPG",y:"2020"},
    {f:"tisséo.jpg",y:"2018"},
    {f:"aube-salante.jpg",y:"2018"},
    {f:"sainte-victoire.jpg",y:"2017"},
    "20230816_192314.jpg",
    {f:"soir-d'orange.jpg",y:"2022"},
    {f:"arbre-de-fer.jpg",y:"2023"},
    {f:"rose.jpg",y:"2022"},
    {f:"port-de-sète.JPG",y:"2025"},
    {f:"branche-racine.jpg",y:"2022"},
    {f:"bateau-de-pêche.jpg",y:"2022"},
    {f:"eiffel-rose-2.jpg",y:"2023"},
    {f:"nuage-maritime.jpg",y:"2023"},
    {f:"jardin-provençal.JPG",y:"2025"},
    {f:"anniversaire.png",y:"2025"},
    {f:"nice.JPG",y:"2022"},
    {f:"nuage-mauve.jpg",y:"2021"},
    {f:"palmiers-orange.png",y:"2021"},
    {f:"vespa-bleue.JPG",y:"2025"},
    {f:"abeille-sur-fleur.jpg",y:"2022"},
    {f:"marseillan-soir.png",y:"2024"},
    {f:"paisible-provence.png",y:"2025"},
    {f:"versailles.jpg",y:"2023"},
    {f:"nuage-sur-toit.jpg",y:"2023"},
    {f:"garrigue-photographe.JPG",y:"2024"},
    {f:"artiste.jpg",y:"2024"},
    {f:"menton.JPG",y:"2022"},
    {f:"dune-de-sable.jpg",y:"2019"},
    {f:"palmiers-grain.jpg",y:"2018"},
  ];
  const PHOTO_DIR="./assets/images/photographies/";
  function photoTitle(f){
    return f.replace(/\.[^.]+$/,'').replace(/[-_]+/g,' ')
            .replace(/\b\w/g,c=>c.toUpperCase());
  }
  PHOTOS.forEach(item=>{
  const f=typeof item==='string'?item:item.f;
  const year=typeof item==='string'
      ?(f.match(/^(20\d{2})/)||[])[1]||''
      :item.y;
  const tile=document.createElement('div');
  tile.className='tile';
  tile.dataset.title=photoTitle(f);
  tile.dataset.desc='';
  tile.dataset.year=year;
  tile.dataset.youtube='';
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