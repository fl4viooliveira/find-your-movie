// OMDb api call
var test = document.querySelector(".test");
var h1 = document.createElement("h1");

h1.textContent = "Test from script.js file";
test.append(h1);


$(document).ready(function () {
  // search button click
  $("#search-button").click(function () {
    // get movie title from input
    var movieTitle = $("#search-input").val();

    // search for the movie title in OMDb API and appends it in the html
    searchMovie(movieTitle);
  });
});

function searchMovie(movieTitle) {

  // AJAX call to OMDb API
  $.ajax({
    type: "GET",
    url: `https://www.omdbapi.com/?t=${movieTitle}&apikey=556cb440`,
    success: function (movieInfo) {
      // check if movie information was successfully retrieved
      if (movieInfo.Response === "True") {
        // create movie container
        var movieContainer = $("<div>").addClass("movie-container");
        var movieTitle = $("<h2>").text(movieInfo.Title);
        var movieYear = $("<p>").text(movieInfo.Year);
        var moviePoster = $("<img>").attr("src", movieInfo.Poster);
        // append movie information to movie container
        movieContainer.append(movieTitle, movieYear, moviePoster);
        $("#movies").html(movieContainer);
      } else {
        alert("Please insert a valid movie title");
      }
    },
    error: function () {
      alert("Error occurred while retrieving movie information");
    }
  });
}
// OMDb API call





















