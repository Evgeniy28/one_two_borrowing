console.log('Hello World!');

$(document).ready(function() {
  // Go section recomendation
  $('.go-info').on('click', function(e) {
    $('html,body').stop().animate({
      scrollTop: $('.recomendation').offset().top
    }, 1500);
    e.preventDefault();
  });

  // Go section about-company
  $('.go-about').on('click', function(e) {
    $('html,body').stop().animate({
      scrollTop: $('.about-company').offset().top
    }, 1500);
    e.preventDefault();
  });

  // Go section header
  $('.go-top-btn').on('click', function(e) {
    $('html,body').stop().animate({
      scrollTop: $('.header').offset().top
    }, 1500);
    e.preventDefault();
  });
});
