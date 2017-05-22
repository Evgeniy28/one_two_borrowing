$(function() {
  function scrollToSection(classLink, classSection) {
    $(classLink).on('click', function(e) {
      e.preventDefault();
      $('html,body').stop().animate({
        scrollTop: $(classSection).offset().top
      }, 1500);
    });
  };

  // Go section recomendation
  scrollToSection('.go-info', '.recomendation');

  // Go section about-company
  scrollToSection('.go-about', '.about-company');

  // Go section header
  scrollToSection('.go-top-btn', '.header');
});

$(function() {
  // Mask for number phone
  $('[name=tel]').mask('+7(999) 999-99-99');

  // Open Modal Form
  function openModalForm(classButton, classForm) {
    $(classButton).on('click', function(e) {
      e.preventDefault();
      $('.modal').addClass('is-active');
      $(classForm).addClass('is-form-show');
    });
  };
  openModalForm('.header-callback__btn', '.form-for-me');
  openModalForm('.call-me', '.form-for-me');
  openModalForm('.about-company__btn', '.form-for-me');
  openModalForm('.footer__btn', '.form-for-me');
  openModalForm('.call-friend', '.form-for-friend');

  // Close Modal Form
  function hideModalForm(classForm) {
    if ($('.modal').hasClass('is-active')) {
      $('.modal').removeClass('is-active');
      $(classForm).removeClass('is-form-show');
      $(classForm + ' input').removeClass('is-danger');
    }
  };

  function closeModalFormBtn(classForm) {
    $(classForm + ' .modal-close').on('click', function(e) {
      e.preventDefault();
      hideModalForm(classForm);
    });
  };
  closeModalFormBtn('.form-for-me form');
  closeModalFormBtn('.form-for-friend form');

  function closeModalFormEsc(classForm) {
    $(window).on('keydown', function(e) {
      if (e.keyCode === 27) {
        hideModalForm(classForm);
      }
    });
  };
  closeModalFormEsc('.form-for-me form');
  closeModalFormEsc('.form-for-friend form');

  /// SEND AJAX FORMS ///
  function addFormAnimationError(classForm) {
    $(classForm).addClass('modal-error');
    setTimeout(function() {
      $(classForm).removeClass('modal-error');
    }, 1500);
  };

  // Form for me
  $('.form-for-me .modal-form').submit(function(e) {
    var name = document.querySelector('.form-for-me [name=name]');
    var phone = document.querySelector('.form-for-me [name=tel]');
    var checkbox = document.querySelector('.form-for-me [name=checkbox]');
    var checkboxText = document.querySelector('.form-for-me .modal-form__checkbox-text');
    e.preventDefault();

    if (!name.value) {
      addFormAnimationError('.form-for-me');
      name.classList.add('is-danger');
    } else if (!phone.value) {
      addFormAnimationError('.form-for-me');
      name.classList.remove('is-danger');
      phone.classList.add('is-danger');
    } else if (!checkbox.checked) {
      addFormAnimationError('.form-for-me');
      name.classList.remove('is-danger');
      phone.classList.remove('is-danger');
      checkboxText.classList.add('errors-text');
    } else {
      console.log('ajax');
      console.log($(name).val());
      console.log($(phone).val());

      var postForm = {
        'name' : $(name).val(),
        'tel'  : $(phone).val()
      }

      $.ajax({
        type     : 'POST',
        url      : 'form.php',
        data     : postForm,
        dataType : 'json',
        success  : function(data) {
          if (!data.success) {
            if (data.errors.name) {
              console.log('errors', data.errors.name);
              addFormAnimationError('.form-for-me');
              $('.form-for-me .form-errors').fadeIn(1000).html(data.errors.name);
            }
          } else {
            $('.form-for-me .modal-form__title').fadeIn(1000).html("<p class=\"modal-form__title success-text\">" + data.posted + "</p>");
          }
        }
      });
    }
  });

  // Form for friend
  $('.form-for-friend .modal-form').submit(function(e) {
    var name = document.querySelector('.form-for-friend [name=name]');
    var phone = document.querySelector('.form-for-friend [name=tel]');
    var yourName = document.querySelector('.form-for-friend [name=your_name]');
    var checkbox = document.querySelector('.form-for-friend [name=checkbox]');
    var checkboxText = document.querySelector('.form-for-friend .modal-form__checkbox-text');
    e.preventDefault();

    if (!name.value) {
      addFormAnimationError('.form-for-friend');
      name.classList.add('is-danger');
    } else if (!phone.value) {
      addFormAnimationError('.form-for-friend');
      name.classList.remove('is-danger');
      phone.classList.add('is-danger');
    } else if (!yourName.value) {
      addFormAnimationError('.form-for-friend');
      name.classList.remove('is-danger');
      phone.classList.remove('is-danger');
      yourName.classList.add('is-danger');
    } else if (!checkbox.checked) {
      addFormAnimationError('.form-for-friend');
      name.classList.remove('is-danger');
      phone.classList.remove('is-danger');
      yourName.classList.remove('is-danger');
      checkboxText.classList.add('errors-text');
    } else {
      console.log('ajax');
      console.log($(name).val());
      console.log($(phone).val());
      console.log($(yourName).val());

      var postForm = {
        'name'      : $(name).val(),
        'tel'       : $(phone).val(),
        'your_name' : $(yourName).val()
      }

      $.ajax({
        type     : 'POST',
        url      : 'form_for_friend.php',
        data     : postForm,
        dataType : 'json',
        success  : function(data) {
          if (!data.success) {
            if (data.errors.name) {
              console.log('errors', data.errors.name);
              addFormAnimationError('.form-for-friend');
              $('.form-for-friend .form-errors').fadeIn(1000).html(data.errors.name);
            }
          } else {
            $('.form-for-friend .modal-form__title').fadeIn(1000).html("<p class=\"modal-form__title success-text\">" + data.posted + "</p>");
          }
        }
      });
    }
  });

  // Customer form
  $('.customer-form').submit(function(e) {
    var name = document.querySelector('.customer-form [name=name]');
    var phone = document.querySelector('.customer-form [name=tel]');
    var checkbox = document.querySelector('.customer-form [name=checkbox]');
    var checkboxText = document.querySelector('.customer-form .customer-form__checkbox-text');
    e.preventDefault();

    if (!name.value) {
      addFormAnimationError('.customer-form');
      name.classList.add('is-danger');
    } else if (!phone.value) {
      addFormAnimationError('.customer-form');
      name.classList.remove('is-danger');
      phone.classList.add('is-danger');
    } else if (!checkbox.checked) {
      addFormAnimationError('.customer-form');
      name.classList.remove('is-danger');
      phone.classList.remove('is-danger');
      checkboxText.classList.add('errors-text');
    } else {
      console.log('ajax');
      console.log($(name).val());
      console.log($(phone).val());

      var postForm = {
        'name' : $(name).val(),
        'tel'  : $(phone).val()
      }

      $.ajax({
        type     : 'POST',
        url      : 'form.php',
        data     : postForm,
        dataType : 'json',
        success  : function(data) {
          if (!data.success) {
            if (data.errors.name) {
              $('.customer-form .form-errors').fadeIn(1000).html(data.errors.name);
            }
          } else {
            $('.customer-form').fadeIn(1000).html('<p>' + data.posted + '</p>');
          }
        }
      });
    }
  });
});

$(function() {
  /// Scroll Reveal ///
  var bottom, bottomFast, top;
  window.sr = ScrollReveal();

  top = {
    origin: 'top',
    distance: '24px',
    duration: 1500,
    scale: 1.05
  };

  bottom = {
    origin: 'bottom',
    distance: '64px',
    duration: 900,
    delay: 1500,
    scale: 1
  };

  bottomFast = {
    origin: 'bottom',
    distance: '32px',
    duration: 600,
    delay: 800,
    scale: 0.9
  };

  // Header
  sr.reveal('.header__title', top);
  sr.reveal('.header__btn', top);

  // Information
  sr.reveal('.passport-icon', bottomFast);
  sr.reveal('.time-icon', bottomFast);
  sr.reveal('.percent-icon', bottomFast);
  sr.reveal('.call-icon', bottomFast);

  // Form
  sr.reveal('.customer-form', bottomFast);

  // Recomendation
  sr.reveal('.recomendation__title', top);
  sr.reveal('.recomendation__text', bottomFast);
  sr.reveal('.slider', bottomFast);
  sr.reveal('.button-wrapper', bottomFast);

  // About company
  sr.reveal('.about-company__title', top);
  sr.reveal('.about-company__info', bottomFast);
  sr.reveal('.about-company__btn', bottomFast);
});
