import axios from 'axios'



axios.defaults.timeout = 5000;
axios.defaults.headers.get['Content-Type'] = 'application/json';

const instance = axios.create();

instance.interceptors.request.use(config => {
  return config;
}, err => {
  return Promise.reject(err);
})

instance.interceptors.response.use(response => {
  return response
}, err => {
  return Promise.reject(err)
})

export default {
  searchBook: function(title){
    return instance.get(`https://act-books-api.zz.am/books?title=${title}`)
  }
}
