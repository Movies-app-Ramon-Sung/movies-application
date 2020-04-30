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

const {getMovies, editReview, deleteReview} = require('./api.js');

let htmlBody = "<table>";

updateMovies();

function updateMovies () {
  htmlBody = "<table>";
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
                <tr class="add_editFunc" id="delete_movie">
                    <td class="add_editFunc">${title}</td>
                    <td class="add_editFunc">${rating}</td>
                    <td class="add_editFunc">${id}</td>
<!--                    <td class="add_editFunc"><button id="delete_btn" >delete</button></td>-->
                </tr>`


    });

    htmlBody += '</table>';
    $('#main').html(htmlBody);

  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
  });
};
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
    updateMovies();
});



$('#edit_btn').on("click", function (e) {
  e.preventDefault();
  let editTitle = $('#edit-title').val();
  let editRating = $('#edit-rating').val();
  let editID = $('#id_nums').val();
  console.log(editID);

  let editData = {
    "title": `${editTitle}`,
    "rating": `${editRating}`,
    "id": `${editID}`
  };
  editReview(editData);
  updateMovies();
});

$('#delete_btn').on("click", function (e) {
  e.preventDefault();
  let deleteRow = {
    "id" : `${deleteID}`
  };
  // console.log(deleteRow);


  // let deleteData = {
  //   "title": `${editTitle}`,
  //   "rating": `${editRating}`,
  //   "id": `${editID}`
  // };
  deleteReview(deleteRow);
  updateMovies();
});

