import PNotify from '../js/pnotify';
import imageItem from '../templates/image-item.hbs';
import refs from '../js/refs';

function markup(arr) {
  if (arr.length === 0) {
    PNotify.notice({
      title: 'Not match found.',
    });
    return;
  }

  const markup = arr.reduce((acc, item) => {
    const listItem = imageItem(item);
    acc += listItem;
    return acc;
  }, '');

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

export default markup;
