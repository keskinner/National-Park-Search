'use strict';

const APIKey = 'zUYaGk36cceAhT58PAob97qTUuL1oqHqC30zoxCb';
const searchUrl = 'https://developer.nps.gov/api/v1/parks';
 
function watchSubmitButton() {
  $('form').submit(event => {
    console.log('loaded and ready');
    event.preventDefault();
    let resultNum = $('.maxResults').val();
    let stateInput = $('.search').val();
    fetchParks(stateInput, resultNum);
  });
}

function formatQueryParams(params) {
  console.log("The query params are formatted!");
  const queryItems = Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function fetchParks(query, limit = 10) {
  const params = {
    statecode: query,
    limit,
    api_key: APIKey,
  }
  const queryString = formatQueryParams(params);
  const url = searchUrl + "?" + queryString;
  

  fetch(url)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
      alert("Something went wrong! Please try again."); 
      console.log(error)});
    console.log('waiting on display');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('.display').empty();
  for (let i = 0; i < responseJson.data.length; i++) {
    $('.display').append(
      `<div class="window heading">
        <h3>${responseJson.data[i].fullName}</h3>
        <p>${responseJson.data[i].description}</p>
        <a href="${responseJson.data[i].url}">${responseJson.data[i].fullName} Website</a>
       </div>`);
  };
  $('.display').removeClass("hidden");
}

$(function () {
  console.log('app loaded and waiting');watchSubmitButton();
});
  