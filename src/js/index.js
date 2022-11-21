import '../scss/style.scss';
import headerMenuToggle from './modules/menuToggle.js';
import searchToggle from './modules/searchToggle.js';
import showCookiesNotification from './modules/cookies.js';
import initPopup from './modules/popup.js';
import initSlider from './modules/slider.js';
import initTabs from './modules/tabs';

document.addEventListener('DOMContentLoaded', () => {
  showCookiesNotification();
  headerMenuToggle();
  searchToggle();
  initPopup();
  initSlider('main-slider', {
    autoscroll: false,
    slidesToScroll: 1,
  });
  initSlider('card-slider-hits', {
    autoscroll: false,
    slidesToScroll: 1,
  });
  initSlider('card-slider-new', {
    autoscroll: false,
    slidesToScroll: 1,
  });
  initTabs('popular-tabs');
});
