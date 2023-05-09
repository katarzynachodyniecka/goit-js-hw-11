export const renderPhoto = pictures => {
  return pictures.data.this
    .map(
      picture => `<div class="photo-card">
    <a href="${picture.largeImageURL}" class="test"><img src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" class="w-80 h-52 object-cover" /></a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b> ${picture.likes}
      </p>
      <p class="info-item">
        <b>Views</b> ${picture.views}
      </p>
      <p class="info-item">
        <b>Comments</b> ${picture.comments}
      </p>
      <p class="info-item">
        <b>Downloads</b> ${picture.downloads}
      </p>
    </div>
  </div>`
    )
    .join('');
};
