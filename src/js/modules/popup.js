const popupBtns = document.querySelectorAll('.button-popup');

let isOpened = false;

if (popupBtns.length > 0) {
  popupBtns.forEach((btn) => {
    const popupId = btn.getAttribute('data-popup-id');
    const popup = document.getElementById(popupId);

    btn.addEventListener('click', () => {
      openPopup(popup);
      isOpened = true;
    });

    const closeBtn = popup.querySelector('.popup__close');

    closeBtn.addEventListener('click', (evt) => {
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
  }
};
const closePopup = (popupElement) => {
  if (popupElement && isOpened) {
    popupElement.classList.remove('opened');
  }
};

const blockBodyScroll = () => {};
