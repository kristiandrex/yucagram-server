import axios from 'axios';
const token = localStorage.getItem('token');

function get(url) {
  return axios.get(url, { headers: { authorization: token } });
}

function post(url, data) {
  return axios.post(url, data, { headers: { authorization: token } });
}

function del(url) {
  return axios.delete(url, { headers: { authorization: token } });
}

export default {
  post,
  get,
  delete: del
};