import '../scss/style.scss';
import {toggleHeaderMenu, toggleMenuItems} from './modules/menuToggle.js';
import './modules/searchToggle.js';

document.addEventListener('DOMContentLoaded', () => {
  toggleHeaderMenu();
  toggleMenuItems();
});
