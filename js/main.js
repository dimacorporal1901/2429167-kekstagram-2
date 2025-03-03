import { initUploadModal } from './popup-form.js';
import { renderPictures } from './pictures';
import { renderBigPhoto } from './popup.js';
import { getData } from './api.js';
import { showDataAlert } from './message.js';

getData()
  .then((data) => {
    renderPictures(data);
    renderBigPhoto(data);
  })
  .catch(showDataAlert);


initUploadModal();
