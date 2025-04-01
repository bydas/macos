/* ----- Flickity Carousel - CATEGORIES ----- */
$(document).ready(function () {
  var $carousel = $('#categories-carousel');

  $carousel.flickity({
    groupCells: false,
    cellAlign: 'left',
    contain: true,
    freeScroll: false,
    pageDots: false,
    draggable: true
  });

  var flkty = $carousel.data('flickity');

  function updateNavButtons() {
    var $cells = $carousel.find('.carousel-cell');
    var totalWidth = 0;

    $cells.each(function () {
      totalWidth += $(this).outerWidth(true);
    });

    var visibleWidth = $carousel.width();
    var buttonsNeeded = totalWidth > visibleWidth;

    var $prevBtn = $carousel.find('.flickity-prev-next-button.previous');
    var $nextBtn = $carousel.find('.flickity-prev-next-button.next');

    if (buttonsNeeded) {
      $prevBtn.show();
      $nextBtn.show();
    } else {
      $prevBtn.hide();
      $nextBtn.hide();
    }
  }

  // Atualiza quando estiver pronto e quando redimensionares a janela
  $carousel.on('ready.flickity', updateNavButtons);
  $(window).on('resize', function () {
    // Pequeno atraso para garantir redimensionamento completo
    setTimeout(updateNavButtons, 100);
  });
});


/* ----- Flickity Carousel - SLIDESHOW ----- */
$('#highlights-slideshow').flickity({
  autoPlay: true,
  groupCells: false,
  cellAlign: 'left',
  contain: true,
  pageDots: true,
  draggable: true,
  resize: true,
  adaptiveHeight: false,
  wrapAround: true
});

$(window).on('resize', function() {
  $('#highlights-slideshow').flickity('resize');
});


/* ----- Flickity Carousel - BRANDS ----- */
var $carousel = $('#main-carousel').flickity({
  autoPlay: false,
  wrapAround: true,
  freeScroll: true,
  contain: true,
  prevNextButtons: false,
  pageDots: false,
  cellAlign: 'left',
  contain: true
});

// start continuous scroll
let flkty = $carousel.data('flickity');
let isPaused = false; // pause control

function flickityMarquee() {
  if (!isPaused) {
    flkty.x -= 1; // change the number to adjust the speed
    flkty.positionSlider(); // aplies the movement
  }
  requestAnimationFrame(flickityMarquee);
}

// starts continuous animation
flickityMarquee();

// pause on hover
$carousel.on('mouseenter', function() {
  isPaused = false; // true / false to pause on hover
});
$carousel.on('mouseleave', function() {
  isPaused = false;
});






















