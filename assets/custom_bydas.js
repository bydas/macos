// CREATE NEW ACCOUNT FORM
(function () {
  // 1) Obtém o formulário de registo
  const registerForm = document.getElementById('create_customer');
  if (!registerForm) return;

  // 2) Função auxiliar para ler valores por ID
  function readValue(inputId) {
    const el = document.getElementById(inputId);
    return (el && typeof el.value === 'string') ? el.value.trim() : '';
  }

  // 3) Ao submeter, serializa os campos para customer[note]
  registerForm.addEventListener('submit', function () {
    // Captura dos teus campos
    const company          = readValue('RegisterForm-Company');
    const companyVat       = readValue('RegisterForm-CompanyNif');   // NIF/VAT
    const businessActivity = readValue('RegisterForm-Activity');
    const companyAddress   = readValue('RegisterForm-CompanyAddress');
    const contactPhone     = readValue('RegisterForm-ContactPhone');

    // Versão legível em texto (multi-linha)
    const noteReadable =
      'Dados de registo:\n' +
      'Empresa: ' + (company || '-') + '\n' +
      'NIF: ' + (companyVat || '-') + '\n' +
      'Área de atividade: ' + (businessActivity || '-') + '\n' +
      'Morada: ' + (companyAddress || '-') + '\n' +
      'Telefone: ' + (contactPhone || '-');

    // 4) Coloca o valor no hidden customer[note]
    const noteInput = document.getElementById('RegisterForm-Note');
    if (noteInput) {
      noteInput.value = noteReadable;
    }
  });
})();

// ------------------------- ########### -------------------------

// Bootstrap Popover Initialization
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]') ?? null;
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

// ------------------------- ########### -------------------------

/* ----- Flickity Carousel - CATEGORIES ----- */
$(document).ready(function () {
  var $carousel = $('#categories-carousel');
  if (!$carousel.length) return;
  var groupCells = 0;

  // breakpoints for groupcells
  if (window.innerWidth <= 578) {
    groupCells = 2;

  } else if (window.innerWidth <= 1100) {
    groupCells = 4;

  } else if (window.innerWidth <= 1300){
    groupCells = 5;

  } else {
    groupCells = 6;
  }

  $carousel.flickity({
    groupCells: groupCells,
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

// ------------------------- ########### -------------------------

// ### SUBCATEGORIES DROPDOWN ###
document.addEventListener('DOMContentLoaded', function() {
  
  /* Variáveis para controlar qual dropdown está aberto */
  let openCard = null;
  let openDropdown = null;
  let popperInstance = null;
  
  /* Função para fechar o dropdown atualmente aberto */
  function closeOpenDropdown() {
    if (openDropdown && openCard) {
      openDropdown.style.display = 'none';
      openCard.appendChild(openDropdown);
      if (popperInstance) {
        popperInstance.destroy();
        popperInstance = null;
      }
      // Remove a classe active do cartão
      openCard.classList.remove('card-active');
      openDropdown = null;
      openCard = null;
    }
  }
  
  /* Fecha o dropdown se o utilizador clicar fora dele */
  document.addEventListener('click', function(event) {
    if (openDropdown && openCard) {
      if (!openCard.contains(event.target) && !openDropdown.contains(event.target)) {
        closeOpenDropdown();
      }
    }
  });
  
  /* Percorre cada cartão de categoria */
  document.querySelectorAll('.category-card').forEach(function(card) {
    
    const dropdown = card.querySelector('.children-categories');
    if (!dropdown) return;
    
    // Verifica se existem subcategorias (pelo menos um link)
    const hasSubcategories = dropdown.querySelector('a') !== null;
    
    if (hasSubcategories) {
      
      // Ao clicar no cartão, em vez de ir para a categoria, abre o dropdown
      card.addEventListener('click', function(e) {
        
        // Se o clique for dentro do próprio dropdown (links), permite a interação
        if (dropdown.contains(e.target)) {
          return;
        }
        
        e.preventDefault();
        e.stopPropagation();
        
        // Se o mesmo cartão já estiver aberto, fecha-o
        if (openCard === card) {
          closeOpenDropdown();
          return;
        }
        
        // Fecha qualquer dropdown de outro cartão
        closeOpenDropdown();
        
        // Acrescenta a opção para ir para a categoria principal no topo,
        // com o texto "Explorar *nome da categoria*"
        if (!dropdown.querySelector('.main-category-link')) {
          const mainLink = document.createElement('a');
          mainLink.className = 'main-category-link';
          const categoryName = card.querySelector('.category-title a').textContent;
          mainLink.textContent = 'Explorar ' + categoryName;
          mainLink.href = card.querySelector('.category-title a').href;
          dropdown.insertBefore(mainLink, dropdown.firstChild);
        }
        
        // Move o dropdown para o portal
        document.getElementById('dropdown-portal').appendChild(dropdown);
        dropdown.style.display = 'block';
        dropdown.style.position = 'absolute';
        
        // Cria a instância Popper para posicionar o dropdown abaixo do cartão
        popperInstance = Popper.createPopper(card, dropdown, {
          placement: 'bottom-start',
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 4]
              }
            }
          ]
        });
        
        // Atualiza as referências e adiciona a classe active ao cartão
        openCard = card;
        openDropdown = dropdown;
        card.classList.add('card-active');
      });
      
    }
    // Se não houver subcategorias, mantém o comportamento normal (navegação)
    
  });
  
});

// ------------------------- ########### -------------------------

/* ----- Flickity Carousel - HIGHLIGHTS SLIDESHOW ----- */
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

// ------------------------- ########### -------------------------

/* ----- FEATURED COLLECTION (desktop)----- */
function setupFeaturedCollection() {
  document.querySelectorAll('.section-featured-collection').forEach(section => {
    const track   = section.querySelector('.slider');
    const prevBtn = section.querySelector('.slider-button--prev');
    const nextBtn = section.querySelector('.slider-button--next');
    if (!track || !prevBtn || !nextBtn) return;

    const breakpoint = window.innerWidth >= 1450;
    
    const sliderCounterContainer = section.querySelector(".slider-counter");
    sliderCounterContainer.style.display = breakpoint ? "none" : "block";

    const svgWrapperDesktop = section.querySelectorAll(".custom-position-btns .svg-wrapper-desktop");
    const svgWrapper = section.querySelectorAll(".custom-position-btns .svg-wrapper");

    svgWrapperDesktop.forEach(el => {
      el.style.display = breakpoint ? "inline-flex" : "none";
    });

    svgWrapper.forEach(el => {
      el.style.display = breakpoint ? "none" : "inline-flex";
    });
    
    if (breakpoint) {

      // Lê sempre estes valores actualizados
      function recalc() {
        const style     = getComputedStyle(track);
        const gap       = parseFloat(style.getPropertyValue('column-gap')) || 0;
        const pageWidth = track.clientWidth;
        const scrollAmt = pageWidth + gap;
        const maxScroll = track.scrollWidth - pageWidth;
        // Calcula quantas “páginas” cabem até ao maxScroll
        const totalPages = Math.ceil(maxScroll / scrollAmt) + 1;
        return { gap, pageWidth, scrollAmt, maxScroll, totalPages };
      }
  
      function getPageIndex(scrollAmt) {
        // Índice arredondado para o mais próximo
        return Math.round(track.scrollLeft / scrollAmt);
      }
  
      // Handler genérico
      function onNav(dir) {
        const { scrollAmt, maxScroll, totalPages } = recalc();
        const currentPage = getPageIndex(scrollAmt);
        // Novo índice limitado a [0, totalPages-1]
        let targetPage = Math.min(Math.max(currentPage + dir, 0), totalPages - 1);
        // Calcula o novo scrollLeft
        const targetLeft = Math.min(targetPage * scrollAmt, maxScroll);
        track.scrollTo({ left: targetLeft, behavior: 'smooth' });
      }
  
      prevBtn.addEventListener('click', evt => {
        evt.stopImmediatePropagation();
        evt.preventDefault();
        onNav(-1);
      }, { capture: true });
  
      nextBtn.addEventListener('click', evt => {
        evt.stopImmediatePropagation();
        evt.preventDefault();
        onNav(+1);
      }, { capture: true });
      
    }
  });
}
document.addEventListener("DOMContentLoaded", setupFeaturedCollection);
window.addEventListener("resize", setupFeaturedCollection);
  
// ------------------------- ########### -------------------------

// BOTÃO VISUALIZAR PASSWORD
document.addEventListener("DOMContentLoaded", () => {

  const passwordWrapper = document.querySelectorAll(".password-wrapper");
  if (!passwordWrapper) return;

  passwordWrapper.forEach(wrapper => {

    const passwordInput = wrapper.querySelector("input[type='password']");
    const seePasswordBtn = wrapper.querySelector(".view-password-btn");
    // if (!pwViewButton) continue;
    
    seePasswordBtn.addEventListener("click", (e) => {

      if (e) e.preventDefault();

      console.log(wrapper)

    });
  });



});












