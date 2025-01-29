import { renderPictures } from './pictures';
import { isEscapeKey, isEnterKey } from './util';

const userModalElement = document.querySelector('.big-picture');

const userModalCloseElement = userModalElement.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

function openUserModal () {
  userModalElement.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUserModal () {
  userModalElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
}

export const renderBigPhoto = () => {
  const userModalOpenElement = document.querySelectorAll('.picture');
  userModalOpenElement.forEach(item => item.addEventListener('click', openUserModal));
};

userModalCloseElement.addEventListener('click', () => {
  closeUserModal();
});
