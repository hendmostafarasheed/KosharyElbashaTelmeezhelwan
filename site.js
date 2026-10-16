document.addEventListener('DOMContentLoaded',()=>{
  // Background music is included on both pages. Try autoplay, then provide a clear tap control if blocked.
  const music=document.getElementById('site-music');
  const musicToggle=document.getElementById('music-toggle');
  if(music && musicToggle){
    music.loop=true;
    const paintMusicButton=()=>{
      const playing=!music.paused;
      musicToggle.classList.toggle('is-playing',playing);
      musicToggle.textContent=playing?'♫ إيقاف الأغنية':'♫ تشغيل الأغنية';
      musicToggle.setAttribute('aria-label',playing?'إيقاف الأغنية':'تشغيل الأغنية');
    };
    musicToggle.addEventListener('click',async()=>{
      if(music.paused){try{await music.play();}catch(e){musicToggle.textContent='اضغط لتشغيل الأغنية';}}
      else music.pause();
      paintMusicButton();
    });
    music.addEventListener('play',paintMusicButton);
    music.addEventListener('pause',paintMusicButton);
    music.play().then(paintMusicButton).catch(paintMusicButton);
  }

  const modal=document.getElementById('info-modal');
  const modalTitle=document.getElementById('modal-title');
  const modalText=document.getElementById('modal-text');
  document.querySelectorAll('[data-action]').forEach(btn=>btn.addEventListener('click',()=>{
    if(!modal)return;
    const type=btn.dataset.action;
    if(type==='order'){
      modalTitle.textContent='اطلب أوردر';
      modalText.textContent='زر الطلب جاهز للتوصيل برابط الطلب أو واتساب المحل. بمجرد إضافة رقم المحل، يتحول الطلب لخطوة مباشرة.';
    }else{
      modalTitle.textContent='عروض اليوم';
      modalText.textContent='هنا هتظهر عروض كشري الباشا تلميذ. زر العروض جاهز لربطه بصفحة العروض أو تفاصيل العرض اليومي.';
    }
    modal.hidden=false;
  }));
  document.querySelector('.modal-close')?.addEventListener('click',()=>modal.hidden=true);
  modal?.addEventListener('click',e=>{if(e.target===modal)modal.hidden=true});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(modal)modal.hidden=true;closeLightbox()}});
  const lightbox=document.getElementById('menu-lightbox');
  const menuArt=document.getElementById('menu-art');
  const zoomButton=document.getElementById('zoom-menu');
  const closeButton=document.getElementById('close-lightbox');
  function openLightbox(){if(lightbox)lightbox.hidden=false}
  function closeLightbox(){if(lightbox)lightbox.hidden=true}
  menuArt?.addEventListener('click',openLightbox);
  zoomButton?.addEventListener('click',openLightbox);
  closeButton?.addEventListener('click',closeLightbox);
  lightbox?.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});
});
