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

const {getMovies, editReview} = require('./api.js');

let htmlBody = "<table>";

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  $("#main").empty();

  movies.forEach(({title, rating, id}) => {

    console.log(`id#${id} - ${title} - rating: ${rating}`);

    htmlBody += `<tr class="add_editFunc">
                    <th>Title</th>
                    <th>Rating</th>
                    <th>id</th>
                </tr>
                <tr class="add_editFunc">
                    <td class="add_editFunc">${title}</td>
                    <td class="add_editFunc">${rating}</td>
                    <td class="add_editFunc">${id}</td>
                </tr>`


  });

  htmlBody += '</table>';
  $('#main').html(htmlBody);
  // $('.add_editFunc').click(function() {
  //   // go grab the id and use that for url on PATCH URL
  //   alert('title or rating was clicked!');
  // });

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

// $(document).on("click",".trash", function () {
//  let Theid = $(this).attr("id");
//  const url = '/api/movies/' +Theid;
//}

// var id = $('id');


$('#edit_btn').on("click", function (e) {
  e.preventDefault();
  let editTitle = $('#edit-title').val();
  let editRating = $('#edit-rating').val();
  let editID = $('#id_nums').val();
  console.log(editID);

  // let Theid = $(this).attr("id");

  // const url = '/api/movies/' + editID
  let editData = {
    "title": `${editTitle}`,
    "rating": `${editRating}`,
    "id": `${editID}`
  };
  editReview(editData);
  getMovies();

});


