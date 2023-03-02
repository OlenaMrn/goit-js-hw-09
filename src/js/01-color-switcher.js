const CHANGE_DELAY = 1000;

const refs = {
  startButton: document.querySelector('[data-start]'),
  stopButton: document.querySelector('[data-stop]'),
  body: document.querySelector(`body`),
};

let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.startButton.addEventListener(`click`, startColorChange);
refs.stopButton.addEventListener(`click`, stopColorChange);

function toggleButton(disabled) {
  refs.startButton.disabled = disabled;
}

function startColorChange() {
  toggleButton(true);

  intervalId = setInterval(() => {
    const hexColor = getRandomHexColor();
    document.body.style.backgroundColor = hexColor;
  }, CHANGE_DELAY);
}

function stopColorChange() {
  toggleButton(false);
  clearInterval(intervalId);
}
