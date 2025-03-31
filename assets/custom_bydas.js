/* ----- Flickity Carousel - CATEGORIES ----- */
$('#categories-carousel').flickity({
  groupCells: false,
  cellAlign: 'left',
  contain: true,
  freeScroll: false,
  pageDots: false,
  draggable: true
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
  isPaused = true; // true / false to pause on hover
});
$carousel.on('mouseleave', function() {
  isPaused = false;
});






















