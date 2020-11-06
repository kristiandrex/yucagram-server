import axios from 'axios';

function get(url) {
  const token = localStorage.getItem('token');
  return axios.get(url, { headers: { authorization: token } });
}

function post(url, data) {
  const token = localStorage.getItem('token');
  return axios.post(url, data, { headers: { authorization: token } });
}

function del(url) {
  const token = localStorage.getItem('token');
  return axios.delete(url, { headers: { authorization: token } });
}

export default {
  post,
  get,
  delete: del
};