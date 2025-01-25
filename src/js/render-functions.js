
export const createGalleryCardTemplate = imgInfo => {
 
  return `
    <li class="gallery-card"><a href="${imgInfo.largeImageURL}">
      <img class="gallery-img" src="${imgInfo.webformatURL}" alt="${imgInfo.tags}" title=""/></a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b> ${imgInfo.likes}
        </p>
        <p class="info-item">
          <b>Views</b> ${imgInfo.views}
        </p>
        <p class="info-item">
          <b>Comments</b> ${imgInfo.comments}
        </p>
        <p class="info-item">
          <b>Downloads</b> ${imgInfo.downloads}
        </p>
      </div>
    </li>
  `;
};