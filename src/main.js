import { createGalleryCardTemplate } from './js/render-functions.js';
import { fetchPhotosByQuery } from './js/pixabay-api.js';
import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";


let page = 1;
let searchedQuery = '';
let totalPages = 0;
const loaderEl = document.querySelector('.loader');

const showLoader = () => {
  loaderEl.style.display = 'block';
};

const  hideLoader = () => {
  loaderEl.style.display = 'none';
};


const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loadMoreBtnEl = document.querySelector('.js-load-more');
const lightbox = new SimpleLightbox('.gallery a');
const smoothScrool = () => {
    const cardHeight = galleryEl.firstElementChild.getBoundingClientRect().height;
    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
};


const onSearchFormSubmit = async event => {  event.preventDefault();
    showLoader();
    try{
      
    searchedQuery = event.currentTarget.elements.user_query.value.trim();

    if (searchedQuery === '') {
        hideLoader();
        iziToast.show({
            backgroundColor: '#ef4040',
            messageColor: '#fff',
            message: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM17 15.74L15.74 17 12 13.26 8.26 17 7 15.74 10.74 12 7 8.26 8.26 7 12 10.74 15.74 7 17 8.26 13.26 12 17 15.74z"/></svg> Поле має бути заповнено!',
            close: 'true',
            

        });

        return;
    }
 page = 1;

        loadMoreBtnEl.classList.add('is-hidden');
        const { data } = await fetchPhotosByQuery(searchedQuery, page);
         if (data.total === 0) {
                hideLoader();
                iziToast.show({
                    backgroundColor: '#ef4040',
                    messageColor: '#fff',
                    message: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" ><path d="M0 0h24v24H0z" fill="none"/><path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM17 15.74L15.74 17 12 13.26 8.26 17 7 15.74 10.74 12 7 8.26 8.26 7 12 10.74 15.74 7 17 8.26 13.26 12 17 15.74z"/></svg>  Sorry, there are no images matching your search query. Please try again!',
                    close: 'true',

                    iconColor: '#fff',
                });
        

                galleryEl.innerHTML = '';
                searchFormEl.reset();
       

                return;
            }
totalPages = Math.ceil(data.totalHits / 15);
        if (totalPages > 1) {
      loadMoreBtnEl.classList.remove('is-hidden');

      loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
    }

            galleryEl.innerHTML = '';
            const galleryTemplate = data.hits.map(el => createGalleryCardTemplate(el)).join('');
hideLoader();
            galleryEl.innerHTML = galleryTemplate;
            lightbox.refresh();
        searchFormEl.reset();
          
} catch(err) {
            console.log(err);
} finally {hideLoader();}
       
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
const onLoadMoreBtnClick = async () => {  showLoader();
        page++;
    try {
       
      
        const { data } = await fetchPhotosByQuery(searchedQuery, page);
        const galleryTemplate = data.hits.map(el => createGalleryCardTemplate(el)).join('');
       
        galleryEl.insertAdjacentHTML('beforeend', galleryTemplate);
        lightbox.refresh();
        smoothScrool();
        if (page >= totalPages) {
            loadMoreBtnEl.classList.add('is-hidden');

            loadMoreBtnEl.removeEventListener('click', onLoadMoreBtnClick);
            iziToast.show({
                    backgroundColor: '#ef4040',
                    messageColor: '#fff',
                    message: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" ><path d="M0 0h24v24H0z" fill="none"/><path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM17 15.74L15.74 17 12 13.26 8.26 17 7 15.74 10.74 12 7 8.26 8.26 7 12 10.74 15.74 7 17 8.26 13.26 12 17 15.74z"/></svg> We are sorry, but you have reached the end of search results.',
                    close: 'true',

                    iconColor: '#fff',
                });
        }    
    }catch(err) {
            console.log(err);
} finally {hideLoader();}
       
};
