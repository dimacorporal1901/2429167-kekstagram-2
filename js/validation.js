import { sendData } from './api.js';
import { closePhotoEditor } from './popup-form.js';
import { isEscapeKey, showAlert } from './util.js';

const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...',
};

const uploadForm = document.querySelector('.img-upload__form');
const hashtagForm = uploadForm.querySelector('.text__hashtags');
const commentForm = uploadForm.querySelector('.text__description');
const photoEditorForm = document.querySelector('.img-upload__overlay');
const submitButton = photoEditorForm.querySelector('.img-upload__submit');

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
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хештег должен начинаться с символа \'#\'',
    },
    {
      check: inputArray.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Хештеги не должны повторяться',
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS),
      error: `Максимальная длина одного хештега ${MAX_SYMBOLS} символов, включая решетку`,
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} хештегов`,
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9()]*\s*$/i.test(item)),
      error: 'Хештег содержит недопустимые символы',
    }
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

export const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

pristine.addValidator(hashtagForm, isHashtagValide, error);

const onEscape = (event) => isEscapeKey(event) && event.stopPropagation();
[hashtagForm, commentForm].forEach((item) => item.addEventListener('keydown', onEscape));

export const resetForm = () => {
  uploadForm.reset();
  pristine.reset();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};


uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(() => {
        closePhotoEditor();
      })
      .catch(showAlert)
      .finally(unblockSubmitButton);
  }
});

