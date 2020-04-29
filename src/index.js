"use strict";

/**
 * es6 modules and imports
 */

const $ = require('jquery');

import sayHello from './hello';
sayHello('World');

// $('#load_message').html('loading...');

console.log('movie time!');


/**
 * require style imports
 */

const {getMovies} = require('./api.js');

let htmlBody = "<table>";

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  $("#main").empty();

  movies.forEach(({title, rating, id}) => {

    console.log(`id#${id} - ${title} - rating: ${rating}`);

    htmlBody += `<tr>
                    <th>Title</th>
                    <th>Rating</th>
                    <th>id</th>
                </tr>
                <tr>
                    <td>${title}</td>
                    <td>${rating}</td>
                    <td>${id}</td>
                </tr>`


  });
  htmlBody += '</table>';
  $('#main').html(htmlBody);

  // API.createMovieLists();

}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});

// Create a form for adding a new movie
// that has fields for the movie's title and rating
$('#add_btn').click(function () {
  let movieTitle = $('#movie-title').val();
  let movieRating = $('#movie-rating').val();
  let data = {
    "title": `${movieTitle}`,
    "rating": `${movieRating}`
  };

    const API = {
      createReview: () => {
        fetch("/api/movies", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
              console.log('Success:', data);
            })
            .catch(error => console.error(error));
      }
    };
    API.createReview();
    getMovies();
});

$('#edit_btn').click(function () {
  let editTitle = $('#edit-title').val();
  let editRating = $('#edit-rating').val();
  let editData = {
    "title": `${editTitle}`,
    "rating": `${editRating}`
  };

  const API = {
    editReview: () => {
      fetch("/api/movies", {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
          })
          .catch(error => console.error(error));
    }
  };
  API.editReview();
  getMovies();
});


