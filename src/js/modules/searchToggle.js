const searchBlock = document.querySelector('.header__search');
const closeBtn = searchBlock.querySelector('.icon--close');
const searchBtn = searchBlock.querySelector('.icon--search');
const phoneBtn = document.querySelector('.icon--phone');
const feedbackBtn = document.querySelector('.header__feedback-button ');

const timeouts = [];

const actionOnTimeout = (callback, time) => {
  const timeout = setTimeout(() => {
    callback();
  }, time);
  timeouts.push(timeout);
};

const onSearchOpen = () => {
  searchBlock.classList.remove('closed');
};

const onSearchClose = () => {
  feedbackBtn.style.display = 'block';
  phoneBtn.style.display = 'block';
};

searchBtn.addEventListener('click', () => {
  timeouts.forEach((timeout) => clearTimeout(timeout));
  if (searchBlock.classList.contains('closed')) {
    feedbackBtn.style.display = 'none';
    phoneBtn.style.display = 'none';

    actionOnTimeout(onSearchOpen, 0);
  }
});

closeBtn.addEventListener('click', () => {
  timeouts.forEach((timeout) => clearTimeout(timeout));
  if (!searchBlock.classList.contains('closed')) {
    searchBlock.classList.add('closed');

    actionOnTimeout(onSearchClose, 400);
  }
});
