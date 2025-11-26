// Small script for theme toggle, mobile nav and some UI helpers
(function(){
  'use strict';
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-navigation');
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const yearEl = document.getElementById('year');

  // Year
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',function(e){
      const id = this.getAttribute('href');
      if(id==='#' || id === '') return;
      const el = document.querySelector(id);
      if(el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth',block:'start'});
        // close mobile nav
        if(nav && nav.classList.contains('open')){
          nav.classList.remove('open');
          nav.style.display = '';
          navToggle.setAttribute('aria-expanded','false');
        }
      }
    });
  });

  // Mobile nav
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

  // Theme toggle (adds class to documentElement)
  const storedTheme = localStorage.getItem('theme');
  if(storedTheme === 'dark'){
    document.documentElement.classList.add('theme-dark');
    if(themeToggle) themeToggle.textContent = '☀️'
  }
  if(themeToggle){
    themeToggle.addEventListener('click', ()=>{
      const isDark = document.documentElement.classList.toggle('theme-dark');
      if(isDark){
        localStorage.setItem('theme','dark');
        themeToggle.textContent = '☀️'
      } else {
        localStorage.removeItem('theme');
        themeToggle.textContent = '🌙'
      }
    });
  }
})();