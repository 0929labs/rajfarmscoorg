/* Raj Farms Coorg — About Page Script */

(function(){
  var nav=document.getElementById('nav');
  window.addEventListener('scroll',function(){nav.classList.toggle('scrolled',window.scrollY>60);},{passive:true});
  document.getElementById('burger').addEventListener('click',function(){document.getElementById('nav-mobile').classList.add('on');document.body.style.overflow='hidden';});
  document.getElementById('nav-close').addEventListener('click',function(){document.getElementById('nav-mobile').classList.remove('on');document.body.style.overflow='';});
  document.querySelectorAll('#nav-mobile a').forEach(function(a){a.addEventListener('click',function(){document.getElementById('nav-mobile').classList.remove('on');document.body.style.overflow='';});});
  var io=new IntersectionObserver(function(entries){entries.forEach(function(e,i){if(e.isIntersecting){setTimeout(function(){e.target.classList.add('on');},i*55);io.unobserve(e.target);}});},{threshold:0.07});
  document.querySelectorAll('.rev,.rev-l,.rev-r').forEach(function(el){io.observe(el);});
})();