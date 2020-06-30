import animateResultSvg from './result-animation';

const onShowResultElClick = (showResultEl, results) => {
  let target = showResultEl.getAttribute(`data-target`);

  [].slice.call(results).forEach(function (el) {
    el.classList.remove(`screen--show`);
    el.classList.add(`screen--hidden`);
  });

  let targetEl = [].slice.call(results).filter(function (el) {
    return el.getAttribute(`id`) === target;
  });

  targetEl[0].classList.add(`screen--show`);
  targetEl[0].classList.remove(`screen--hidden`);

  animateResultSvg();
};

// TODO: temporary
const registerScreenChangeListener = (results) => {
  document.body.addEventListener(`screenChanged`, () => {
    [].slice.call(results).forEach((el) => {
      el.classList.remove(`screen--show`);
      el.classList.add(`screen--hidden`);
    });
  });
};

export default () => {
  let showResultEls = document.querySelectorAll(`.js-show-result`);
  let results = document.querySelectorAll(`.screen--result`);

  if (results.length) {
    for (let i = 0; i < showResultEls.length; i++) {
      const showResultEl = showResultEls[i];

      showResultEl.addEventListener(`click`, () => {
        onShowResultElClick(showResultEl, results);
      });
    }

    let playBtn = document.querySelector(`.js-play`);

    if (playBtn) {
      playBtn.addEventListener(`click`, function () {
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        document.getElementById(`messages`).innerHTML = ``;
        document.getElementById(`message-field`).focus();
      });
    }
  }

  registerScreenChangeListener(results);
};
