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
console.log(movieInfo);      

// check if the movie information was successfully retrieved
      if (movieInfo.Response === "True") {
        
                    // create movie container
        var movieContainer = $("<div>").addClass("card");

        var moviePoster = $("<img>").attr("src", movieInfo.Poster).addClass("card-img-top");

        var movieData = $("<div>").addClass("card-body");
        var movieTitle = $("<h2>").addClass("card-title").text(movieInfo.Title);
        var movieYear = $("<h3>").addClass("card-text").text(movieInfo.Year);
        movieData.append(movieTitle, movieYear);

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

