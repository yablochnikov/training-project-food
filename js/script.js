'use strict';
// запускать в MAMP
window.addEventListener('DOMContentLoaded', () => {
  // tabs

  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items'),
        cardWrapper = document.querySelector('.menu__field .container');

  function hideTabContent() {
    tabsContent.forEach(el => {
      el.classList.add('hide');
      el.classList.remove('show', 'fade');
    });

    tabs.forEach(el => {
      el.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.add('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (e) => {
    const target = e.target;

    if(target && target.classList.contains('tabheader__item')) {
      tabs.forEach((tab, id) => {
        if(target === tab) {
          hideTabContent();
          showTabContent(id);
        }
      });
    }
  });

  // timer

  const deadLine = '2022-09-11';

  function getTimeRemaining(endTime) {
    let days, hours, minutes, seconds;
    const total = Date.parse(endTime) - Date.parse(new Date());
    if (total <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(total / (1000 * 60 * 60 * 24));
      hours  = Math.floor((total / (1000 * 60 * 60) % 24));
      minutes = Math.floor((total / 1000 / 60) % 60);
      seconds = Math.floor((total / 1000) % 60);
    }

    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }

  function getZero (num) {
    if(num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock (selector, endTime) {
    const timerBlock = document.querySelector(selector),
          timerDays = timerBlock.querySelector('#days'),
          timerHours = timerBlock.querySelector('#days'),
          timerMinutes = timerBlock.querySelector('#minutes'),
          timerSeconds = timerBlock.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const total = getTimeRemaining(endTime);

      timerDays.innerHTML = getZero(total.days);
      timerHours.innerHTML = getZero(total.hours);
      timerMinutes.innerHTML = getZero(total.minutes);
      timerSeconds.innerHTML = getZero(total.seconds);

      if (total.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', deadLine);

  // modal

  const modal = document.querySelector('.modal'),
        buttonsOpenModal = document.querySelectorAll('[data-modal]'),
        modalTimerId = setTimeout(openModal, 50000);

  function openModal() {
    modal.classList.remove('hide');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  }

  function closeModal() {
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = 'auto';
  }

  buttonsOpenModal.forEach(btn => {
    btn.addEventListener('click', () => {
      openModal();
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.code === 'Escape') {
      closeModal();
    }
  });

  window.addEventListener('scroll', function _self() {
    if (document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight - 1) {
      openModal();
      window.removeEventListener('scroll', _self);
    }
  });
  
  // cards
  class Card {
    constructor(img, alt, title, text, price, parentElement, ...classes) {
      this.img = img;
      this.alt = alt;
      this.title = title;
      this.text = text;
      this.price = price;
      this.parentElement = document.querySelector(parentElement);
      this.transfer = 35;
      this.classes = classes;
    }

    changeToUAH() {
      return this.price * this.transfer;
    }

    createCard() {
      const div = document.createElement('div');
      if (this.classes.length === 0) {
        this.classes = 'menu__item';
        div.classList.add(this.classes);
      } else {
        this.classes.forEach(className => {
          div.classList.add(className);
        });
      }
      
      div.innerHTML = `
      <img src="${this.img}" alt="${this.alt}">
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">${this.text}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.changeToUAH()}</span> грн/день</div>
      </div>
      `;
      this.parentElement.append(div);
    }
  }

  const getResources = async (url) => {
    const res = await fetch(url);

    if(!res.ok) {
      throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();
  };
  
  axios.get('http://localhost:3000/menu')
  .then(obj => {
    obj.data.forEach(({img, altimg, title, descr, price}) => {
      new Card(img, altimg, title, descr, price, '.menu .container').createCard();
    });
  });
    
  // forms

  const forms = document.querySelectorAll('form');
  const message = {
    loading: 'icons/spinner.svg',
    success: 'Спасибо! Скоро мы свяжемся с Вами.',
    failure: 'Что-то пошло не так'
  };

  forms.forEach(form => {
    bindPostData(form);
  });

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: data
    });

    return await res.json();
  };
  
  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      // form.append(statusMessage);
      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);



      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests',  json)
      .then((data) => {
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      }).catch(() => {
        showThanksModal(message.failure);
      }).finally(() => {
        form.reset();
      });

    });
  }

  function showThanksModal(message){
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000);
  }

  fetch('db.json')
    .then(data => data.json())
    .then(res => console.log(res));

  // carousel

  const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        dotWrapper = document.createElement('div'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        slidesWidth = window.getComputedStyle(slidesWrapper).width;

  

  let slideIndex = 1;
  let offset = 0;



  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = `0${slideIndex}`;
  }

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide => {
    slide.style.width = slidesWidth;
  });

  next.addEventListener('click', () => {
    if (offset >= noDigits(slidesWidth) *(slides.length - 1)){
      offset = 0;
    } else {
      offset += noDigits(slidesWidth);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if(slideIndex === slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if(slideIndex < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  });

  prev.addEventListener('click', () => {
    if (offset === 0){
      offset = noDigits(slidesWidth) * (slides.length - 1);
    } else {
      offset -= noDigits(slidesWidth);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if(slideIndex === 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if(slideIndex < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  });

  // slider navigation

  slider.style.position = 'relative';
  
  dotWrapper.classList.add('carousel-indicators');
  
  slider.append(dotWrapper);

  slides.forEach((slide, id) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.setAttribute('data-dot', id);
    dotWrapper.append(dot);
  }); 

  function noDigits(str) {
    return +str.replace(/\D/g, '');
  }

  const dots = document.querySelectorAll('.dot');

  dots.forEach((dot, id) => {

    dot.addEventListener('click', () => {
      dots.forEach(dot => {
        dot.classList.remove('active-dot');

      });

      slideIndex = id;

      offset =  noDigits(slidesWidth) * slideIndex;

      if ((slideIndex + 1) < 10) {
        current.textContent = `0${slideIndex + 1}`; 
      } else {
        current.textContent = slideIndex + 1;
      }
    
      slidesField.style.transform = `translateX(-${offset}px)`;
      dot.classList.add('active-dot');
    });
  });
});

// calculator 



// default slider 

  // const sliderBtnPrev = document.querySelector('.offer__slider-prev'),
  //       sliderBtnNext = document.querySelector('.offer__slider-next'),
  //       sliderItems = document.querySelectorAll('.offer__slide');

  // let id = 0,
  //     sliderTotalCounter = document.querySelector('#total'),
  //     sliderCurrentCounter = document.querySelector('#current');

  // function showSlide(id) {
  //   sliderItems.forEach((img, index) => {
  //     img.classList.add('hide');
  //     img.classList.remove('show');
  //     if(id === index) {
  //       img.classList.add('show');
  //       sliderCurrentCounter.innerHTML = id >= 9 ? index + 1 : `0${index+1}`; 
  //     }
  //   });
  // }

  // sliderTotalCounter.innerHTML = sliderItems.length >= 10 ? sliderItems.length : `0${sliderItems.length}`;

  // sliderBtnPrev.addEventListener('click', () => {
  //   id--;
  //   if(id < 0) {
  //     id = sliderItems.length - 1;
  //   }
  //   console.log(id);
  //   showSlide(id);
  // });

  // sliderBtnNext.addEventListener('click', () => {
  //   id++;
  //   if(id > sliderItems.length - 1) {
  //     id = 0;
  //   }
  //   console.log(id);
  //   showSlide(id);
  // });

  // showSlide(id);

  // request.send(json); // json db

      // request.send(formData); // php db
      
      // request.addEventListener('load', () => {
      //   if(request.status === 200) {
      //     console.log(request.response);
      //     showThanksModal(message.success);
      //     form.reset();
      //     statusMessage.remove();
      //   } else {
      //     showThanksModal(message.failure);
      //   }
      // });


            // const request = new XMLHttpRequest();
      // request.open('POST', 'server.php');

      // request.setRequestHeader('Content-type', 'multipart/form-data'); // заголовок не стоит использовать при XML request'е
      // request.setRequestHeader('Content-type', 'application/json'); // если нам нужен JSON


        // total.innerHTML = slides.length >= 10 ? slides.length : `0${slides.length}`;

          // getResources('http://localhost:3000/menu')
  //   .then(data => {
  //     data.forEach(({img, altimg, title, descr, price}) => {
  //       new Card(img, altimg, title, descr, price, '.menu .container').createCard();
  //     });
  //   });