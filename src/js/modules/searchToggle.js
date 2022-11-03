const closeBtn = document.querySelector('.search__close-icon');
const searchBtn = document.querySelector('.search__search-icon');
const phoneBtn = document.querySelector('.header__icon--phone');
const searchBlock = document.querySelector('.header__search');
const feedbackBtn = document.querySelector('.header__contacts-button');

searchBtn.addEventListener('click', () => {
  if (!searchBlock.classList.contains('active')) {
    searchBlock.classList.add('active');
    feedbackBtn.style.display = '0';
    phoneBtn.style.display = '0';
  }
});

closeBtn.addEventListener('click', () => {
  if (searchBlock.classList.contains('active')) {
    searchBlock.classList.remove('active');
    feedbackBtn.style.display = 'block';
    phoneBtn.style.display = 'block';
  }
});
