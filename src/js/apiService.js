const apiKey = '16159179-9a5d2f4d64cb4ee75e82dc2d4';

function fetchImageQuery(query) {
  return fetch(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${query}&key=${apiKey}`,
  )
    .then(res => res.json())
    .then(data => data.hits);
}

export default fetchImageQuery;
