import normalizeWheel from "normalize-wheel";

export default class Wheel {
  constructor() {
    this.wheeling = true;

    this.direction = 0;
    this.previousValue = 0;

    this.triggered = false;
    this.recentlyTriggered = false;
    this.lastTriggerTimeout = null;
    this.idleTimeout = null;

    this.init();
  }

  init() {
    document.addEventListener(
      /Firefox/i.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel",
      this.onMouseWheel.bind(this),
      { passive: true }
    );
  }

  onMouseWheel(_event) {
    this.triggered = false;

    // Get normalized value
    const normalized = normalizeWheel(_event);

    this.triggered =
      this.testWheelByDirection(normalized.pixelY) ||
      this.testWheelByIdle() ||
      this.testWheelByIncrease(normalized.pixelY);

    if (this.triggered) {
      this.onWheel(this.direction);

      this.recentlyTriggered = true;

      // Clear current timeout
      if (this.lastTriggerTimeout) window.clearTimeout(this.lastTriggerTimeout);

      this.lastTriggerTimeout = window.setTimeout(() => {
        this.recentlyTriggered = false;
      }, 300);
    }
  }

  testWheelByDirection(_value) {
    let result = false;

    // Get direction
    const direction = Math.sign(_value);

    // Direction changed
    if (direction !== this.direction) result = true;

    // Save direction
    this.direction = direction;

    return result;
  }

  testWheelByIdle() {
    let result = false;

    // Clear current timeout
    if (this.idleTimeout) window.clearTimeout(this.idleTimeout);

    // Start new timeout
    this.idleTimeout = window.setTimeout(() => {
      this.wheeling = false;
    }, 300);

    if (!this.wheeling) result = true;

    this.wheeling = true;

    return result;
  }

  testWheelByIncrease(_value) {
    let result = false;
    const sign = Math.sign(_value);

    if (!this.recentlyTriggered) {
      if (sign > 0 && _value > this.previousValue * 2) result = true;

      if (sign < 0 && _value < this.previousValue * 2) result = true;
    }

    this.previousValue = _value;

    return result;
  }

  onWheel(_direction) {
    console.log("WHEEL EVENT");
    this.emit("wheel", _direction);
  }
}
