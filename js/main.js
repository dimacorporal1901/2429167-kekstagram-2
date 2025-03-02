import { closePhotoEditor, initUploadModal, submitForm } from './popup-form.js';
import { renderPictures } from './pictures';
import { renderBigPhoto } from './popup.js';
import { getData } from './api.js';

getData()
  .then((data) => {
    renderPictures(data);
    renderBigPhoto(data);
  });


initUploadModal();
submitForm(closePhotoEditor);
