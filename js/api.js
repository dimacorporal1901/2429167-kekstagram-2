const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA:'/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

export const ErrorText = {
  [Method.GET]: 'Не удалось загрузить данные. Попробуйте ещё раз',
  [Method.POST]: 'Не удалось отправить данные формы',
};

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if(!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => load(Route.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, Method.POST, body);

export { getData, sendData };
