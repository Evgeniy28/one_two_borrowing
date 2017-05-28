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

  // Go section offices
  scrollToSection('.go-offices', '.offices');
});

$(function() {
  // Mask for number phone
  $('[name=tel]').mask('+7(999) 999-99-99');

  // Set checked checkbox
  $( '.customer-form__checkbox input' ).prop( 'checked', true );

  // Open Modal Form
  function openModalForm(classButton, classForm) {
    $(classButton).on('click', function(e) {
      e.preventDefault();
      $(classForm).addClass('is-active');
      $( classForm + ' .modal-form__checkbox input' ).prop( 'checked', true );
    });
  };
  openModalForm('.header-callback__btn', '.form-for-me');
  openModalForm('.call-me', '.form-for-me');
  openModalForm('.about-company__btn', '.form-for-me');
  openModalForm('.footer__btn', '.form-for-me');
  openModalForm('.call-friend', '.form-for-friend');

  // Close Modal Form
  function hideModalForm(classForm) {
    if ($(classForm).hasClass('is-active')) {
      $(classForm).removeClass('is-active');
      $(classForm + ' input').removeClass('is-danger');
    }
  };

  function closeModalFormBtn(classForm) {
    $(classForm + ' .modal-close').on('click', function(e) {
      e.preventDefault();
      hideModalForm(classForm);
    });
  };
  closeModalFormBtn('.form-for-me');
  closeModalFormBtn('.form-for-friend');

  function closeModalFormEsc(classForm) {
    $(window).on('keydown', function(e) {
      if (e.keyCode === 27) {
        hideModalForm(classForm);
      }
    });
  };
  closeModalFormEsc('.form-for-me');
  closeModalFormEsc('.form-for-friend');

  function closeModalFormAround(classForm) {
    $(classForm + ' .modal-background').on('click', function(e) {
      var form = $(classForm + ' .modal-form');

      if (!form.is(e.target) && form.has(e.target).length === 0) {
        $(classForm).removeClass('is-active');
        $(classForm + ' input').removeClass('is-danger');
      }
    });
  };
  closeModalFormAround('.form-for-me');
  closeModalFormAround('.form-for-friend');

  function closeModalImageAround(classOffice) {
    $(classOffice + ' .modal-background').on('click', function(e) {
      var content = $(classOffice + ' .modal-content');

      if (!content.is(e.target) && content.has(e.target).length === 0) {
        $(classOffice).removeClass('is-active');
      }
    });
  };
  closeModalImageAround('.image__office1');
  closeModalImageAround('.image__office2');

  /// SEND AJAX FORMS ///
  function addFormAnimationError(classForm) {
    $(classForm + ' form').addClass('modal-error');
    setTimeout(function() {
      $(classForm  + ' form').removeClass('modal-error');
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

      $('.form-for-me .modal-form__btn').addClass('is-loading');

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
              addFormAnimationError('.form-for-me');
              $('.form-for-me .form-errors').fadeIn(1000).html(data.errors.name);
            }
          } else {
            $('.form-for-me .modal-form__title').html(data.posted);
            $('.form-for-me .modal-form__title').addClass('success-text');
            $('.form-for-me input').val('');
            $('.form-for-me .modal-form__btn').removeClass('is-loading');
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

      $('.form-for-friend .modal-form__btn').addClass('is-loading');

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
              addFormAnimationError('.form-for-friend');
              $('.form-for-friend .form-errors').fadeIn(1000).html(data.errors.name);
            }
          } else {
            $('.form-for-friend .modal-form__title').html(data.posted);
            $('.form-for-friend .modal-form__title').addClass('success-text');
            $('.form-for-friend input').val('');
            $('.form-for-friend .modal-form__btn').removeClass('is-loading');
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
      addFormAnimationError('.form-js');
      name.classList.add('is-danger');
    } else if (!phone.value) {
      addFormAnimationError('.form-js');
      name.classList.remove('is-danger');
      phone.classList.add('is-danger');
    } else if (!checkbox.checked) {
      addFormAnimationError('.form-js');
      name.classList.remove('is-danger');
      phone.classList.remove('is-danger');
      checkboxText.classList.add('errors-text');
    } else {

      $('.customer-form .customer-form__btn').addClass('is-loading');

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
              $('.customer-form').fadeIn(1000).html('<p style="color: hsl(348, 100%, 61%);">' + data.errors.name + '</p>');
            }
          } else {
            $('.customer-form').fadeIn(1000).html('<p style="color: hsl(348, 100%, 61%);">' + data.posted + '</p>');
          }
        }
      });
    }
  });
});

/// Scroll Reveal ///
$(function() {
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
  // sr.reveal('.slider'); // смещает слайдер
  sr.reveal('.button-wrapper', bottomFast);

  // About company
  sr.reveal('.about-company__title', top);
  sr.reveal('.about-company__info', bottomFast);
  sr.reveal('.about-company__btn', bottomFast);
});

/// Swipe slider ///
$(function() {
  var element = document.getElementById('slider');
  window.mySwipe = new Swipe(element, {
    startSlide: 0,
    auto: 3500,
    draggable: true,
    autoRestart: true,
    continuous: true,
    disableScroll: true,
    stopPropagation: true,
    callback: function(index, element) {
      function isActive(i) {
        var paginationList = document.querySelector('.slider-pagination .slider-pagination__list').children;
        if (i == 0) {
          paginationList[i].classList.add('is-active-slide');
          paginationList[3].classList.remove('is-active-slide');
        } else {
          paginationList[i].classList.add('is-active-slide');
          paginationList[i - 1].classList.remove('is-active-slide');
        }
      };
      isActive(index);

    },
    transitionEnd: function(index, element) {}
  });

  // Change slider on click
  function set_handler(i) {
    return function (e) {
      var currentSlide = mySwipe.getPos();
      var links = $('.slider-pagination__list').find('.slider-pagination__link');
      links[currentSlide].classList.remove('is-active-slide');
      links[i].classList.add('is-active-slide');
      mySwipe.slide(i);
    };
  };

  function handlePaginationLink() {
    var links = $('.slider-pagination__list').find('.slider-pagination__link');
    i = 0;
    var countLinks = links.length;
    while (i < countLinks) {
      links[i].addEventListener('click', set_handler(i), false);
      i++;
    }
  };

  handlePaginationLink();

});

/// MAPS SECTION ///
$(function() {
  // Create yandex maps
  ymaps.ready(function () {
    var map1 = new ymaps.Map('yandex-map1', {
      center: [43.355302, 132.179872],
      zoom: 18,
      controls: ['zoomControl']
    }, {
      searchControlProvider: 'yandex#search'
    });

    var map2 = new ymaps.Map('yandex-map2', {
      center: [43.354305, 132.186286],
      zoom: 18,
      controls: ['zoomControl']
    }, {
      searchControlProvider: 'yandex#search'
    });

    map1.behaviors.disable('scrollZoom');
    map2.behaviors.disable('scrollZoom');

    // Check device is mobile
    var isMobile = {
      Android: function() {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
      },
      any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
      }
    };

    // Disable drag on mobile device
    if(isMobile.any()){
      map1.behaviors.disable('drag');
      map2.behaviors.disable('drag');
    }

    // Создание макета содержимого балуна.
    BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
      '<div class="map-mark">' +
        '<div class="map-mark__img">' +
          '<img src="assets/images/{{ properties.images }}" width="120" height="120" alt="">' +
        '</div>' +
        '<div class="map-mark__wrapper">' +
          '<p class="map-mark__adress">{{ properties.address }}</p>' +
          '<p class="map-mark__description">{{ properties.description }}</p>' +
          '<p class="map-mark__phone">{{ properties.phone }}</p>' +
          '<button class="button map-mark__button call-me-office" type="button">Перезвоните мне</button>' +
        '</div>' +
      '</div>',
      {
        // Переопределяем функцию build, чтобы при создании макета начинать
        // слушать событие click на кнопке.
        build: function () {
          // Сначала вызываем метод build родительского класса.
          BalloonContentLayout.superclass.build.call(this);
          // А затем выполняем дополнительные действия.
          $('.call-me-office').bind('click', this.openModalFromMap);
          $('.map-mark__img').bind('click', this.openModalOffice);
        },

        // Аналогично переопределяем функцию clear, чтобы снять
        // прослушивание клика при удалении макета с карты.
        clear: function () {
          // Выполняем действия в обратном порядке - сначала снимаем слушателя,
          // а потом вызываем метод clear родительского класса.
          $('.call-me-office').unbind('click', this.openModalFromMap);
          $('.map-mark__img').unbind('click', this.openModalOffice);
          BalloonContentLayout.superclass.clear.call(this);
        },

        openModalFromMap: function (e) {
          e.preventDefault();
          $('.form-for-me').addClass('is-active');
          $('.form-for-me .modal-form__checkbox input' ).prop( 'checked', true );
        },

        openModalOffice: function (e) {
          e.preventDefault();
          if ($('.lenina-squire').hasClass('is-active-office')) {
            $('.image__office1').addClass('is-active')
          } else {
            $('.image__office2').addClass('is-active');
          }
        }
      }
    );

    var placemark1 = new ymaps.Placemark(map1.getCenter(),
      {
        address: 'г. Артём, площадь Ленина, 2',
        description: 'ГУМ, вход с торца, напротив "Кошелки"!',
        phone: '8-904-627-3974',
        images: 'office1-ballloon.jpg'
      }, {
        balloonContentLayout: BalloonContentLayout,
        balloonPanelMaxMapArea: 0,
        preset: 'islands#blueDotIcon',
        iconColor: '#28aa3a'
    });

    var placemark2 = new ymaps.Placemark(map2.getCenter(),
      {
        address: 'г. Артём, ул. Октябрьская, д. 4а',
        description: 'Центральная автобусная остановка, "Садильник", в одном здании с салоном Yota!',
        phone: '8-904-627-3974',
        images: 'office2-ballloon.jpg'
      }, {
        balloonContentLayout: BalloonContentLayout,
        balloonPanelMaxMapArea: 0,
        preset: 'islands#blueDotIcon',
        iconColor: '#28aa3a'
    });


    map1.geoObjects.add(placemark1);
    map2.geoObjects.add(placemark2);

    placemark1.balloon.open();

    // Switching maps
    function watchOfficeMap(currentButton, currentOfficeId, currentMap, otherButton, otherOfficeId, otherMap) {
      $(currentButton).on('click', function(e) {
        e.preventDefault();

        $('.offices__links ' + currentButton).addClass('is-active-office');
        $('.offices__links ' + otherButton).removeClass('is-active-office');

        $(currentOfficeId).removeClass('none-js');
        $(otherOfficeId).addClass('none-js');

        $(currentMap).removeClass('none-js');
        $(otherMap).addClass('none-js');

        if (currentButton == '.october') {
          console.log('open baloon october');
          placemark2.balloon.open();
          map2.setCenter([43.354305, 132.186286]);
        } else {
          console.log('open baloon lenina');
          placemark1.balloon.open();
          map1.setCenter([43.355302, 132.179872]);
        }

      });
    };
    watchOfficeMap('.lenina-squire', '#office1', '#yandex-map1','.october', '#office2', '#yandex-map2');
    watchOfficeMap('.october', '#office2', '#yandex-map2','.lenina-squire', '#office1', '#yandex-map1');

    // Close image of office
    function closeModalOffice(classOffice) {
      $(classOffice + ' .modal-close').on('click', function(e) {
        $(classOffice).removeClass('is-active');
      });
    };

    closeModalOffice('.image__office1');
    closeModalOffice('.image__office2');

    function hideModalOffice(classOffice) {
      if ($(classOffice).hasClass('is-active')) {
        $(classOffice).removeClass('is-active');
      }
    };

    function closeModalOfficeEsc(classOffice) {
      $(window).on('keydown', function(e) {
        if (e.keyCode === 27) {
          hideModalOffice(classOffice);
        }
      });
    };
    closeModalOfficeEsc('.image__office1');
    closeModalOfficeEsc('.image__office2');
  });
});
