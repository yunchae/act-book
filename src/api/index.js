import axios from 'axios'

axios.defaults.timeout = 5000;
axios.defaults.headers.get['Content-Type'] = 'application/json';

export default {
  searchBook: function(title){
    return axios.get(`https://act-books-api.zz.am/books?title=${title}`)
  }
}
