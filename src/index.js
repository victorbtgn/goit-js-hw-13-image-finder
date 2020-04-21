import debounce from 'lodash.debounce';
import PNotify from './js/pnotify';

import './styles.css';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('input', debounce(onInput, 500));

function onInput(event) {
  const query = event.target.value;
  console.log(query);
}
