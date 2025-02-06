import { isEscapeKey } from './util.js';
import './popup-data.js';
import { postGenerator } from './data.js';

const userModalElement = document.querySelector('.big-picture');
const userModalElementPicture = userModalElement.querySelector('.big-picture__img img');
const userModalCloseElement = userModalElement.querySelector('.big-picture__cancel');
const pageBody = document.querySelector('body');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

function openUserModal (evt) {
  pageBody.classList.add('modal-open');
  const id = evt.currentTarget.dataset.id;
  const pictureData = postGenerator.find((item) => item.id === Number(id));

  userModalElementPicture.src = pictureData.url;
  userModalElementPicture.alt = pictureData.description;
  userModalElement.querySelector('.likes-count').textContent = pictureData.likes;
  userModalElement.querySelector('.social__comment-count').textContent = '5 из ' + (pictureData.comments.length - 1) + ' комментариев';
  userModalElement.querySelector('.social__caption').textContent = pictureData.description;
  userModalElement.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUserModal () {
  userModalElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  pageBody.classList.remove('modal-open');
}

export const renderBigPhoto = () => {
  const userModalOpenElement = document.querySelectorAll('.picture');
  userModalOpenElement.forEach((item) => item.addEventListener('click', openUserModal));
};

userModalCloseElement.addEventListener('click', () => {
  closeUserModal();
});
