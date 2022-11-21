const initSlider = (sliderId, {autoscroll = false, slidesToScroll = 1} = {}) => {
  const sliderContainer = document.getElementById(sliderId);
  const pagination = sliderContainer.querySelector('.slider__pagination');
  const pages = sliderContainer.querySelectorAll('[data-page]');
  const list = sliderContainer.querySelector('.slider__list');
  const slides = sliderContainer.querySelectorAll('.slider__item');
  const prev = sliderContainer.querySelector('.pagination__prev-button') || null;
  const next = sliderContainer.querySelector('.pagination__next-button') || null;

  let activeSlide = 1;
  let translate = 0;
  const TIMEOUT = 5000;
  const minGapBetweenElements = 10;

  const getELementWidth = (element) => {
    return element.clientWidth;
  };

  const getVisibleSlidesCount = () => {
    const listWidth = getELementWidth(list);
    const slideWidth = getELementWidth(slides[0]);
    return (listWidth + minGapBetweenElements) / (slideWidth + minGapBetweenElements);
  };

  const getSpacingBetweenElements = () => {
    const slidesToShow = parseInt(getVisibleSlidesCount());
    const listWidth = getELementWidth(list);
    const slideWidth = getELementWidth(slides[0]);
    if (slidesToShow === 1) {
      return 0;
    }
    const gap = (listWidth - slidesToShow * slideWidth) / (slidesToShow - 1);
    return gap;
  };

  const getSliderShift = (slideNumber) => {
    const slideWidth = slides[0].clientWidth;
    const gap = getSpacingBetweenElements();
    return (slideWidth + gap) * (slideNumber - 1);
  };

  if (autoscroll) {
    setInterval(() => {
      moveToSlide(activeSlide + 1);
      if (activeSlide >= slides.length) {
        activeSlide = 1;
      }
    }, TIMEOUT);
  }
  //TODO slider touch swipes
  // const clickSlideChangingHandler = () => {};

  // const touchSlideChangingHandler = () => {};

  // let x1 = null;
  // let xDiff = 0;

  // list.addEventListener('touchstart', (evt) => {
  //   x1 = evt.touches[0].clientX;
  // });

  // list.addEventListener('touchmove', (evt) => {
  //   const x2 = evt.touches[0].clientX;
  //   xDiff = x2 - x1;

  //   if (xDiff < 0) {
  //     list.style.transform = `translateX(${translate}px)`;
  //   } else {
  //     list.style.transform = `translateX(${translate}px)`;
  //   }
  // });

  // list.addEventListener('touchend', () => {
  //   translate = xDiff;
  // });
  if (pagination) {
    pagination.addEventListener('click', (evt) => {
      const target = evt.target;

      if (target === prev) {
        if (activeSlide > 1) {
          moveToSlide(activeSlide - 1);
          changeActivePaginationNumber(activeSlide - 1);
          changeActiveSlides(activeSlide - 1);
          checkNextPrevButtons();
          return;
        }
      }

      if (target === next) {
        if (activeSlide < slides.length) {
          moveToSlide(activeSlide + 1);
          changeActivePaginationNumber(activeSlide + 1);
          changeActiveSlides(activeSlide + 1);
          checkNextPrevButtons();
        }
        return;
      }

      if (Array.from(pages).indexOf(target) !== -1) {
        const slide = +evt.target.getAttribute('data-page');
        moveToSlide(slide);
        changeActivePaginationNumber(slide);
        changeActiveSlides(slide);
        if (prev || next) {
          checkNextPrevButtons();
        }
        return;
      }
    });
  }

  const moveToSlide = (slideNumber) => {
    if (slides.length >= slideNumber) {
      const position = getSliderShift(slideNumber);
      list.style.transitionDuration = '0.8s';
      list.style.transform = `translateX(-${position}px)`;
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
    const currentPaginationNumber = pages[activeSlide - 1];

    currentPaginationNumber.classList.remove('pagination__page--active');

    const newPaginationNumber = pages[slideNumber - 1];
    newPaginationNumber.classList.add('pagination__page--active');
  };

  const checkNextPrevButtons = () => {
    if (activeSlide === 1) {
      pages[0].previousElementSibling.style.visibility = 'hidden';
      pages[pages.length - 1].nextElementSibling.style.visibility = 'visible';
    } else if (activeSlide === pages.length) {
      pages[pages.length - 1].nextElementSibling.style.visibility = 'hidden';
      pages[0].previousElementSibling.style.visibility = 'visible';
    } else {
      pages[pages.length - 1].nextElementSibling.style.visibility = 'visible';
      pages[0].previousElementSibling.style.visibility = 'visible';
    }
  };

  const sliderListObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const gap = getSpacingBetweenElements();
      entry.target.style.columnGap = `${gap}px`;

      const position = getSliderShift(activeSlide);
      entry.target.style.transitionDuration = '0s';
      entry.target.style.transform = `translateX(-${position}px)`;
    }
  });

  sliderListObserver.observe(list);
};

export default initSlider;
