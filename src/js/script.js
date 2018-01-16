window.slider = (() => {
  const ENTER = 13;

  const sessionToggles = document.querySelectorAll('.session__toggle');

  const toggleSession = (evt) => {
    evt.target.parentElement.classList.toggle('session--closed');
    evt.target.classList.toggle('session__toggle--hide');
    evt.target.setAttribute('aria-label', evt.target.getAttribute('aria-label') === 'Open talk description' ? 'Close talk description' : 'Open talk description');
  };

  const addHandler = (nodeList, i) => {
    nodeList[i].addEventListener('click', toggleSession);

    nodeList[i].addEventListener('keydown', (evt) => {
      if (evt.keyCode && evt.keyCode === ENTER) {
        toggleSession;
      }
    });
  };

  sessionToggles.forEach((it, i) => {
    addHandler(sessionToggles, i);
  });

  const slider = document.querySelector('.slider');
  const images = slider.querySelectorAll('.slider__image');

  let currentImageIndex = 0;

  const slideImages = (evt) => {
    evt.preventDefault();
    if (evt.target.classList.contains('slider__prev')) {
      if (currentImageIndex > 0) {
        images[currentImageIndex].classList.remove('slider__image--show');
        images[currentImageIndex - 1].classList.add('slider__image--show');
        currentImageIndex--;
      }
    } else if (evt.target.classList.contains('slider__next')) {
      if (currentImageIndex < images.length - 1) {
        images[currentImageIndex].classList.remove('slider__image--show');
        images[currentImageIndex + 1].classList.add('slider__image--show');
        currentImageIndex++;
      }
    }
  };

  slider.addEventListener('click', slideImages);

  slider.addEventListener('keydown', (evt) => {
    if (evt.keyCode && evt.keyCode === ENTER) {
      slideImages;
    }
  });
})();
