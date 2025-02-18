import { isEscapeKey } from './util';

const uploadFileControl = document.querySelector('.img-upload__start');
const pageBody = document.querySelector('body');

const photoEditorForm = document.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');
const uploadTextForm = document.querySelector('.img-upload__text');

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
}

export const initUploadModal = () => {
  uploadFileControl.addEventListener('change', () => {
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
    photoEditorResetBtn.addEventListener('click', onPhotoEditorBtnClick);
  });
};
