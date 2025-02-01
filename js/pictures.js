import { postGenerator } from './data.js';
import { renderBigPhoto } from './popup.js';

const randomUserPicture = postGenerator;

const randomUserPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesList = document.querySelector('.pictures');

const renderPictures = () => {
  renderBigPhoto();

  const randomUserPictureFragment = document.createDocumentFragment();

  randomUserPicture.forEach(({url, description, likes, comments}) => {
    const pictureElement = randomUserPictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length - 1;
    randomUserPictureFragment.appendChild(pictureElement);
  });

  const randomUserBigPicture = document.querySelector('.big-picture');

  randomUserBigPicture.forEach(({url, description, likes, comments}) => {
    const bigPictureElement = randomUserBigPicture.cloneNode(true);
    bigPictureElement.querySelector('.big-picture__img').src = url;
  });

  picturesList.appendChild(randomUserPictureFragment);
};

export { renderPictures };
