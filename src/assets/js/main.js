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

  // Open Modal Form
  function removeError() {
    if ($('.modal-form').hasClass('modal-error')) {
      $('.modal-form').removeClass('modal-error');
    }
  };

  $('.call-me').on('click', function(e) {
    e.preventDefault();
    removeError();
    $('.modal').addClass('is-active');
    $('.form-for-me').addClass('is-form-show');
  });

  $('.call-friend').on('click', function(e) {
    e.preventDefault();
    removeError();
    $('.modal').addClass('is-active');
    $('.form-for-friend').addClass('is-form-show');
  });

  // Close Modal Form button
  $('.modal-close').on('click', function(e) {
    e.preventDefault();
    if ($('.modal').hasClass('is-active')) {
      $('.modal').removeClass('is-active');
      $('.form-for-me').removeClass('is-form-show');
      $('.form-for-friend').removeClass('is-form-show');
      $('.form-for-me input').removeClass('is-danger');
      $('.form-for-friend input').removeClass('is-danger');
    }
  });

  // Close Modal Form esc
  $(window).on('keydown', function(e) {
    if (e.keyCode === 27) {
      if ($('.modal').hasClass('is-active')) {
        $('.modal').removeClass('is-active');
        $('.form-for-me').removeClass('is-form-show');
        $('.form-for-friend').removeClass('is-form-show');
        $('.form-for-me input').removeClass('is-danger');
        $('.form-for-friend input').removeClass('is-danger');

      }
    }
  });

  /// Validate form ///

  // Form for me
  $('.form-for-me .modal-form').on('submit', function(e) {
    var name = document.querySelector('.form-for-me [name=name]');
    var phone = document.querySelector('.form-for-me [name=tel]');
    var checkbox = document.querySelector('.form-for-me [name=checkbox]');

    if (!name.value || !phone.value || !checkbox.checked) {
      e.preventDefault();
      $('.form-for-me .modal-form').addClass('modal-error');
    }
  });

  // Form for friend
  $('.form-for-friend .modal-form').on('submit', function(e) {
    var name = document.querySelector('.form-for-friend [name=name]');
    var phone = document.querySelector('.form-for-friend [name=tel]');
    var yourName = document.querySelector('.form-for-friend [name=your_name]');
    var checkbox = document.querySelector('.form-for-friend [name=checkbox]');

    if (!name.value || !phone.value || !yourName.value || !checkbox.checked) {
      e.preventDefault();
      $('.form-for-friend .modal-form').addClass('modal-error');
    }
  });

  // Customer form
  $('.customer-form').on('submit', function(e) {
    var name = document.querySelector('.customer-form [name=name]');
    var phone = document.querySelector('.customer-form [name=tel]');
    var checkbox = document.querySelector('.customer-form [name=checkbox]');

    if (!name.value || !phone.value || !checkbox.checked) {
      e.preventDefault();
      $('.customer-form').addClass('modal-error');
    }
  });
});
