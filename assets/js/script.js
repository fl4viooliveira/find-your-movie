// OMDb api call
$(document).ready(function () {

  // search button click
  $("#search-button-new").on("click", function () {

    //get movie title from input
    var movieTitle = $("#search-input").val();

    //search for the movie title in OMDb API and appends it in the html
    searchMovie(movieTitle);

  });
});

function searchMovie(movieTitle) {

  // AJAX call to OMDb API
  $.ajax({
    url: `https://www.omdbapi.com/?t=${movieTitle}&apikey=556cb440`,
    method: "GET",
    success: function (movieInfo) {
      // check if the movie information was successfully retrieved
      if (movieInfo.Response === "True") {
        

        console.log(movieInfo);
        // create movie container
        var movieContainer = $("<div>").addClass("card");

        var moviePoster = $("<img>").attr("src", movieInfo.Poster).addClass("card-img-top");

        var movieData = $("<div>").addClass("card-body");
          var movieTitle = $("<h3>").addClass("card-title").text(movieInfo.Title);
          var movieYear = $("<h3>").addClass("card-text").text(`Released: ${movieInfo.Released}`);
          var runtime = $("<h3>").addClass("card-text").text(`Runtime: ${movieInfo.Runtime}`);
          var movieActors = $("<h3>").addClass("card-text").text(`Stars: ${movieInfo.Actors}`);
          var movieRating = $("<h3>").addClass("card-text").text(`Imdb: ${movieInfo.imdbRating} stars`);
          var oscarsPrizes = $("<h3>").addClass("card-text");
            var oscarsPrizesText = $("<small>").addClass("text-muted").text(`Awards: ${movieInfo.Awards}`);
            oscarsPrizes.append(oscarsPrizesText);  
          var plotDescription = $("<p>").addClass("card-description").text(movieInfo.Plot);

        movieData.append(movieTitle, movieYear, runtime, movieActors, movieRating, oscarsPrizes, plotDescription,);

        // append movie information to movie container
        movieContainer.append(moviePoster, movieData);
        $("#section2").html(movieContainer);
        window.location.href = "#section2";

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

/*
var youtube = $("#youtube");
youtube.attr("class", "container m-3");
var h2 = $("<h2>");
h2.text("Add a movie name to test:");

var button = $('<button class="btn btn-primary m-3">Search</button>');

var input = $("<input>");
input.attr("id", "search");
youtube.append(h2);
youtube.append(input);
youtube.append(button);

function movieCall(inp) {
  $.ajax({
    url: `${YOUTUBE_URL}5&q=${inp}&key=${YOUTUBE_KEY_2}`,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    var videoId = response.items[0].id.videoId;

    var iframe = $(`
      <iframe width="560" height="315" 
      src="https://www.youtube.com/embed/${videoId}" 
      title="YouTube video player" 
      frameborder="0" 
      allow="accelerometer; 
      autoplay; 
      clipboard-write; 
      encrypted-media; 
      gyroscope; 
      picture-in-picture; 
      web-share" 
      allowfullscreen></iframe>
      `);

    youtube.append(iframe);
  });
}

button.on("click", function (event) {
  event.preventDefault();
  var inputMovie = $("#search-input").val();
  movieCall(inputMovie);
});
// YouTube Integration Test ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/
