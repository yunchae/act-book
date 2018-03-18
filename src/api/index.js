import axios from 'axios'

const instance = axios.create();

axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/json';

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
  // },
  // login: function (feedbackToken, adminToken, password) {
  //   return instance.get(`${resources.URI}/v1/peerfeedback/${feedbackToken}/${adminToken}?logininfo={"pw":"${password}"}`);
  // }
}
