/* Rejuv4All — homepage interactions (vanilla JS) */
(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header: scrolled state + active link ---------- */
  var header = $('#site-header');
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var navLinks = $$('.site-nav a');
  if ('IntersectionObserver' in window && navLinks.length) {
    var sectionMap = {};
    navLinks.forEach(function (a) { sectionMap[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && sectionMap[e.target.id]) {
          navLinks.forEach(function (a) { a.classList.remove('is-current'); });
          sectionMap[e.target.id].classList.add('is-current');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(sectionMap).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }

  /* ---------- Mobile drawer ---------- */
  var menuBtn = $('#mobile-menu-btn');
  var drawer = $('#mobile-nav');
  var backdrop = $('#drawer-backdrop');
  var drawerClose = $('#mobile-close-btn');
  var drawerOpen = false;
  function setDrawer(open) {
    if (!drawer || open === drawerOpen) return;
    drawerOpen = open;
    drawer.classList.toggle('is-open', open);
    if (backdrop) backdrop.classList.toggle('is-open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    if (backdrop) backdrop.setAttribute('aria-hidden', String(!open));
    if (menuBtn) menuBtn.setAttribute('aria-expanded', String(open));
    document.documentElement.classList.toggle('drawer-open', open);
    if (open) { setTimeout(function () { if (drawerClose) drawerClose.focus(); }, 50); }
    else if (menuBtn) { menuBtn.focus({ preventScroll: true }); }
  }
  if (menuBtn) menuBtn.addEventListener('click', function () { setDrawer(true); });
  if (drawerClose) drawerClose.addEventListener('click', function () { setDrawer(false); });
  if (backdrop) backdrop.addEventListener('click', function () { setDrawer(false); });
  // Links close the drawer; the browser then performs the anchor scroll (page scrolling is already restored)
  $$('#mobile-nav a').forEach(function (a) { a.addEventListener('click', function () { setDrawer(false); }); });
  document.addEventListener('keydown', function (e) {
    if (!drawerOpen) return;
    if (e.key === 'Escape') { setDrawer(false); return; }
    if (e.key === 'Tab') { // keep focus inside the open drawer
      var f = $$('a[href], button', drawer).filter(function (el) { return el.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  // The drawer is mobile-only: close it if the viewport grows to desktop width
  window.addEventListener('resize', function () { if (drawerOpen && window.innerWidth >= 992) setDrawer(false); });

  /* ---------- Generic slider helper ---------- */
  function makeSlider(opts) {
    var idx = 0, timer = null;
    function show(i) {
      idx = (i + opts.count) % opts.count;
      opts.render(idx);
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function start() {
      if (reduceMotion || timer || !opts.interval) return;
      timer = setInterval(function () { show(idx + 1); }, opts.interval);
    }
    function go(i) { stop(); show(i); start(); }
    return { show: show, go: go, next: function () { go(idx + 1); }, prev: function () { go(idx - 1); }, start: start, stop: stop, get index() { return idx; } };
  }

  /* ---------- Hero slider ---------- */
  var heroSlides = $$('.hero-slide');
  var heroNums = $$('.hero-nums button');
  if (heroSlides.length) {
    var hero = makeSlider({
      count: heroSlides.length,
      interval: 7000,
      render: function (i) {
        heroSlides.forEach(function (s, n) { s.classList.toggle('is-active', n === i); });
        heroNums.forEach(function (b, n) {
          b.classList.toggle('is-active', n === i);
          b.setAttribute('aria-selected', String(n === i));
        });
      }
    });
    heroNums.forEach(function (b) { b.addEventListener('click', function () { hero.go(parseInt(b.dataset.go, 10)); }); });
    var hp = $('[data-hero="prev"]'), hn = $('[data-hero="next"]');
    if (hp) hp.addEventListener('click', hero.prev);
    if (hn) hn.addEventListener('click', hero.next);
    document.addEventListener('visibilitychange', function () { document.hidden ? hero.stop() : hero.start(); });
    // Touch / pen swipe (horizontal only; vertical scrolling is left to the browser via touch-action: pan-y)
    var heroEl = $('#hero'), sx = 0, sy = 0, swiping = false;
    if (heroEl) {
      heroEl.addEventListener('pointerdown', function (e) {
        if (e.pointerType === 'mouse' || e.target.closest('a, button')) return;
        swiping = true; sx = e.clientX; sy = e.clientY;
      });
      heroEl.addEventListener('pointerup', function (e) {
        if (!swiping) return;
        swiping = false;
        var dx = e.clientX - sx, dy = e.clientY - sy;
        if (Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy) * 1.5) { dx < 0 ? hero.next() : hero.prev(); }
      });
      heroEl.addEventListener('pointercancel', function () { swiping = false; });
    }
    hero.start();
  }

  /* ---------- Hair goals slider ---------- */
  var goalSlides = $$('.goal-slide');
  var goalTabs = $$('.goal-tab');
  var goalBox = $('#goals-slider-container');
  if (goalSlides.length) {
    var goals = makeSlider({
      count: goalSlides.length,
      interval: 5500,
      render: function (i) {
        goalSlides.forEach(function (s, n) { s.classList.toggle('is-active', n === i); s.setAttribute('aria-hidden', String(n !== i)); });
        goalTabs.forEach(function (t, n) { t.classList.toggle('is-active', n === i); t.setAttribute('aria-selected', String(n === i)); });
      }
    });
    goalTabs.forEach(function (t) { t.addEventListener('click', function () { goals.go(parseInt(t.dataset.goalTab, 10)); }); });
    var gp = $('[data-goal-nav="prev"]'), gn = $('[data-goal-nav="next"]');
    if (gp) gp.addEventListener('click', goals.prev);
    if (gn) gn.addEventListener('click', goals.next);
    if (goalBox) {
      goalBox.addEventListener('mouseenter', goals.stop);
      goalBox.addEventListener('mouseleave', goals.start);
      goalBox.addEventListener('focusin', goals.stop);
      goalBox.addEventListener('touchstart', goals.stop, { passive: true });
    }
    goals.start();
  }

  /* ---------- Product gallery (any number of thumbnails) ---------- */
  var mainImg = $('#gallery-main-image');
  var thumbBox = $('.gallery-thumbs');
  var thPrev = $('#thumb-prev'), thNext = $('#thumb-next');
  function updateStrip() {
    if (!thumbBox) return;
    var max = thumbBox.scrollWidth - thumbBox.clientWidth;
    var scrollable = max > 2;
    [thPrev, thNext].forEach(function (b) { if (b) b.hidden = !scrollable; });
    if (thPrev) thPrev.disabled = thumbBox.scrollLeft <= 2;
    if (thNext) thNext.disabled = thumbBox.scrollLeft >= max - 2;
  }
  if (thumbBox) {
    thumbBox.addEventListener('click', function (e) {
      var btn = e.target.closest('.gallery-thumb');
      if (!btn || !mainImg || btn.classList.contains('is-active')) return;
      $$('.gallery-thumb', thumbBox).forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      mainImg.classList.add('is-fading');
      setTimeout(function () {
        mainImg.src = btn.dataset.src;
        mainImg.alt = btn.dataset.alt || '';
        mainImg.classList.remove('is-fading');
      }, 150);
      // keep the chosen thumbnail inside the strip (without scrolling the page)
      var l = btn.offsetLeft - thumbBox.offsetLeft, r = l + btn.offsetWidth;
      if (l < thumbBox.scrollLeft) thumbBox.scrollTo({ left: l - 4, behavior: 'smooth' });
      else if (r > thumbBox.scrollLeft + thumbBox.clientWidth) thumbBox.scrollTo({ left: r - thumbBox.clientWidth + 4, behavior: 'smooth' });
    });
    var step = function (dir) { thumbBox.scrollBy({ left: dir * Math.max(thumbBox.clientWidth * 0.8, 80), behavior: 'smooth' }); };
    if (thPrev) thPrev.addEventListener('click', function () { step(-1); });
    if (thNext) thNext.addEventListener('click', function () { step(1); });
    thumbBox.addEventListener('scroll', updateStrip, { passive: true });
    window.addEventListener('resize', updateStrip);
    if (window.MutationObserver) new MutationObserver(updateStrip).observe(thumbBox, { childList: true }); // thumbnails added later
    window.addEventListener('load', updateStrip);
    updateStrip();
  }

  /* ---------- Quantity + cart (localStorage, frontend only) ---------- */
  var MAX_QTY = 6, CART_KEY = 'rejuv4all_cart';
  var qtyInput = $('#product-quantity');
  var cartCount = $('#cart-count');
  var cartMsg = $('#cart-msg');
  var addBtn = $('#add-to-cart');
  var PRODUCT = { id: 'rejuv4all-hair-elixir-50ml', name: 'Rejuv4All Botanical Restorative Hair Elixir', price: 68, currency: 'USD' };

  // Hero CTA price: always taken from PRODUCT (the same data the cart and Add to Cart label use)
  var heroPrice = $('#hero-price');
  if (heroPrice && typeof PRODUCT.price === 'number') {
    heroPrice.textContent = '$' + PRODUCT.price.toFixed(2);
    heroPrice.hidden = false;
  }

  function readCart() {
    try { var c = JSON.parse(localStorage.getItem(CART_KEY)); return c && Array.isArray(c.items) ? c : { items: [] }; }
    catch (e) { return { items: [] }; }
  }
  function writeCart(cart) { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) { /* storage unavailable */ } }
  function totalQty(cart) { return cart.items.reduce(function (n, it) { return n + it.qty; }, 0); }
  function renderCount(bump) {
    if (!cartCount) return;
    var n = totalQty(readCart());
    cartCount.textContent = n;
    cartCount.hidden = n === 0;
    var dc = $('#drawer-cart-count'); if (dc) { dc.textContent = n; dc.hidden = n === 0; }
    if (bump) { cartCount.classList.remove('bump'); void cartCount.offsetWidth; cartCount.classList.add('bump'); }
  }
  function getQty() { var q = parseInt(qtyInput && qtyInput.value, 10); return isNaN(q) ? 1 : q; }
  function setQty(q) {
    q = Math.max(1, Math.min(MAX_QTY, q));
    if (qtyInput) qtyInput.value = q;
    if (addBtn) addBtn.textContent = 'Add to Cart — $' + (PRODUCT.price * q).toFixed(2);
  }
  var minus = $('#qty-minus'), plus = $('#qty-plus');
  if (minus) minus.addEventListener('click', function () { setQty(getQty() - 1); });
  if (plus) plus.addEventListener('click', function () { setQty(getQty() + 1); });

  function addToCart() {
    var cart = readCart(), qty = getQty();
    var line = cart.items.filter(function (it) { return it.id === PRODUCT.id; })[0];
    if (line) line.qty = Math.min(MAX_QTY, line.qty + qty);
    else cart.items.push({ id: PRODUCT.id, name: PRODUCT.name, price: PRODUCT.price, currency: PRODUCT.currency, qty: qty });
    writeCart(cart);
    renderCount(true);
    return qty;
  }
  if (addBtn) addBtn.addEventListener('click', function () {
    var q = addToCart();
    if (cartMsg) cartMsg.textContent = q + ' × Rejuv4All Hair Elixir added to your cart.';
  });
  var buyNow = $('#buy-now');
  if (buyNow) buyNow.addEventListener('click', function () {
    addToCart();
    if (cartMsg) cartMsg.textContent = 'Added to your cart. Checkout will be available soon.';
  });
  setQty(1);
  renderCount(false);

  /* ---------- Formula timeline: scroll-driven line fill (reversible) ---------- */
  var tlWrap = $('.timeline-wrap');
  if (tlWrap) {
    var tlDesktop = $('.timeline');
    var tlMobile = $('.timeline-m');
    var tlTicking = false;
    var clamp01 = function (v) { return Math.max(0, Math.min(1, v)); };
    var updateTimeline = function () {
      tlTicking = false;
      var r = tlWrap.getBoundingClientRect();
      var vh = window.innerHeight;
      // 0 when the block enters the viewport (80% down), 1 when its bottom reaches that same line
      var p = clamp01((vh * 0.8 - r.top) / r.height);
      if (tlDesktop && tlDesktop.offsetParent !== null) {
        var track = $('.tl-track', tlDesktop), lines = $$('.tl-line', track);
        var tr = track.getBoundingClientRect(), pos = p * tr.width;
        $$('.tl-badge', track).forEach(function (bd) {
          var br = bd.getBoundingClientRect();
          bd.classList.toggle('is-active', p > 0 && pos >= br.left - tr.left);
        });
        lines.forEach(function (ln) {
          var lr = ln.getBoundingClientRect();
          var f = lr.width ? clamp01((pos - (lr.left - tr.left)) / lr.width) : 0;
          $('.tl-fill', ln).style.setProperty('--fill', f.toFixed(4));
        });
      }
      if (tlMobile && tlMobile.offsetParent !== null) {
        var mr = tlMobile.getBoundingClientRect();
        var mp = clamp01((vh * 0.8 - mr.top) / mr.height);
        $('.tlm-fill', tlMobile).style.setProperty('--fill', mp.toFixed(4));
        $$('.tl-badge', tlMobile).forEach(function (bd) {
          bd.classList.toggle('is-active', mp > 0 && mp * mr.height >= bd.getBoundingClientRect().top - mr.top);
        });
      }
    };
    var requestTl = function () { if (!tlTicking) { tlTicking = true; requestAnimationFrame(updateTimeline); } };
    window.addEventListener('scroll', requestTl, { passive: true });
    window.addEventListener('resize', requestTl);
    updateTimeline();
  }

  /* ---------- Testimonials: Owl Carousel 2 ---------- */
  var $reviews = window.jQuery && window.jQuery('.review-carousel');
  if ($reviews && $reviews.length && window.jQuery.fn.owlCarousel && !$reviews.hasClass('owl-loaded')) {
    var cards = $$('.review-carousel > .review');
    // Only 3 reviews exist: repeat them (as hidden-from-AT clones) so the carousel has something to advance through
    if (cards.length <= 3) {
      cards.forEach(function (c) { var cl = c.cloneNode(true); cl.setAttribute('aria-hidden', 'true'); c.parentNode.appendChild(cl); });
    }
    $reviews.owlCarousel({
      loop: true,
      margin: 24,
      nav: true,
      dots: false,
      navText: ['<i class="fa-solid fa-chevron-left" aria-hidden="true"></i><span class="visually-hidden">Previous review</span>', '<i class="fa-solid fa-chevron-right" aria-hidden="true"></i><span class="visually-hidden">Next review</span>'],
      autoplay: !reduceMotion,
      autoplayTimeout: 5500,
      autoplayHoverPause: true,
      smartSpeed: 900,
      slideBy: 1,
      responsive: { 0: { items: 1 }, 768: { items: 2 }, 992: { items: 3 } }
    });
  }

  /* ---------- FAQ: one open at a time ---------- */
  var faqs = $$('.faq-item');
  faqs.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) faqs.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  /* ---------- Newsletter (placeholder, no backend) ---------- */
  var form = $('#newsletter-form'), nlMsg = $('#newsletter-msg');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (nlMsg) nlMsg.textContent = 'Thank you — subscription will be enabled soon.';
    form.reset();
  });

  /* ---------- Scroll reveal (subtle, once per element) ---------- */
  // [selector, effect, stagger step in ms]. Effects: up | left | right | fade
  var REVEALS = [
    ['.section-head', 'up', 0],
    ['#story .col-lg-6', 'left', 0],
    ['#story .frame-card', 'right', 0],
    ['.stage-card', 'up', 110],
    ['.shop .gallery-main', 'left', 0],
    ['.shop .gallery-strip', 'left', 0],
    ['.shop .col-lg-5 > *', 'right', 70],
    ['#ritual .frame-card', 'left', 0],
    ['.steps li', 'up', 90],
    ['.pillar', 'up', 100],
    ['.timeline-wrap > .text-center', 'up', 0],
    ['#goals .goals', 'fade', 0],
    ['.review-slider', 'fade', 0],
    ['.faq-item', 'up', 60],
    ['.final-inner > *', 'up', 80],
    ['.site-footer .row > div', 'fade', 90]
  ];
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var revealIO = new IntersectionObserver(function (entries) {
      var i = 0; // elements that enter together are staggered in DOM order
      entries.filter(function (en) { return en.isIntersecting; }).forEach(function (en) {
        var el = en.target;
        revealIO.unobserve(el);
        var delay = Math.min(i * (parseInt(el.dataset.rvStep, 10) || 0), 420);
        i++;
        el.style.setProperty('--rv-delay', delay + 'ms');
        el.classList.add('rv-in');
        // Once finished, drop the helper classes so the element's own hover/transition styles apply again
        setTimeout(function () {
          el.classList.remove('rv', 'rv-in', 'rv-up', 'rv-left', 'rv-right', 'rv-fade');
          el.style.removeProperty('--rv-delay');
        }, 1000 + delay);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    REVEALS.forEach(function (r) {
      $$(r[0]).forEach(function (el) {
        el.classList.add('rv', 'rv-' + r[1]);
        el.dataset.rvStep = r[2];
        revealIO.observe(el);
      });
    });
  }

  /* ---------- Placeholder links (href="#") should not jump ---------- */
  $$('a[href="#"]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); }); });
})();
