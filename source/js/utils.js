export default {
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
};
