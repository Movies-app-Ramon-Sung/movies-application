module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json());
  },
  editReview: (editData) => {
    const $ = require('jquery');
    let editID = $('#id_nums').val();
    const url = '/api/movies/' + editID
    fetch(url, {
      method: 'PUT',
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
  },

  deleteReview: (deleteData) => {
    const $ = require('jquery');
    let deleteID = $('#id_nums').val();
    const url = '/api/movies/' + deleteID
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deleteData),
    })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch(error => console.error(error));
  }

};
