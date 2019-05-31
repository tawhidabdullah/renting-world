import axios from "axios";

export const uploadImage = image => {
    const formData = new FormData();
    formData.append('image', image);
    return axios.post('/image-upload', formData)
        .then((json => {
            return json.data.imageUrl;
        }))
        .catch(({
            response
        }) => Promise.reject(response.data.errors[0]));
};