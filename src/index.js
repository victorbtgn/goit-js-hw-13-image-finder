import debounce from 'lodash.debounce';
import PNotify from './js/pnotify';

import refs from './js/refs';
import fetchImageQuery from './js/apiService';
import markup from './js/gallery-markup';

import './styles.css';

refs.form.addEventListener('input', debounce(onInput, 500));

function onInput(event) {
  event.preventDefault();
  const query = event.target.value;

  if (query.length === 0) {
    refs.gallery.innerHTML = '';
    return;
  }

  fetchImageQuery(query).then(data => markup(data));
}
