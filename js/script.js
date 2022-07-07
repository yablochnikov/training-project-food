"use strict";
require("es6-promise").polyfill();
import "nodelist-foreach-polyfill";

import tabs from "./modules/tabs";
import modal from "./modules/modal";
import timer from "./modules/timer";
import cards from "./modules/cards";
import slider from "./modules/slider";
import forms from "./modules/forms";
import calculator from "./modules/calculator";
import { openModal } from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {
  const modalTimerId = setTimeout(
    () => openModal(".modal", modalTimerId),
    50000
  );
  tabs(
    ".tabheader__item",
    ".tabcontent",
    ".tabheader__items",
    "tabheader__item_active"
  );
  modal("[data-modal]", ".modal", modalTimerId);
  timer(".timer", "2022-08-14");
  cards();
  slider({
    container: ".offer__slider",
    slide: ".offer__slide",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner"
  });
  forms("form", modalTimerId);
  calculator();
});

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
