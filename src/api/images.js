import axios from 'axios';

export async function fetchImages(name, page) {
  try {
    const response = await axios.get(`https://pixabay.com/api/`, {
      params: {
        q: name,
        page: page,
        key: '34337613-2920b37a051b595b5e379f3dc',
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      },
    });

    if (response.status === 200) {
      return response.data;
    }

    return Promise.reject(new Error(`No images ${name}`));
  } catch (error) {
    return Promise.reject(error);
  }
}

// export function fetchImages(name, page) {
//   return fetch(
//     `https://pixabay.com/api/?q=${name}&page=${page}&key=34337613-2920b37a051b595b5e379f3dc&image_type=photo&orientation=horizontal&per_page=12`
//   ).then(response => {
//     if (response.ok) {
//       return response.json();
//     }

//     return Promise.reject(new Error(`No images ${name}`));
//   });
// }
