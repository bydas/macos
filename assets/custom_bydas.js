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
    // Utilizamos as propriedades do Flickity para determinar as larguras
    var totalWidth = flkty.slideableWidth;
    var visibleWidth = flkty.size.innerWidth;
    var buttonsNeeded = totalWidth > visibleWidth;

    // Os botões de navegação são inseridos no wrapper do Flickity,
    // pelo que procuramos no elemento que contém a classe .flickity-enabled.
    var $carouselWrapper = $carousel.closest('.flickity-enabled');
    var $prevBtn = $carouselWrapper.find('.flickity-prev-next-button.previous');
    var $nextBtn = $carouselWrapper.find('.flickity-prev-next-button.next');

    if (buttonsNeeded) {
      $prevBtn.show();
      $nextBtn.show();
    } else {
      $prevBtn.hide();
      $nextBtn.hide();
    }
  }

  // Disparamos a função quando o Flickity estiver pronto ou quando se settle (estabiliza)
  $carousel.on('ready.flickity settle.flickity', updateNavButtons);

  // Chamada imediata após inicialização
  updateNavButtons();

  // Recalcular ao redimensionar a janela
  $(window).on('resize', function () {
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






















