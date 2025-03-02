import { ErrorText } from './api';

const ALERT_SHOW_TIME = 5000;

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = () => {
  const alert = document.querySelector('#error').content.querySelector('.error');
  const alertText = alert.querySelector('.error__title');
  alertText.textContent = ErrorText.POST;

  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

export { getRandomInteger, getRandomArrayElement, createRandomIdFromRangeGenerator, isEscapeKey, showAlert };
