import '../scss/style.scss';
import './modules/menuToggle.js';
import './modules/searchToggle.js';
import './modules/cookies.js';
import initPopup from './modules/popup.js';
import initSlider from './modules/slider.js';

document.addEventListener('DOMContentLoaded', () => {
  initPopup();
  initSlider('main-slider', {
    autoscroll: false,
    slidesToScroll: 1,
  });
  initSlider('card-slider', {
    autoscroll: false,
    slidesToScroll: 1,
  });
});
