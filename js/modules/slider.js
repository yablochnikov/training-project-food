function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field} ) {
  const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        dotWrapper = document.createElement('div'),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
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

  slides.forEach((slide, id) => {
    slide.style.width = slidesWidth;
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.setAttribute('data-dot', id);
    dotWrapper.append(dot);
  });

  next.addEventListener('click', () => {
    if (offset >= noDigits(slidesWidth) *(slides.length - 1)){
      offset = 0;
    } else {
      offset += noDigits(slidesWidth);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if(slideIndex >= slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if(slideIndex < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach(dot => dot.classList.remove('active-dot'));
    dots[slideIndex - 1].classList.add('active-dot');
  });
  console.log(slideIndex);
  prev.addEventListener('click', () => {

    console.log(slideIndex);
    if (offset === 0){
      offset = noDigits(slidesWidth) * (slides.length - 1);
    } else {
      offset -= noDigits(slidesWidth);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if(slideIndex <= 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if(slideIndex < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach(dot => dot.classList.remove('active-dot'));
    dots[slideIndex - 1].classList.add('active-dot');
  });

  slider.style.position = 'relative';
  
  dotWrapper.classList.add('carousel-indicators');
  
  slider.append(dotWrapper);

  function noDigits(str) {
    return +str.replace(/\D/g, '');
  }

  const dots = document.querySelectorAll('.dot');

  dots.forEach((dot, id) => {
  
  dot.addEventListener('click', () => {
    dots.forEach(dot => {
      dot.classList.remove('active-dot');
    });
      
      
      slideIndex = id + 1;
      console.log(slideIndex, id);
      offset =  noDigits(slidesWidth) * (slideIndex - 1);

      if ((id + 1) < 10) {
        current.textContent = `0${id + 1}`;
      } else {
        current.textContent = id + 1;
      }
    
      slidesField.style.transform = `translateX(-${offset}px)`;
      dot.classList.add('active-dot');
    });
    });
  
  dots[slideIndex - 1].classList.add('active-dot');
}

export default slider;