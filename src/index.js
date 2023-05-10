import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { renderPhoto } from './renderPhoto';
// import debounce from 'lodash.debounce';

const APIkey = '36164280-5a97b1e7af3918175df61f7fa';
const API_URL = `https://pixabay.com/api/`;
// const PARAMS = `?key=${APIkey},q,image_type=photo,orientation=horizontal,safesearch=true`;

const inputEl = document.querySelector('#search-form input');
const buttonEl = document.querySelector('#search-form button');
const galleryEl = document.querySelector('.gallery');
const showMoreBtn = document.querySelector('.show-more');

showMoreBtn.style.visibility = 'hidden';

let page = 1;
// let maxPages = 0;
let perPage = 40;
// let inputSearch = '';
// let lightbox = null;

// const clearCard = () => {
//   listEl.innerHTML = '';
//   infoEl.innerHTML = '';
// };
// const params = () =>
//   new URLParams({
//     key: APIkey,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//     q: inputEl.value,
//     per_page: perPage,
//     page: page,
//   });

const apiSearch = async () => {
  const response = await axios.get(API_URL, {
    params: {
      key: APIkey,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      q: inputEl.value,
      per_page: pageShow,
      page: page,
    },
  });
  console.log(response);

  return response;
};
const fetchPhotos = () => {
  apiSearch()
    .then(pictures => {
      const totalHits = pictures.data.total;

      if (pictures.data.hits.length === 0) throw new Error();

      totalHits > 40
        ? (showMoreBtn.style.visibility = 'visible')
        : (showMoreBtn.style.visibility = 'hidden');

      galleryEl.innerHTML = renderPhoto(pictures);

      Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);

      new SimpleLightbox('.gallery a');
    })
    .catch(error => {
      Notiflix.Notify.failure(
        `Sorry, there are no images matching your search query. Please try again.`
      );
    });
};

const fetchNewPhotos = () => {
  apiSearch().then(pictures => {
    const totalHits = pictures.data.total;

    totalHits / page > 40
      ? (showMoreBtn.style.visibility = 'visible')
      : (showMoreBtn.style.visibility = 'hidden');

    galleryEl.insertAdjacentHTML('beforeend', renderPhoto(pictures));

    new SimpleLightbox('.gallery a');

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 11,
      behavior: 'smooth',
    });
  });
};

buttonEl.addEventListener('click', e => {
  e.preventDefault();
  // inputSearch = e.currentTarget.elements.searchQuery.value;
  page = 1;
  fetchPhotos();
});

showMoreBtn.addEventListener('click', () => {
  page++;
  fetchNewPhotos();
});
