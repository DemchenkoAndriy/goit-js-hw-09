
import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    

    setTimeout(() => {
      // Change value of isSuccess variable to simulate request status
      const isSuccess = true;

      if (shouldResolve) {
        resolve({position,delay});
      } else {
        reject({position,delay});
      }
    }, delay);
  });
};


const form = document.querySelector(".form");




form.addEventListener("submit", startCreate);

function startCreate(e) {
 e.preventDefault();
  
    let { delay, step, amount } = e.target.elements;
  
  delay =  Number(delay.value);
  step = Number(step.value);
  amount =  Number(amount.value);
  let counter = delay;
  
  if (delay < 0) {
    Notify.failure(`The delay cannot be less than zero`);
    return;
  } else if(amount < 1) {  
    Notify.failure(`The Amount field must be greater than zero`);
    return;
  };
  
  for (let index = 1; index < amount+1; index++) {
  createPromise(index, counter)
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    counter += step;
  }
  

}