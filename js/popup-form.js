import './api';
import { ErrorText, sendData } from './api';
import { onEffectChange } from './effects-slider';
import { isEscapeKey, showAlert } from './util';
import { pristine, resetForm } from './validation';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...',
};

const uploadFileControl = document.querySelector('.img-upload__start');
const pageBody = document.querySelector('body');

const photoEditorForm = document.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');
const img = photoEditorForm.querySelector('.img-upload__preview img');
const scaleControl = photoEditorForm.querySelector('.scale__control--value');
const smaller = photoEditorForm.querySelector('.scale__control--smaller');
const bigger = photoEditorForm.querySelector('.scale__control--bigger');
const effectsList = photoEditorForm.querySelector('.effects__list');
const submitButton = photoEditorForm.querySelector('.img-upload__submit');

let photoScale = 1;
const SCALE_STEP = 0.25;

const onPhotoEditorBtnClick = () => {
  closePhotoEditor();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoEditor();
  }
};

function closePhotoEditor () {
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorResetBtn.removeEventListener('click', onPhotoEditorBtnClick);
  resetForm();
}

export const initUploadModal = () => {
  uploadFileControl.addEventListener('change', () => {
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
    photoEditorResetBtn.addEventListener('click', onPhotoEditorBtnClick);
  });
};

const onSmallerClick = () => {
  if (photoScale > SCALE_STEP) {
    img.style.transform = `scale(${photoScale -= SCALE_STEP})`;
    scaleControl.value = `${photoScale * 100}%`;
  }
};

const onBiggerClick = () => {
  if (photoScale < 1) {
    img.style.transform = `scale(${photoScale += SCALE_STEP})`;
    scaleControl.value = `${photoScale * 100}%`;
  }
};

smaller.addEventListener('click', onSmallerClick);
bigger.addEventListener('click', onBiggerClick);
effectsList.addEventListener('change', onEffectChange);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const submitForm = (onSuccess) => {
  photoEditorForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch(
          (err) => {
            showAlert(err);
          }
        )
        .finally(() => {
          unblockSubmitButton();
        });
    }
  });
};
