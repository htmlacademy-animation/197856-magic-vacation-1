class PrizeAmountCountdown {
  constructor({element, endAmount, firstAmount = 1}) {
    this.animationDuration = 1000; // 1 секунда
    this.timePerFrame = 1000 / 12;// 12 кадров в секунду
    this.element = element;

    this.endAmountLength = endAmount.toString().length; // Кол-во цифр в числе
    this.endAmount = endAmount;
    this.firstAmount = firstAmount;
    this.previousAmount = firstAmount;
    this.count = 0;
    this.increment = this.endAmount / (this.animationDuration / this.timePerFrame);

    this.startTime = null;
    this.lastFrameUpdateTime = null;
    this.timePassedSinceLastUpdate = null;

    this.animationRequest = null;

    this.draw = this.draw.bind(this);
  }

  startCountdown() {
    this.animationRequest = requestAnimationFrame(this.draw);
  }

  endCountdown() {
    if (this.animationRequest) {
      cancelAnimationFrame(this.animationRequest);
      this.animationRequest = null;
      this.previousAmount = this.firstAmount;
      this.count = 0;
      this.startTime = null;
      this.lastFrameUpdateTime = null;
      this.timePassedSinceLastUpdate = null;
      this.updateValues(this.endAmount);
    }
  }

  draw(currentTime) {
    if (!this.lastFrameUpdateTime) {
      this.lastFrameUpdateTime = currentTime;
    }

    if (!this.startTime) {
      this.startTime = currentTime;
    }

    this.timePassedSinceLastUpdate = currentTime - this.lastFrameUpdateTime;

    if (currentTime - this.startTime >= this.animationDuration) {
      this.endCountdown();
      return;
    }

    if (this.timePassedSinceLastUpdate > this.timePerFrame) {
      this.lastFrameUpdateTime = currentTime;

      const currentAmount = this.getAmount();

      if (currentAmount <= this.endAmount) {
        this.updateValues(currentAmount);
        this.previousAmount = currentAmount;
        this.count++;
      }
    }

    if (this.animationRequest) {
      requestAnimationFrame(this.draw);
    }
  }

  getAmount() {
    return this.count === 0 ? this.firstAmount : Math.ceil(this.previousAmount + this.increment);
  }

  updateValues(nextAmount) {
    const next = nextAmount.toString().padStart(this.endAmountLength, `0`);

    this.element.textContent = next;
  }
}

export default PrizeAmountCountdown;
