// ── LIGHTBOX ──────────────────────────────────────────
var lbImages  = [];
var lbIndex   = 0;
var lbCaption = '';

function openLightbox(images, startIndex, caption) {
  lbImages  = images;
  lbIndex   = startIndex;
  lbCaption = caption || '';
  renderLightbox();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function renderLightbox() {
  document.getElementById('lb-img').src = lbImages[lbIndex];
  document.getElementById('lb-caption').textContent = lbCaption;
  document.getElementById('lb-counter').textContent =
    (lbIndex + 1) + ' / ' + lbImages.length;
}

function lbPrev() {
  lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length;
  renderLightbox();
}

function lbNext() {
  lbIndex = (lbIndex + 1) % lbImages.length;
  renderLightbox();
}

document.addEventListener('keydown', function(e) {
  var lb = document.getElementById('lightbox');
  if (!lb || !lb.classList.contains('open')) return;
  if (e.key === 'ArrowLeft')  lbPrev();
  if (e.key === 'ArrowRight') lbNext();
  if (e.key === 'Escape')     closeLightbox();
});

document.addEventListener('DOMContentLoaded', function() {
  var lb = document.getElementById('lightbox');
  if (lb) {
    lb.addEventListener('click', function(e) {
      if (e.target === lb) closeLightbox();
    });
  }
});

// ── ABOUT GALLERY LIGHTBOX ─────────────────────────────
function initGallery() {
  var items = document.querySelectorAll('.gallery-item');
  if (!items.length) return;

  var allImgs     = [];
  var allCaptions = [];

  items.forEach(function(item) {
    var img     = item.querySelector('img');
    var titleEl = item.querySelector('.gallery-title');
    allImgs.push(img.src);
    allCaptions.push(titleEl ? titleEl.textContent : '');
  });

  items.forEach(function(item, i) {
    item.addEventListener('click', function() {
      openLightbox(allImgs, i, allCaptions[i]);
    });
  });
}

// ── PROJECT CARD DOTS + LIGHTBOX ──────────────────────
function initProjectCards() {
  var cards = document.querySelectorAll('.pcard');

  cards.forEach(function(card) {
    var imgs = card.querySelectorAll('.pcard-imgs img');
    var dots = card.querySelectorAll('.pdot');
    if (!imgs.length) return;

    var current = 0;

    function goTo(n) {
      imgs[current].classList.remove('active-img');
      if (dots[current]) dots[current].classList.remove('active');
      current = (n + imgs.length) % imgs.length;
      imgs[current].classList.add('active-img');
      if (dots[current]) dots[current].classList.add('active');
    }

    imgs[0].classList.add('active-img');
    if (dots[0]) dots[0].classList.add('active');

    dots.forEach(function(dot, i) {
      dot.addEventListener('click', function(e) {
        e.stopPropagation();
        goTo(i);
      });
    });

    // click image to open lightbox
    var imgWrap = card.querySelector('.pcard-imgs');
    var title   = card.querySelector('.pcard-body h3');
    imgWrap.addEventListener('click', function() {
      var srcs = [];
      imgs.forEach(function(img) { srcs.push(img.src); });
      openLightbox(srcs, current, title ? title.textContent.trim() : '');
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initGallery();
  initProjectCards();
});