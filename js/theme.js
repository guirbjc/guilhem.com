// Thème négatif automatique : nuit de 18h à 6h (heure locale du visiteur).
// Test rapide : ajouter ?theme=dark ou ?theme=light à l'URL.
(function(){
  var root=document.documentElement;
  var forced=new URLSearchParams(location.search).get('theme');
  function apply(){
    var h=new Date().getHours();
    var night=(h>=18||h<6);
    var theme=(forced==='dark'||forced==='light')?forced:(night?'dark':'light');
    if(root.dataset.theme!==theme)root.dataset.theme=theme;
  }
  apply();
  setInterval(apply,60000); // bascule automatiquement si la page reste ouverte
})();
