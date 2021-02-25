/**
 * module for fetching movie information from http://www.omdbapi.com api.
 * @version 1.0.0
 */

const request = require('request');
const axios = require('axios');

const url = 'http://www.omdbapi.com';
const apikey = '47f22ad9';

// fetch data from api using request
var getMovieByTitle = function (title, callback) {
  title = encodeURIComponent(title);
  request({
    url: `${url}?apikey=${apikey}&t=${title}`,
    json: true
  }, (error, response, body) => {
    if (error)
      callback(error);
    else if (response.statusCode === 200) {
      callback(undefined, body);
    }
  });
}
// fetch data from api using axios
var getMovieByTitleAndYear = function (title, year) {
  title = encodeURIComponent(title);
  const newURL = url + `?apikey=${apikey}&t=${title}&y=${year}`;
  return axios.get(newURL).then((result) => {
    if (result.data.Response === 'True')
      return result.data;
    else
      throw new Error(result.data.Error);
  });
}

module.exports = { getMovieByTitle, getMovieByTitleAndYear }