(function(){
  'use strict';
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-navigation');
  // const themeToggle... (APAGADO)
  const yearEl = document.getElementById('year');

  // Ano atual no footer
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // --- 1. Scroll Suave ao clicar nos links ---
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    // ... (mantém o código igual) ...
    a.addEventListener('click',function(e){
      const id = this.getAttribute('href');
      if(id==='#' || id === '') return;
      const el = document.querySelector(id);
      if(el){
        e.preventDefault();
        const headerOffset = 100;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });

        if(nav && nav.classList.contains('open')){
          nav.classList.remove('open');
          nav.style.display = '';
          navToggle.setAttribute('aria-expanded','false');
        }
      }
    });
  });

  // --- 2. Menu Mobile ---
  if(navToggle){
    navToggle.addEventListener('click',()=>{
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      if(!expanded){
        nav.classList.add('open');
        nav.style.display = 'block';
      } else {
        nav.classList.remove('open');
        nav.style.display = '';
      }
    });
  }

  // --- 3. Tema Dark/Light --- (FOI REMOVIDO COMPLETAMENTE)

  // --- 4. SCROLL SPY (Destacar link ativo ao rolar) ---
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.primary-navigation a');

  function changeActiveLink() {
    let index = sections.length;
    while(--index && window.scrollY + 150 < sections[index].offsetTop) {}
    
    navLinks.forEach((link) => link.classList.remove('active'));

    if(index >= 0 && sections[index]) {
        const id = sections[index].id;
        const activeLink = document.querySelector(`.primary-navigation a[href="#${id}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
  }

  window.addEventListener('scroll', changeActiveLink);
  changeActiveLink();

})();