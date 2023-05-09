import Notiflix from 'notiflix';
import axios from 'axios';
import simpleLightbox from 'simplelightbox';

const APIkey = '36164280-5a97b1e7af3918175df61f7fa';
const API_URL = `https://pixabay.com/api/`;
const PARAMS = `?key=${APIkey},q,image_type=photo,orientation=horizontal,safesearch=true`;

const inputEl = document.getElementById('search-form');
const buttonEl = document.querySelector('#search-form button');
const galleryEl = document.querySelector('.galletry');
const loadMoreBtn = document.querySelector('.load-more');

loadMoreBtn.style.visibility = 'hidden';

const clearCard = () => {
  listEl.innerHTML = '';
  infoEl.innerHTML = '';
};

const fetchCards = q => {
  return fetch(q)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error =>
      Notiflix.Notify.failure(
        `Sorry, there are no images matching your search query. Please try again.`
      )
    );
};

inputEl.addEventListener(
  'input',
  debounce(event => {
    // console.log(event.target.value);
    if (event.target.value.trim() !== '') {
      fetchCards(`${API_URL}${event.target.value.trim()}${PARAMS}`)
        .then(data => renderCard(data))
        .catch(error => console.log(error));
    } else {
      clearCard();
    }
  }, 300)
);

function renderCard(data) {
  return (galleryEl.innerHTML = `<div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>`);
}
