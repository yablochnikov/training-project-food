function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove('hide');
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
  console.log(modalTimerId);
  if(modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove('show');
  modal.classList.add('hide');
  document.body.style.overflow = 'auto';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector),
        buttonsOpenModal = document.querySelectorAll(triggerSelector);

  buttonsOpenModal.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.code === 'Escape') {
      closeModal(modalSelector);
    }
  });

  window.addEventListener('scroll', function _self() {
    if (document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight - 1) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', _self);
    }
  });
}

export default modal;

export {closeModal, openModal};