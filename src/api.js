module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json());
  },
  editReview: (editData) => {
    const url = '/api/movies/' + Theid
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
  }

};
