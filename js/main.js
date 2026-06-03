/* Raj Farms Coorg — Main Application Script */
(function(){
'use strict';

/* ══════════════════════════════════════════════
   STOCK STATUS
   true = in stock, false = out of stock
   ══════════════════════════════════════════════ */
var STOCK = { honey: true };

/* ══════════════════════════════════════════════
   PRODUCT DATA
   ══════════════════════════════════════════════ */
var GROUPS = {
  'roasted-beans': {
    title: 'Roasted Beans',
    cat: 'Coffee, Whole Bean',
    img: 'images/products/roasted-beans.jpg',
    variants: [
      { id: 'arabica-beans', name: 'Arabica', sizes: [{ s:'250g', p:349 }, { s:'500g', p:699 }] },
      { id: 'robusta-beans', name: 'Robusta', sizes: [{ s:'250g', p:349 }, { s:'500g', p:699 }] }
    ]
  },
  'filter-pure': {
    title: 'Filter Powder, Pure',
    cat: 'Coffee, Filter Powder',
    img: 'images/products/filter-powder-pure.jpg',
    variants: [
      { id: 'arabica-pure', name: 'Arabica Pure', sizes: [{ s:'250g', p:399 }, { s:'500g', p:799 }] },
      { id: 'robusta-pure', name: 'Robusta Pure', sizes: [{ s:'250g', p:399 }, { s:'500g', p:799 }] }
    ]
  },
  'filter-blends': {
    title: 'Filter Powder, Blends',
    cat: 'Coffee, Blend Powder',
    img: 'images/products/filter-powder-blends.jpg',
    variants: [
      { id: 'arabica-8020', name: 'Arabica 80:20', sizes: [{ s:'250g', p:349 }, { s:'500g', p:699 }] },
      { id: 'arabica-7030', name: 'Arabica 70:30', sizes: [{ s:'250g', p:299 }, { s:'500g', p:599 }] },
      { id: 'arabica-6040', name: 'Arabica 60:40', sizes: [{ s:'250g', p:249 }, { s:'500g', p:499 }] }
    ]
  },
  'honey': {
    title: 'Wild Forest Honey',
    cat: 'Honey, Raw Forest',
    img: 'images/products/honey-wild.jpg',
    variants: [
      { id: 'honey-wild', name: 'Wild Forest Honey', sizes: [{ s:'400g jar', p:500 }, { s:'1kg jar', p:1250 }] }
    ]
  },
  'pepper': {
    title: 'Black Pepper',
    cat: 'Spices, Black Pepper',
    img: 'images/products/pepper-black.jpg',
    variants: [
      { id: 'pepper-black', name: 'Black Pepper', sizes: [{ s:'100g', p:140 }, { s:'250g', p:280 }, { s:'500g', p:520 }] }
    ]
  },
  'cardamom': {
    title: 'Cardamom',
    cat: 'Spices, Cardamom',
    img: 'images/products/cardamom.jpg',
    variants: [
      { id: 'cardamom', name: 'Cardamom', sizes: [{ s:'100g', p:415 }, { s:'250g', p:780 }, { s:'500g', p:1520 }] }
    ]
  }
};

/* ── Apply honey stock ── */
if(!STOCK.honey){
  document.querySelectorAll('.product-card[data-cat="Honey"]').forEach(function(card){
    var s = card.querySelector('.product-seasonal');
    if(s){ s.textContent='Out of Stock'; s.style.background='rgba(139,26,26,0.3)'; s.style.color='#e8a0a0'; s.style.borderColor='rgba(139,26,26,0.4)'; }
    card.style.opacity='0.55'; card.style.pointerEvents='none';
  });
}

/* ══════════════════════════════════════════════
   GROUP MODAL STATE
   ══════════════════════════════════════════════ */
var gmState = { groupId:null, variantId:null, qty:1 };

/* All modal functions on window so inline onclick can reach them */
window.openGroupModal = function(groupId){
  if(groupId==='honey' && !STOCK.honey) return;
  var group = GROUPS[groupId];
  if(!group) return;
  gmState.groupId = groupId;
  gmState.variantId = null;
  gmState.qty = 1;
  document.getElementById('gm-title').textContent = group.title;
  if(group.variants.length === 1){
    gmState.variantId = group.variants[0].id;
    renderStep2(group, group.variants[0]);
  } else {
    renderStep1(group);
  }
  var m = document.getElementById('group-modal');
  m.style.opacity='1'; m.style.pointerEvents='auto';
  document.body.style.overflow='hidden';
};

window.closeGroupModal = function(){
  var m = document.getElementById('group-modal');
  m.style.opacity='0'; m.style.pointerEvents='none';
  document.body.style.overflow='';
};

document.getElementById('group-modal').addEventListener('click', function(e){
  if(e.target===this) window.closeGroupModal();
});

function renderStep1(group){
  var html = '<p style="font-size:0.58rem;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:var(--green-pale);margin-bottom:1rem;">Select Variant</p>';
  group.variants.forEach(function(v){
    html += '<button onclick="window.selectVariant(\''+v.id+'\')" style="width:100%;text-align:left;padding:0.9rem 1rem;margin-bottom:0.6rem;background:var(--card);border:1px solid var(--border2);color:var(--text);font-family:\'Cormorant Garamond\',serif;font-size:1.1rem;font-weight:400;cursor:pointer;">'+v.name+'</button>';
  });
  document.getElementById('gm-body').innerHTML = html;
}

window.selectVariant = function(variantId){
  var group = GROUPS[gmState.groupId];
  var variant = group.variants.find(function(v){ return v.id===variantId; });
  if(!variant) return;
  gmState.variantId = variantId;
  gmState.qty = 1;
  renderStep2(group, variant);
};

function renderStep2(group, variant){
  var hasMultiple = group.variants.length > 1;
  var backBtn = hasMultiple
    ? '<button onclick="window.openGroupModal(\''+gmState.groupId+'\')" style="background:none;border:none;color:var(--gold);font-family:\'Lato\',sans-serif;font-size:0.58rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;cursor:pointer;margin-bottom:1.2rem;padding:0;">&#8592; Back</button><br>'
    : '';

  var sizeBtns = '';
  variant.sizes.forEach(function(sz, i){
    var sel = i===0;
    sizeBtns += '<button class="gm-size-btn'+(sel?' gm-sel':'')+'" data-size="'+sz.s+'" data-price="'+sz.p+'" onclick="window.selectSize(this)" style="padding:0.7rem 1rem;margin-right:0.5rem;margin-bottom:0.5rem;background:'+(sel?'rgba(184,147,90,0.12)':'var(--card)')+';border:1px solid '+(sel?'var(--gold)':'var(--border2)')+';color:'+(sel?'var(--gold-bright)':'var(--text3)')+';font-family:\'Cormorant Garamond\',serif;font-size:0.95rem;cursor:pointer;">&#8377;'+sz.p.toLocaleString('en-IN')+' / '+sz.s+'</button>';
  });

  document.getElementById('gm-body').innerHTML = backBtn
    + '<p style="font-family:\'Cormorant Garamond\',serif;font-size:1.2rem;color:var(--text);margin-bottom:1rem;">'+variant.name+'</p>'
    + '<p style="font-size:0.58rem;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:var(--green-pale);margin-bottom:0.7rem;">Select Size</p>'
    + '<div style="margin-bottom:1.2rem;">'+sizeBtns+'</div>'
    + '<p style="font-size:0.58rem;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:var(--green-pale);margin-bottom:0.7rem;">Quantity</p>'
    + '<div style="display:flex;align-items:center;gap:0;margin-bottom:1.4rem;">'
    +   '<button class="qty-btn" onclick="window.gmQty(-1)">&#8722;</button>'
    +   '<div class="qty-val" id="gm-qty-val">1</div>'
    +   '<button class="qty-btn" onclick="window.gmQty(1)">&#43;</button>'
    +   '<span style="font-size:0.62rem;color:var(--text4);margin-left:0.8rem;">Max 5kg per order</span>'
    + '</div>'
    + '<button onclick="window.gmAddToCart()" style="width:100%;padding:0.88rem;background:var(--gold);border:1px solid var(--gold);color:var(--obsidian);font-family:\'Lato\',sans-serif;font-size:0.54rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;cursor:pointer;">Add to Cart</button>';

  gmState.qty = 1;
}

window.selectSize = function(btn){
  document.querySelectorAll('.gm-size-btn').forEach(function(b){
    b.classList.remove('gm-sel');
    b.style.borderColor='var(--border2)'; b.style.color='var(--text3)'; b.style.background='var(--card)';
  });
  btn.classList.add('gm-sel');
  btn.style.borderColor='var(--gold)'; btn.style.color='var(--gold-bright)'; btn.style.background='rgba(184,147,90,0.12)';
};

window.gmQty = function(delta){
  gmState.qty = Math.max(1, Math.min(20, gmState.qty+delta));
  var el = document.getElementById('gm-qty-val');
  if(el) el.textContent = gmState.qty;
};

window.gmAddToCart = function(){
  var group = GROUPS[gmState.groupId];
  if(!group) return;
  var variant = group.variants.find(function(v){ return v.id===gmState.variantId; });
  if(!variant) return;
  var btn = document.querySelector('.gm-size-btn.gm-sel');
  if(!btn) return;
  var size = btn.getAttribute('data-size');
  var price = parseInt(btn.getAttribute('data-price'));
  var productName = group.variants.length > 1 ? group.title+' - '+variant.name : group.title;
  var id = variant.id+'_'+size;
  var existing = cart.find(function(i){ return i.id===id; });
  if(existing){ existing.qty += gmState.qty; }
  else { cart.push({ id:id, name:productName, cat:group.cat, img:group.img, size:size, price:price, qty:gmState.qty }); }
  renderCart();
  window.closeGroupModal();
  openCart();
};

/* ── FAQ ── */
var faqs = [
  {q:'Do you grind to order or only sell whole beans?', a:'Both. We offer whole roasted beans and freshly ground filter powder. Our powders are ground specifically for South Indian filter coffee. If you need a different grind size, mention it in your order notes and we will accommodate.'},
  {q:'What is the shelf life of your coffee?', a:'Whole roasted beans stay fresh for up to 3 months in an airtight container away from sunlight. Ground coffee is best consumed within 6 weeks of roasting. All coffee orders are dispatched within 48 hours of roasting.'},
  {q:'How is the honey packed and is it really raw?', a:'Packed in food-grade glass jars and never heated above ambient temperature. It may crystallise over time, which is a sign of genuine raw honey. Place the jar in warm water to return it to liquid.'},
  {q:'Is the honey always available?', a:'No. Our forest honey is harvested during the bloom seasons. Availability varies with the harvest. Write to us on WhatsApp to check current availability or to be notified for the next harvest.'},
  {q:'Do you ship outside India?', a:'Currently we ship only within India via India Post. International shipping is not available at this time.'},
  {q:'What are the shipping charges?', a:'Shipping is calculated based on your location and order weight. Orders are processed via India Post. We confirm the exact charge on WhatsApp before dispatch.'},
  {q:'Can I place a bulk or corporate order?', a:'We currently focus on individual customers and recommend a maximum of 5kg per order. For larger requirements, write to us at rajfarmscoorg@gmail.com or WhatsApp us and we will see what we can arrange.'},
  {q:'What is your return and refund policy?', a:'As a family estate selling perishable food products, we do not accept returns or offer refunds once an order is dispatched. If your delivery arrives damaged or tampered, contact us on WhatsApp within 48 hours with photos and we will resolve it.'},
  {q:'How long does delivery take?', a:'All coffee orders are dispatched within 48 hours of roasting via India Post. Delivery typically takes 3 to 7 days. We provide a tracking number once dispatched.'},
  {q:'Can the coffee powder be used for methods other than filter?', a:'Yes. While our powders are ground specifically for South Indian filter coffee, they can be brewed using other methods. The flavour profile may vary depending on your method and equipment.'}
];
var faqGrid = document.getElementById('faq-grid');
if(faqGrid){
  faqs.forEach(function(f){
    var div = document.createElement('div');
    div.className = 'faq-item';
    div.innerHTML = '<div class="faq-question"><span class="faq-q-text">'+f.q+'</span><span class="faq-icon">+</span></div><div class="faq-answer">'+f.a+'</div>';
    div.querySelector('.faq-question').addEventListener('click', function(){
      var isOpen = div.classList.contains('open');
      faqGrid.querySelectorAll('.faq-item').forEach(function(i){ i.classList.remove('open'); });
      if(!isOpen) div.classList.add('open');
    });
    faqGrid.appendChild(div);
  });
}

/* ── Nav ── */
var nav = document.getElementById('nav');
window.addEventListener('scroll', function(){ nav.classList.toggle('scrolled', window.scrollY>60); }, {passive:true});
document.getElementById('burger').addEventListener('click', function(){
  document.getElementById('nav-mobile').classList.add('on');
  document.body.style.overflow='hidden';
  document.getElementById('burger').style.visibility='hidden';
});
document.getElementById('nav-close').addEventListener('click', function(){
  document.getElementById('nav-mobile').classList.remove('on');
  document.body.style.overflow='';
  document.getElementById('burger').style.visibility='';
});
document.querySelectorAll('.mobile-link').forEach(function(a){
  a.addEventListener('click', function(){
    document.getElementById('nav-mobile').classList.remove('on');
    document.body.style.overflow='';
    document.getElementById('burger').style.visibility='';
  });
});

/* ── Nav filter links ── */
document.querySelectorAll('.nav-link[data-filter]').forEach(function(a){
  a.addEventListener('click', function(e){
    e.preventDefault();
    var cat = a.getAttribute('data-filter');
    document.querySelectorAll('.filter-btn').forEach(function(b){ b.classList.remove('active'); });
    var btn = document.querySelector('.filter-btn[data-cat="'+cat+'"]');
    if(btn) btn.classList.add('active');
    filterProducts(cat);
    document.getElementById('products').scrollIntoView({behavior:'smooth'});
  });
});

/* ── Product filter ── */
function filterProducts(cat){
  document.querySelectorAll('.product-card').forEach(function(c){
    c.style.display = (cat==='All'||c.getAttribute('data-cat')===cat) ? '' : 'none';
  });
}
document.querySelectorAll('.filter-btn').forEach(function(btn){
  btn.addEventListener('click', function(){
    document.querySelectorAll('.filter-btn').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    filterProducts(btn.getAttribute('data-cat'));
  });
});

/* ── Footer filter links ── */
document.querySelectorAll('.footer-filter-link').forEach(function(a){
  a.addEventListener('click', function(e){
    e.preventDefault();
    var cat = a.getAttribute('data-filter');
    document.querySelectorAll('.filter-btn').forEach(function(b){ b.classList.remove('active'); });
    var btn = document.querySelector('.filter-btn[data-cat="'+cat+'"]');
    if(btn) btn.classList.add('active');
    filterProducts(cat);
    document.getElementById('products').scrollIntoView({behavior:'smooth'});
  });
});

/* ── Cart ── */
var cart = [];
function getTotal(){ return cart.reduce(function(s,i){ return s+i.price*i.qty; },0); }

function renderCart(){
  var count = cart.reduce(function(s,i){ return s+i.qty; },0);
  var badge = document.getElementById('cart-badge');
  badge.textContent = count;
  badge.classList.toggle('on', count>0);
  var body = document.getElementById('cart-body');
  var empty = document.getElementById('cart-empty');
  body.querySelectorAll('.cart-item').forEach(function(el){ el.remove(); });
  if(cart.length===0){
    empty.style.display='flex';
  } else {
    empty.style.display='none';
    cart.forEach(function(item){
      var div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML =
        '<img class="cart-item-img" src="'+item.img+'" alt="'+item.name+'" loading="lazy" onerror="this.style.display=\'none\'">' +
        '<div style="flex:1;min-width:0;">' +
          '<div class="ci-cat">'+item.cat+'</div>' +
          '<div class="ci-name">'+item.name+'</div>' +
          '<div class="ci-size">'+item.size+'</div>' +
          '<div class="ci-price">&#8377; '+(item.price*item.qty).toLocaleString('en-IN')+'</div>' +
          '<div class="ci-controls">' +
            '<button class="qty-btn" data-id="'+item.id+'" data-action="dec">&#8722;</button>' +
            '<div class="qty-val">'+item.qty+'</div>' +
            '<button class="qty-btn" data-id="'+item.id+'" data-action="inc">&#43;</button>' +
            '<button class="ci-remove" data-id="'+item.id+'">Remove</button>' +
          '</div>' +
        '</div>';
      body.appendChild(div);
    });
  }
  document.getElementById('cart-total').innerHTML = '&#8377; '+getTotal().toLocaleString('en-IN')+' <span style="font-size:0.6rem;font-weight:400;color:var(--text3);">+ delivery</span>';
}

document.getElementById('cart-body').addEventListener('click', function(e){
  var id = e.target.getAttribute('data-id');
  if(!id) return;
  if(e.target.classList.contains('qty-btn')){
    var item = cart.find(function(i){ return i.id===id; });
    if(!item) return;
    if(e.target.getAttribute('data-action')==='inc'){ item.qty++; }
    else { item.qty--; if(item.qty<=0) cart=cart.filter(function(i){ return i.id!==id; }); }
    renderCart();
  }
  if(e.target.classList.contains('ci-remove')){
    cart=cart.filter(function(i){ return i.id!==id; });
    renderCart();
  }
});

function openCart(){
  document.getElementById('cart-drawer').classList.add('on');
  document.getElementById('cart-overlay').classList.add('on');
  document.body.style.overflow='hidden';
}
function closeCart(){
  document.getElementById('cart-drawer').classList.remove('on');
  document.getElementById('cart-overlay').classList.remove('on');
  document.body.style.overflow='';
}
document.getElementById('cart-fab').addEventListener('click', openCart);
document.getElementById('cart-close').addEventListener('click', closeCart);
document.getElementById('cart-overlay').addEventListener('click', closeCart);

/* ── Checkout ── */
function openCheckout(){
  if(cart.length===0) return;
  var lines = document.getElementById('co-lines');
  lines.innerHTML='';
  cart.forEach(function(item){
    var d=document.createElement('div'); d.className='co-line';
    d.innerHTML='<span class="co-line-name">'+item.name+' ('+item.size+')<span class="co-line-qty"> x'+item.qty+'</span></span><span class="co-line-price">&#8377;'+(item.price*item.qty).toLocaleString('en-IN')+'</span>';
    lines.appendChild(d);
  });
  document.getElementById('co-total').innerHTML='&#8377;'+getTotal().toLocaleString('en-IN');
  closeCart();
  document.getElementById('checkout-modal').classList.add('on');
  document.body.style.overflow='hidden';
}
function closeCheckout(){
  document.getElementById('checkout-modal').classList.remove('on');
  document.body.style.overflow='';
}
document.getElementById('btn-checkout').addEventListener('click', openCheckout);
document.getElementById('co-close').addEventListener('click', closeCheckout);
document.getElementById('checkout-modal').addEventListener('click', function(e){ if(e.target===this) closeCheckout(); });

document.getElementById('co-submit').addEventListener('click', function(){
  var name=document.getElementById('co-name').value.trim()||'Customer';
  var phone=document.getElementById('co-phone').value.trim();
  var addr=document.getElementById('co-addr').value.trim();
  var city=document.getElementById('co-city').value.trim();
  var pin=document.getElementById('co-pin').value.trim();
  var notes=document.getElementById('co-notes').value.trim();
  if(!phone||!addr||!pin){ alert('Please fill in your phone number, address and PIN code.'); return; }
  var lines=cart.map(function(i){ return i.name+' ('+i.size+') x'+i.qty; }).join(', ');
  var msg='Hello, I am '+name+' and I would like to place an order from Raj Farms Coorg.'
    +'\n\nItems: '+lines
    +'\nOrder Total: Rs '+getTotal().toLocaleString('en-IN')
    +'\nPhone: '+phone
    +'\nAddress: '+addr+', '+city+' '+pin
    +(notes?'\nNotes: '+notes:'');
  window.open('https://wa.me/919448895879?text='+encodeURIComponent(msg),'_blank');
  closeCheckout(); cart=[]; renderCart();
});

/* ── Contact form ── */
document.getElementById('form-send').addEventListener('click', function(){
  var name=document.getElementById('cf-name').value.trim()||'Customer';
  var phone=document.getElementById('cf-phone').value.trim();
  var product=document.getElementById('cf-product').value||'a product';
  var msg2=document.getElementById('cf-msg').value.trim();
  var text='Hello, I am '+name+' and I would like to enquire about '+product+' from Raj Farms Coorg.';
  if(phone) text+=' My phone number is '+phone+'.';
  if(msg2) text+=' '+msg2;
  window.open('https://wa.me/919448895879?text='+encodeURIComponent(text),'_blank');
});

/* ── Scroll reveal ── */
var revEls=document.querySelectorAll('.rev,.rev-l,.rev-r');
var io=new IntersectionObserver(function(entries){
  entries.forEach(function(e,i){
    if(e.isIntersecting){ setTimeout(function(){ e.target.classList.add('on'); },i*50); io.unobserve(e.target); }
  });
},{threshold:0.07});
revEls.forEach(function(el){ io.observe(el); });

/* ── Active nav ── */
var secs=document.querySelectorAll('section[id]');
var navLinks=document.querySelectorAll('.nav-link');
window.addEventListener('scroll',function(){
  var pos=window.scrollY+140;
  secs.forEach(function(s){
    if(pos>=s.offsetTop&&pos<s.offsetTop+s.offsetHeight){
      navLinks.forEach(function(a){ a.classList.toggle('active',a.getAttribute('href')==='#'+s.id); });
    }
  });
},{passive:true});

renderCart();
})();
