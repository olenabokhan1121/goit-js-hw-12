import axios from 'axios';

export const fetchPhotosByQuery = (searchedQuery, currentPage) => {
  const searchParams = new URLSearchParams({
   
      key: '48293498-9bc96457b3129dac42cff7415',
      q: searchedQuery,
image_type: 'photo',
orientation: 'horizontal',
      safesearch: 'true',
       page: currentPage,
per_page: 15,
  });
    
   return axios.get(`https://pixabay.com/api/?${searchParams}`)
    
};