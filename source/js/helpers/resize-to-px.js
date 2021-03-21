import debounce from 'lodash/debounce';
import utils from '../utils';

export default class ResizeToPx {
  constructor(
      domItem,
      debounceTime = 150,
      withMinHeight,
      withMobile = false,
  ) {
    this.domItem = domItem;
    this.withMinHeight = withMinHeight;
    this.withMobile = withMobile;

    this.onResize = this.onResize.bind(this);

    this.setPxSizesWrapped = debounce(() => {
      this.setPxSizes();
    }, debounceTime);
  }

  init() {
    if (!this.domItem) {
      return;
    }

    // Если нужно изменять на мобильном устройстве в том числе
    if (!this.withMobile && utils.isMobile()) {
      return;
    }

    this.setPxSizes();
    this.addListeners();
  }

  destroy() {
    this.domItem.removeAttribute(`style`);
    this.removeListeners();
  }

  setPxSizes() {
    this.domItem.removeAttribute(`style`);

    const heightStr = `${this.domItem.offsetHeight}px`;
    const widthStr = `${this.domItem.offsetWidth}px`;

    this.domItem.style.height = heightStr;
    this.domItem.style.width = widthStr;

    if (this.withMinHeight) {
      this.domItem.style.minHeight = heightStr;
    }
  }

  onResize() {
    this.setPxSizesWrapped();
  }

  addListeners() {
    window.addEventListener(`resize`, this.onResize);
  }

  // eslint-disable-next-line
	removeListeners() {
    window.removeEventListener(`resize`, this.onResize);
  }
}
