(function ($) {
  "use strict";

  //$("body").niceScroll();

  // Preloader (if the #preloader div exists)
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.whats-float-button').fadeIn('slow');
    } else {
      $('.whats-float-button').fadeOut('slow');
    }
  });

  // Initiate the wowjs animation library
  new WOW().init();

  // Header scroll class
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Smooth scroll for the navigation and links with .scrollto classes
  $('.main-nav a, .mobile-nav a, .scrollto').on('click', function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if (! $('#header').hasClass('header-scrolled')) {
            top_space = top_space - 40;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.main-nav, .mobile-nav').length) {
          $('.main-nav .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.main-nav, .mobile-nav');
  var main_nav_height = $('#header').outerHeight();

  $(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop();
  
    nav_sections.each(function() {
      var top = $(this).offset().top - main_nav_height,
          bottom = top + $(this).outerHeight();
  
      if (cur_pos >= top && cur_pos <= bottom) {
        main_nav.find('li').removeClass('active');
        main_nav.find('a[href="#'+$(this).attr('id')+'"]').parent('li').addClass('active');
      }
    });
  });

  // jQuery counterUp (used in Whu Us section)
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Tranferencia bancaria
  $('.transferencia').click(function(){
    var id = $(this).attr('id');
    if($('#'+id+'-box.conta_banco').hasClass('fechado')){
      $('#'+id+'-box.conta_banco').removeClass('fechado').fadeIn().addClass('aberto');
    }else{
      $('#'+id+'-box.conta_banco').removeClass('aberto').fadeOut().addClass('fechado');
    }
  });

  // novidades carousel (uses the Owl Carousel library)
  $(".novidades-carousel").owlCarousel({
    autoplay: true,
    autoplayHoverPause: true,
    center: true,
    dots: true,
    loop: true,
    responsive: { 0: { items: 1 }, 768: { items: 2 }, 900: { items: 2 }
    }
  });

  // Abre o modal e inicia o vídeo
  $('img.current-bto-play').click(function(){
    var theModal = $(this).data("target"),
    videoSRC = $(this).attr("data-video"),
    videoSRCauto = videoSRC + "?modestbranding=1&rel=0&controls=0&showinfo=0&html5=1";
    $(theModal + ' iframe').attr('src', videoSRCauto);

  });

  $('#videoModal').on('shown.bs.modal', function (e) {
    var src = $('iframe', this).attr('src');
    $('iframe', this).attr('src', src + "&autoplay=1" ); 
  });
  
  // Fecha o modal e para o vídeo
  $('#videoModal').on('hide.bs.modal', function(e) {    
      var $if = $(e.delegateTarget).find('iframe');
      var src = $if.attr("src");
      $if.attr("src", '/empty.html');
  });

  // $(window).on('load', function () {
    
  //     function acionarModal() {
  //       // Modal
  //       $('html').mouseleave(function() {
  //         if(window.outerWidth > 767){
  //           $('.modal-aproveite.ativo').css('display', 'flex');
  //         }else{
  //           $('.modal-aproveite.ativo').css('display', 'block');
  //         }
  //       });
  //       $('.modal-aproveite .bto-ficar, .modal-aproveite .fechar').on('click', function(){
  //         $('.modal-aproveite').removeClass('ativo').addClass('inativo').fadeOut();
  //       });
  //     }
  //     setTimeout(acionarModal, 180000); // 60000 = 1 minuto
  // });

  

})(jQuery);

