import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputDatePickerRef = document.querySelector('#datetime-picker');
const btnStartRef = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      const selectedDate = selectedDates[0];
      if (selectedDate < new Date()) {
          Notify.failure('Please choose a date in the future');
          targetDate = null;
          btnStartRef.disabled = true;

      } else {targetDate = selectedDate;
      btnStartRef.disabled = false;}
  },
};

flatpickr(inputDatePickerRef, options);


let deltaTime = 0;
let timerId = null;
let formatDate = null;

btnStartRef.addEventListener('click', onBtnStart);

const timer = {
  start(targetDate) {
    const targetTime = targetDate.getTime();

    setInterval(() => {
      const currentTime = Date.now();
      const remainingTime = targetTime - currentTime;
      const timeComponents = convertMs(remainingTime);

      daysRef.innerText = timeComponents.days;
      hoursRef.innerText = timeComponents.hours;
      minutesRef.innerText = timeComponents.minutes;
      secondsRef.innerText = timeComponents.seconds;
    }, 1000);
  },
};



function pad(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
// console.log(days, hours, minutes, seconds);
    return { days, hours, minutes, seconds };
    
}

function onBtnStart() {
  const targetDate = new Date(inputDatePickerRef.value);
    timer.start(targetDate);
    toggleButton(true);
    inputDatePickerRef.setAttribute('disabled', true);
   
}

function toggleButton(disabled) {
  btnStartRef.disabled = disabled;
}