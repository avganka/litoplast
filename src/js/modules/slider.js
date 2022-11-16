const initSlider = (sliderId, {autoscroll}) => {
  const sliderContainer = document.getElementById(sliderId);
  const pagination = sliderContainer.querySelectorAll('[data-page]');
  const list = sliderContainer.querySelector('.slider__list');
  const slides = sliderContainer.querySelectorAll('.slider__item');

  let activeSlide = 1;
  // const slidesToScroll = 1;
  const timeout = 5000;

  if (autoscroll) {
    setInterval(() => {
      moveToSlide(activeSlide + 1);
      if (activeSlide >= slides.length) {
        activeSlide = 1;
      }
    }, timeout);
  }

  if (pagination.length > 0) {
    pagination.forEach((slideButton) => {
      slideButton.addEventListener('click', (evt) => {
        const slide = +evt.target.getAttribute('data-page');
        moveToSlide(slide);
      });
    });
  }

  const moveToSlide = (slideNumber) => {
    if (slides.length >= slideNumber) {
      const slideWidth = slides[0].clientWidth;
      const position = slideWidth * (slideNumber - 1);
      list.style.transitionDuration = '0.8s';
      list.style.transform = `translateX(-${position}px)`;
      changeActivePaginationNumber(slideNumber);
      changeActiveSlides(slideNumber);
    }
  };

  const changeActiveSlides = (slideNumber) => {
    let currentSlide = slides[activeSlide - 1];
    let prevSlide = activeSlide - 2 >= 0 ? slides[activeSlide - 2] : null;
    let nextSlide = slides.length !== slides ? slides[activeSlide] : null;

    currentSlide.classList.remove('slider__item--active');
    if (nextSlide) {
      nextSlide.classList.remove('slider__item--next');
    }
    if (prevSlide) {
      prevSlide.classList.remove('slider__item--prev');
    }

    activeSlide = slideNumber;

    currentSlide = slides[activeSlide - 1];
    prevSlide = activeSlide - 2 >= 0 ? slides[activeSlide - 2] : null;
    nextSlide = slides.length !== slides ? slides[activeSlide] : null;

    currentSlide.classList.add('slider__item--active');
    if (nextSlide) {
      nextSlide.classList.add('slider__item--next');
    }
    if (prevSlide) {
      prevSlide.classList.add('slider__item--prev');
    }
  };

  const changeActivePaginationNumber = (slideNumber) => {
    const currentPaginationNumber = pagination[activeSlide - 1];

    currentPaginationNumber.classList.remove('pagination__page--active');

    const newPaginationNumber = pagination[slideNumber - 1];
    newPaginationNumber.classList.add('pagination__page--active');
  };

  const slidesWidthObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      entry.target.style.width = `${slides[0].clientWidth}px`;
    }
  });

  const sliderTransformObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const slideWidth = slides[0].clientWidth;
      const position = slideWidth * (activeSlide - 1);
      entry.target.style.transitionDuration = '0s';
      entry.target.style.transform = `translateX(-${position}px)`;
    }
  });

  slides.forEach((slide) => {
    slidesWidthObserver.observe(slide);
  });

  sliderTransformObserver.observe(list);
};

export default initSlider;
