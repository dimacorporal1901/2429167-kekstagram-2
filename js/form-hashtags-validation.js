const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;

let errorMessage = '';

const error = () => errorMessage;

const isHashtagValide = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if (!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  const rules = [
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хештег не может состоять из одной решётки',
    },
    {
      check: inputArray.some((item) => item.slice(1).includes('#')),
      error: 'Хештеги разделяются пробелами',
    },
    {
      check: inputArray.some((item) => item !== '#'),
      error: 'Хештег должен начинаться с символа \'#\'',
    },
  ];
};
