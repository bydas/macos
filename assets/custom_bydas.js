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
    var totalWidth = flkty.slideableWidth;
    var visibleWidth = flkty.size.innerWidth;
    var buttonsNeeded = totalWidth > visibleWidth;

    var $carouselWrapper = $carousel.closest('.flickity-enabled');
    var $prevBtn = $carouselWrapper.find('.flickity-prev-next-button.previous');
    var $nextBtn = $carouselWrapper.find('.flickity-prev-next-button.next');

    if (buttonsNeeded) {
      $prevBtn.show();
      $nextBtn.show();

      // If there's overflow, align items to the left
      if (flkty.options.cellAlign !== 'left') {
        flkty.options.cellAlign = 'left';
        flkty.resize(); // Force Flickity to recalculate layout
      }
    } else {
      $prevBtn.hide();
      $nextBtn.hide();

      // If there's no overflow, center the items
      if (flkty.options.cellAlign !== 'center') {
        flkty.options.cellAlign = 'center';
        flkty.resize(); // Recalculate layout with centered alignment
      }
    }
  }

  // Run the function when Flickity is ready and after each scroll settles
  $carousel.on('ready.flickity settle.flickity', updateNavButtons);

  // Initial run and also on window resize
  updateNavButtons();
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

















