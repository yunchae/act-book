import axios from 'axios'

const instance = axios.create({
  timeout: 5000
  ,
  headers: {
    'X-Naver-Client-Id': '3hWvxsSHqpPmvgYQ_u6N',
    'X-Naver-Client-Secret': 'oxvuFisDg5'
  }
});

axios.defaults.timeout = 5000;
axios.defaults.headers.get['Content-Type'] = 'application/json';

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
  // generatePFS: function (param) {
  //   return instance.post(`${resources.URI}/v1/peerfeedback`, param);
  // }
  // login: function (feedbackToken, adminToken, password) {
  //   return instance.get(`${resources.URI}/v1/peerfeedback/${feedbackToken}/${adminToken}?logininfo={"pw":"${password}"}`);
  // }

  searchBook: function(title){

    return instance.get(`http://13.125.241.38:8080/books?title=${title}`)
  }
}
