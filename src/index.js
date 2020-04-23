import debounce from 'lodash.debounce';
import PNotify from './js/pnotify';
import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/src/styles/main.scss';

import refs from './js/refs';
import fetchImageQuery from './js/apiService';
import markup from './js/gallery-markup';

import './styles.css';

refs.form.addEventListener('input', debounce(onInput, 500));
refs.gallery.addEventListener('click', onImageClick);

function onInput(event) {
  event.preventDefault();
  const query = event.target.value;

  if (query.length === 0) {
    refs.gallery.innerHTML = '';
    return;
  }

  fetchImageQuery(query).then(data => markup(data));
}

function onImageClick(event) {
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
