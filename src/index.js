import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const APIkey = '36164280-5a97b1e7af3918175df61f7fa';
const API_URL = `https://pixabay.com/api/`;

const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('#search-form input');
const galleryEl = document.querySelector('.gallery');
const showMoreBtn = document.querySelector('.show-more');

showMoreBtn.style.visibility = 'hidden';

let page = 1;
let perPage = 40;

async function apiSearch() {
  try {
    keyWord = inputEl.value.trim();
    const response = await axios.get(
      `${API_URL}?key=${APIkey}&q=${keyWord}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error:' + error);
  }
}

async function renderPhoto() {
  const newImages = await apiSearch();
  const imagesHTML = newImages.hits
    .map(
      picture => `
            <div class="photo-card border rounded shadow-lg">
              <a href="${picture.largeImageURL}" class="test"><img src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" class="w-80 h-52 object-cover" /></a>
                <div class="info p-3 text-sm flex justify-between items-center">
                  <p class="info-item flex flex-col text-center">
                    <b>Likes</b>
                    ${picture.likes}
                  </p>
                  <p class="info-item flex flex-col text-center">
                    <b>Views</b>
                    ${picture.views}
                  </p>
                  <p class="info-item flex flex-col text-center">
                    <b>Comments</b>
                    ${picture.comments}
                  </p>
                  <p class="info-item flex flex-col text-center">
                    <b>Downloads</b>
                    ${picture.downloads}
                  </p>
                </div>
            </div>`
    )
    .join(' ');
  galleryEl.innerHTML += imagesHTML;
  new SimpleLightbox('.gallery a');
}

async function fetchPhotos(e) {
  e.preventDefault();
  showMoreBtn.style.visibility = 'visible';
  const newImages = await apiSearch();
  if (newImages.totalHits === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    Notiflix.Notify.success(`Hooray! We found ${newImages.total} images.`);
    renderPhoto();
  }
  galleryEl.innerHTML = '';
}
formEl.addEventListener('submit', fetchPhotos);

async function showNextPage() {
  page++;
  const newImages = await apiSearch();
  if (page > newImages.totalHits / perPage + 1) {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
  renderPhoto();
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 11,
    behavior: 'smooth',
  });
}

showMoreBtn.addEventListener('click', () => {
  showMoreBtn.style.visibility = 'hidden';
  showNextPage();
  showMoreBtn.style.visibility = 'visible';
});
