window.slider = (() => {
  const ENTER = 13;

  const slider = document.querySelector('.slider');
  const images = slider.querySelectorAll('.slider__image');

  let currentImageIndex = 0;

  for (let i = 0; i < images.length; i++) {
    if (images[i].classList.contains('slider__image--show')) {
      currentImageIndex = i;

      break;
    }
  }

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
