const headerBtn = document.querySelector('.burger');
const menu = document.querySelector('.navbar__main-menu');
const menuElements = menu.querySelectorAll('.menu__item--dropdown');

const headerMenuToggle = () => {
  headerBtn.addEventListener('click', () => {
    headerBtn.classList.toggle('active');
    const text = headerBtn.querySelector('.burger__text');
    if (headerBtn.classList.contains('active')) {
      menu.style.display = 'block';
      text.textContent = 'Закрыть';
    } else {
      menu.style.display = 'none';
      text.textContent = 'Меню';

      Array.from(menuElements).forEach((element) => {
        element.classList.remove('active');
      });
    }
  });

  Array.from(menuElements).forEach((element) => {
    element.addEventListener('click', () => {
      element.classList.toggle('active');
    });
  });
};

export default headerMenuToggle;
