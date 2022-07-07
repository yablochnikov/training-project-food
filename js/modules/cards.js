import { getResources } from "../services/services";

function cards() {
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
  
  getResources('http://localhost:3000/menu')
  .then(data => {
    data.forEach(({img, altimg, title, descr, price}) => {
      new Card(img, altimg, title, descr, price, '.menu .container').createCard();
    });
  });
}

export default cards;