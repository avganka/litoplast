const popupBtns = document.querySelectorAll('.button-popup');
const body = document.body;

let isOpened = false;
const ANIMATION_DURATION = 500;

if (popupBtns.length > 0) {
  popupBtns.forEach((btn) => {
    const popupId = btn.getAttribute('data-popup-id');
    const popup = document.getElementById(popupId);

    btn.addEventListener('click', () => {
      openPopup(popup);
      isOpened = true;
    });

    const closeBtn = popup.querySelector('.popup__close');
    closeBtn.addEventListener('click', () => {
      closePopup(popup);
      isOpened = false;
    });

    popup.addEventListener('click', (evt) => {
      if (!evt.target.closest('.popup__content')) {
        closePopup(popup);
        isOpened = false;
      }
    });
  });
}

const openPopup = (popupElement) => {
  if (popupElement && !isOpened) {
    popupElement.classList.add('opened');
    lockBodyScroll(popupElement);
  }
};
const closePopup = (popupElement) => {
  if (popupElement && isOpened) {
    popupElement.classList.remove('opened');
    setTimeout(() => {
      unlockBodyScroll();
    }, ANIMATION_DURATION);
  }
};

const lockBodyScroll = (popup) => {
  body.classList.add('lock');
  const scrollShift = window.innerWidth - popup.querySelector('.popup__container').scrollWidth;
  body.style.paddingRight = `${scrollShift}px`;
};

const unlockBodyScroll = () => {
  body.classList.remove('lock');
  body.style.paddingRight = `0px`;
};
