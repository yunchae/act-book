import axios from 'axios'

axios.defaults.timeout = 5000;
axios.defaults.headers.get['Content-Type'] = 'application/json';

export default {
  searchBook: function(title){
    //return axios.get(`https://act-books-api.zz.am/books?title=${title}`)
    return Promise.resolve(
      axios.get('https://hg8annz0g0.execute-api.ap-northeast-2.amazonaws.com/naverApiGateway?bookTitle=' + title).then((data)=>{
      return JSON.parse(data.data);

    }))

  }
}
