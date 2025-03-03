import { ErrorText } from './api.js';

const ALERT_SHOW_TIME = 5000;

export const showAlert = () => {
  const alert = document.querySelector('#error').content.querySelector('.error');
  const alertText = alert.querySelector('.error__title');
  alertText.textContent = ErrorText.POST;
  const alertClone = alert.cloneNode(true);
  const alertButton = alertClone.querySelector('.error__button');

  document.body.appendChild(alertClone);

  alertButton.addEventListener('click', () => {
    document.body.removeChild(alertClone);
  });

  setTimeout(() => {
    document.body.removeChild(alertClone);
  }, ALERT_SHOW_TIME);
};

export const showDataAlert = () => {
  const dataAlert = document.querySelector('#data-error').content.querySelector('.data-error');
  const dataAlertClone = dataAlert.cloneNode(true);

  document.body.appendChild(dataAlertClone);
};

export const showSuccessMessage = () => {
  const message = document.querySelector('#success').content.querySelector('.success');
  const messageClone = message.cloneNode(true);
  const messageButton = messageClone.querySelector('.success__button');
  document.body.appendChild(messageClone);

  messageButton.addEventListener('click', () => {
    document.body.removeChild(messageClone);
  });

  setTimeout(() => {
    document.body.removeChild(messageClone);
  }, ALERT_SHOW_TIME);
};
