import debounce from 'lodash.debounce';
import PNotify from './js/pnotify';
import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/src/styles/main.scss';
import InfiniteScroll from 'infinite-scroll';

import refs from './js/refs';
import fetchImageQuery from './js/apiService';
import markup from './js/gallery-markup';

import './styles.css';

refs.form.addEventListener('input', debounce(onInput, 500));
refs.gallery.addEventListener('click', onOpenModal);

// let page = 1;
// let query = '';

function onInput(event) {
  event.preventDefault();
  const query = event.target.value;
  // page = 1;

  if (query.length === 0) {
    refs.gallery.innerHTML = '';
    return;
  }

  fetchImageQuery(query)
    .then(data => markup(data))
    .then(infScroll);
}

function onOpenModal(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const largeImgUrl = event.target.dataset.srcset;

  const instance = basicLightbox.create(`
      <img src="${largeImgUrl}" alt="">
  `);

  instance.show();
}

const apiKey = '16159179-9a5d2f4d64cb4ee75e82dc2d4';

const infScroll = new InfiniteScroll('.gallery', {
  pageCount: 1,
  path: function () {
    return (
      'https://pixabay.com/api/?image_type=photo&orientation=horizontal&page=' +
      this.pageIndex +
      '&per_page=5&key=' +
      apiKey
    );
  },
  append: '.photo-card',
  history: false,
  // status: '.page-load-status',
});
