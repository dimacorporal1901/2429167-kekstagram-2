import { renderPictures } from './pictures';
import { debounce } from './util';

const FILTER = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

const SORTFUNC = {
  random: () => 0.5 - Math.random(),
  discussed: (a, b) => b.comments.length - a.comments.length,
};

const MAX_PICTURE_COUNT = 10;

let currentFilter = FILTER.default;
let pictures = [];
const imageFilters = document.querySelector('.img-filters');
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const picturesContainer = document.querySelector('.pictures');

const debounceRender = debounce(renderPictures);

function onFilterChange(evt) {
  const targetButton = evt.target;
  const activeButton = document.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
  if (!targetButton.matches('button')) {
    return;
  }
  if (activeButton === targetButton) {
    return;
  }
  activeButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  targetButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  currentFilter = targetButton.getAttribute('id');

  applyFilter();
  clearPhoto();
}

function applyFilter() {
  let filteredPictures = [];
  if (currentFilter === FILTER.default) {
    filteredPictures = pictures;
  }
  if (currentFilter === FILTER.random) {
    filteredPictures = pictures.toSorted(SORTFUNC.random).slice(0, MAX_PICTURE_COUNT);
  }
  if (currentFilter === FILTER.discussed) {
    filteredPictures = pictures.toSorted(SORTFUNC.discussed);
  }
  debounceRender(filteredPictures);
}

function configFilter(data) {
  imageFilters.classList.remove('img-filters--inactive');
  imageFilters.addEventListener('click', onFilterChange);
  pictures = data;
}

function clearPhoto() {
  picturesContainer.querySelectorAll('a.picture').forEach((item) => item.remove());
}

export { configFilter };
