class CountdownTimer extends HTMLElement {
  constructor() {
    super();
    this.endTime = this.dataset.countdownEnd;
    this.interval = null;
  }

  connectedCallback() {
    this.render();
    this.startCountdown();
  }

  disconnectedCallback() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    this.innerHTML = `
      <div class="countdown-timer">
        <div class="countdown-timer__unit">
          <span class="countdown-timer__value" data-days>00</span>
          <span class="countdown-timer__label">Days</span>
        </div>
        <div class="countdown-timer__unit">
          <span class="countdown-timer__value" data-hours>00</span>
          <span class="countdown-timer__label">Hours</span>
        </div>
        <div class="countdown-timer__unit">
          <span class="countdown-timer__value" data-minutes>00</span>
          <span class="countdown-timer__label">Minutes</span>
        </div>
        <div class="countdown-timer__unit">
          <span class="countdown-timer__value" data-seconds>00</span>
          <span class="countdown-timer__label">Seconds</span>
        </div>
      </div>
    `;
  }

  startCountdown() {
    const updateTimer = () => {
      const now = new Date().getTime();
      const end = new Date(this.endTime).getTime();
      const distance = end - now;

      if (distance < 0) {
        this.innerHTML = '<div class="countdown-timer countdown-timer--expired">Offer Expired</div>';
        clearInterval(this.interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const daysEl = this.querySelector('[data-days]');
      const hoursEl = this.querySelector('[data-hours]');
      const minutesEl = this.querySelector('[data-minutes]');
      const secondsEl = this.querySelector('[data-seconds]');

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    };

    updateTimer();
    this.interval = setInterval(updateTimer, 1000);
  }
}

customElements.define('countdown-timer', CountdownTimer);
