import { ErrorText } from './api';

const ALERT_SHOW_TIME = 5000;

export const showAlert = () => {
  const alert = document.querySelector('#error').content.querySelector('.error');
  const alertText = alert.querySelector('.error__title');
  alertText.textContent = ErrorText.POST;
  const alertClone = alert.cloneNode(true);

  document.body.appendChild(alertClone);

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
  document.body.appendChild(messageClone);

  setTimeout(() => {
    document.body.removeChild(messageClone);
  }, ALERT_SHOW_TIME);
};
