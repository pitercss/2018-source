window.script = (() => {
  const ENTER = 13;

  // adding click and enter handlers

  const addHandler = (element, action) => {
    element.addEventListener('click', action);

    element.addEventListener('keydown', (evt) => {
      if (evt.keyCode && evt.keyCode === ENTER) {
        action;
      }
    });
  };

  // opening and closing session information

  const sessionToggles = document.querySelectorAll('.session__toggle');

  if (sessionToggles) {
    if (sessionToggles.length > 0) {
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
    }
  }

  // slider

  const slider = document.querySelector('.gallery');

  if (slider) {
    const images = slider.querySelectorAll('.gallery__item');

    let currentImageIndex = 0;

    const slideImages = (evt) => {
      evt.preventDefault();
      if (evt.target.classList.contains('gallery__button--prev')) {
        if (currentImageIndex > 0) {
          images[currentImageIndex].classList.remove('gallery__item--show');
          images[currentImageIndex - 1].classList.add('gallery__item--show');
          currentImageIndex--;
        }
      } else if (evt.target.classList.contains('gallery__button--next')) {
        if (currentImageIndex < images.length - 1) {
          images[currentImageIndex].classList.remove('gallery__item--show');
          images[currentImageIndex + 1].classList.add('gallery__item--show');
          currentImageIndex++;
        }
      }
    };

    addHandler(slider, slideImages);
  }

  // closing price info

  const priceInfo = document.querySelector('.price-info');

  if (priceInfo) {
    const close = priceInfo.querySelector('.price-info__close');

    const closeInfo = (evt) => {
      evt.preventDefault();
      priceInfo.style.display = 'none';
    }

    addHandler(close, closeInfo);
  }
})();

/*
 * Iframe lazy loading
 */
(function(document){
  setupVideoPreload();

  function setupVideoPreload() {
    var videoElements = document.querySelectorAll('.video');

    if (videoElements) {
      for (var i = 0; i < videoElements.length; i++) {
        preloadVideo(videoElements[i]);
      }
    }
  }

  function preloadVideo(videoElement) {
    var playButton = videoElement.querySelector('.video__button');
    var cover = videoElement.querySelector('.video__media');

    if (cover) {
      var videoId = parseCoverURL(cover);
    }

    var videoWrapper = videoElement.querySelector('.video__wrapper');

    if (playButton && videoWrapper) {
      playButton.addEventListener('click', function() {
        var iframe = makeIframe(videoId);

        if (iframe !== null) {
          videoWrapper.innerHTML = '';
          videoWrapper.appendChild(iframe);
        }
      });
    }
  }

  function parseCoverURL(coverElement) {
    var urlRegExp = /https:\/\/img\.youtube\.com\/vi\/([a-zA-Z0-9_-]+)\/mqdefault\.jpg/i;
    var url = coverElement.src;
    var match = url.match(urlRegExp);

    return match[1];
  }

  function makeIframe(videoId) {
    var iframe = document.createElement('iframe');

    if (iframe) {
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('src',  generateIframeUrl(videoId));
      iframe.classList.add('video__media');

      return iframe;
    }

    return null;
  }

  function generateIframeUrl(videoId) {
    return 'https://www.youtube.com/embed/' + videoId + '?rel=0&showinfo=0&autoplay=1';
	}
})(document);
