const request = require('supertest');
const app = require('../app.js');

describe('GET /movies', function() {
  it('return list of movies', function() {
    return request(app)
      .get('/api/v1/movies')
      .expect(200)
      .expect('Content-Type',/json/)
      .expect((res)=>{
        console.log("movies List >>>" + JSON.stringify(res));
      })
  })
})



describe('POST /api/v1/movies', function() {
  it('should create a new movie', async function() {
    const newMovieData = {
      "2022": 1,
  "2023": 1,
  "Pos": 1,
  "Title": "new 545sadsda",
  "Director": "Wellesa, Orson",
  "Year": 1941,
  "Country": "USA",
  "Length": 119,
  "Genre": "Drama-Mystery",
  "Colour": "BW"
    };

    const response = await request(app)
      .post('/api/v1/movies')
      .send(newMovieData)
      .expect(201) // Assuming 201 for successful creation
      .expect('Content-Type', /json/);
    console.log("New Movie Response:", response.body);
  });
});



describe("PUT /api/v1/movies/:id", function () {
  it("should update an existing movie", async function () {
    const { expect } = await import("chai");
    const movieId = "66405f35a914d786c242f86f"; // Example movie ID
    const updatedMovieData = {
      "Title": "Updated Title",
      "Director": "Updated Director",
    };

      const response = await request(app)
        .put(`/api/v1/movies/${movieId}`)
        .send(updatedMovieData)
        .expect((res) => {
          expect(res.status).to.equal(200); // Check the response status code
          console.log("Updated Movie Response:", res.body);
        });


  });
});



describe("DELETE /api/v1/movies/:id", function () {
  it("should delete an existing movie", async function () {
    const movieId = "66405f35a914d786c242f86c"; // Example movie ID
      const response = await request(app)
        .delete(`/api/v1/movies/${movieId}`)
        .expect((res) => {
          expect(res.status).to.equal(200); // Check the response status code
          console.log("Deleted Movie Response:", res.body);
        });
  });
});

