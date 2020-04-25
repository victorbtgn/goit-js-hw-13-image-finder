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

let query = '';
const apiKey = '16159179-9a5d2f4d64cb4ee75e82dc2d4';

function onInput(event) {
  event.preventDefault();

  if (query !== event.target.value) {
    refs.gallery.innerHTML = '';
  }

  query = event.target.value;

  if (query.length === 0) {
    refs.gallery.innerHTML = '';
    return;
  }

  fetchImageQuery(query).then(data => markup(data));
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

const infScroll = new InfiniteScroll('.gallery', {
  path: function () {
    return (
      'https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=' +
      query +
      '&page=' +
      (this.pageIndex + 1) +
      '&per_page=10&key=' +
      apiKey
    );
  },
  history: false,
});

infScroll.on('request', function (path) {
  fetch(path)
    .then(res => res.json())
    .then(data => markup(data.hits));
});
