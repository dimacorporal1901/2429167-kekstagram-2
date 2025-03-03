import { ErrorText } from './api';

const ALERT_SHOW_TIME = 5000;

export const showAlert = () => {
  const alert = document.querySelector('#error').content.querySelector('.error');
  const alertText = alert.querySelector('.error__title');
  alertText.textContent = ErrorText.POST;

  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

export const showSuccessMessage = () => {
  const message = document.querySelector('#success').content.querySelector('.success');

  document.body.append(message);

  setTimeout(() => {
    message.remove();
  }, ALERT_SHOW_TIME);
};
