export default {
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  updateImageVersion(imgItem) {
    if (!imgItem) {
      return;
    }

    const src = imgItem.src;

    imgItem.src = ``;

    imgItem.src = `${src}?v=${Math.random()}`;
  },

  isMobile() {
    return innerWidth <= 768;
  },

  isTablet() {
    return innerWidth > 768 && innerWidth <= 1024;
  },

  isDesktop() {
    return innerWidth > 1025;
  }
};
