window.slider = (() => {
  const ENTER = 13;

  // добавление обработчика нажатия мышки или клавиши enter

  const addHandler = (element, action) => {
    element.addEventListener('click', action);

    element.addEventListener('keydown', (evt) => {
      if (evt.keyCode && evt.keyCode === ENTER) {
        action;
      }
    });
  };

  // открытие и закрытие дополнительной информации о сессии

  const sessionToggles = document.querySelectorAll('.session__toggle');

  const toggleSession = (evt) => {
    evt.preventDefault();
    evt.target.parentElement.classList.toggle('session--closed');
    evt.target.classList.toggle('session__toggle--hide');
    evt.target.setAttribute('aria-label', evt.target.getAttribute('aria-label') === 'Open talk description' ? 'Close talk description' : 'Open talk description');
  };

  const turnOnToggles = (nodeList, i) => {
    addHandler(nodeList[i], toggleSession);
  };

  sessionToggles.forEach((it, i) => {
    turnOnToggles(sessionToggles, i);
  });

  // слайдер

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

  addHandler(slider, slideImages);

  // открытие блока со стикерами

  const preview = document.querySelector('.preview');
  const stickers = preview.querySelector('.preview__stickers-list');
  const link = preview.querySelector('.preview__link');

  const turnOnStickers = (evt) => {
    evt.preventDefault();
    stickers.classList.toggle('preview__stickers-list--show');
    evt.target.innerHTML = evt.target.innerHTML === 'Add Sticker' ? 'Close' : 'Add Sticker';
  };

  addHandler(link, turnOnStickers);

  // закрытие справки о цене

  const priceInfo = document.querySelector('.price-info');
  const close = priceInfo.querySelector('.price-info__close');

  const closeInfo = (evt) => {
    evt.preventDefault();
    priceInfo.style.display = 'none';
  }

  addHandler(close, closeInfo);
})();
