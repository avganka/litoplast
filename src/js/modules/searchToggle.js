const closeBtn = document.querySelector('.search__close-icon');
const searchBtn = document.querySelector('.search__search-icon');
const searchBlock = document.querySelector('.header__search');
const phoneBtn = document.querySelector('.header__icon--phone');
const feedbackBtn = document.querySelector('.header__feedback-button ');

const timeouts = [];

const actionOnTimeout = (callback, time) => {
  const timeout = setTimeout(() => {
    callback();
  }, time);
  timeouts.push(timeout);
};

const onSearchOpen = () => {
  searchBlock.classList.add('active');
};

const onSearchClose = () => {
  feedbackBtn.style.display = 'block';
  phoneBtn.style.display = 'block';
};

searchBtn.addEventListener('click', () => {
  timeouts.forEach((timeout) => clearTimeout(timeout));
  if (!searchBlock.classList.contains('active')) {
    feedbackBtn.style.display = 'none';
    phoneBtn.style.display = 'none';

    actionOnTimeout(onSearchOpen, 0);
  }
});

closeBtn.addEventListener('click', () => {
  timeouts.forEach((timeout) => clearTimeout(timeout));
  if (searchBlock.classList.contains('active')) {
    searchBlock.classList.remove('active');

    actionOnTimeout(onSearchClose, 400);
  }
});
