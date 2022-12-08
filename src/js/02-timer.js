// Описаний в документації
import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";



const timerInput = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
btnStart.setAttribute("disabled", '');


let SelectedDate = 0;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement:1,
  onClose(selectedDates) {
    //  console.log(selectedDates[0]);
      
      resetTimer();
      SelectedDate = selectedDates[0];
      checkDate(SelectedDate);
  },
};

flatpickr(timerInput, options);


function checkDate(SelectedDate) {
   
    if (SelectedDate<new Date()) {
        Notify.failure("Please choose a date in the future");
            btnStart.setAttribute("disabled", '');
       
    } else {
      btnStart.removeAttribute("disabled");  
    }



}



///

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

btnStart.addEventListener('click', updateTimer);

function updateTimer() {

 btnStart.setAttribute("disabled", '');
    timerId = setInterval(() => {
       
    let dateChanged = convertMs(SelectedDate - new Date());
      
         days.textContent = addLeadingZero(dateChanged.days);
         hours.textContent = addLeadingZero(dateChanged.hours);
         minutes.textContent = addLeadingZero(dateChanged.minutes);
      seconds.textContent = addLeadingZero(dateChanged.seconds);
      
       if (dateChanged.days <= 0 && dateChanged.hours <= 0 && dateChanged.minutes<= 0 && dateChanged.seconds <= 0) {
      clearInterval(timerId);
    }
  }, 1000);
    



    
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0")
}

function resetTimer() {

    try {
        
        clearInterval(timerId);
         days.textContent = "00";
         hours.textContent  = "00";
         minutes.textContent  = "00";
         seconds.textContent  = "00";
      } catch (error) {
        
      };

 
   


}

