var section = $("#movie-info");
var getInput = $("#search-input");
var inputBtn = $("#btn-search");

// YOUTUBE API BLOCK --------------------------------------
function trailerCall(inp) {
  $.ajax({
    url: `${YOUTUBE_URL}5&q=${inp}&key=${YOUTUBE_KEY}`,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    var videoId = response.items[0].id.videoId;
      // <iframe width="560" height="315" 
    var iframe = $(`
      <iframe 
      class="video"
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
      allowfullscreen>
      </iframe>
      `);

    $('#trailer').append(iframe);
  });
}
// YOUTUBE API BLOCK ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// OMBd API BLOCK ------------------------------------------
function movieSearch(inp) {
  $.ajax({
    url: `https://www.omdbapi.com/?t=${inp}&apikey=556cb440`,
    method: "GET",
    success: function (movieInfo) {
      console.log(movieInfo);

      // Movie Poster
      var imgAnchor = $("#img-anchor");
      var imgMovie = $(
        `<img src=${movieInfo.Poster} class="card-img rounded-start" alt=${movieInfo.Title}>`
      );
      imgAnchor.append(imgMovie);

      // Movie Info
      var headerInfo = $("#header-info");
      var title = $(
        `<h2 class="text-center">${movieInfo.Title} <small class="text-muted">(${movieInfo.Year})</small></h2>`
      );
      headerInfo.append(title);

      var infoAnchor = $("#info-anchor");
      var genre = $(
        `<p class="card-text"><b>Genre:</b> ${movieInfo.Genre}</p>`
      );
      var actors = $(
        `<p class="card-text"><b>Actors:</b> ${movieInfo.Actors}</p>`
      );
      var director = $(
        `<p class="card-text"><b>Director:</b> ${movieInfo.Director}</p>`
      );
      var writer = $(
        `<p class="card-text"><b>Writer:</b> ${movieInfo.Writer}</p>`
      );
      var overview = $(
        `<p class="card-text"><b>Overview:</b> ${movieInfo.Plot}</p>`
      );
      var awards = $(
        `<p class="card-text"><b>Awards:</b> ${movieInfo.Awards}</p>`
      );

      infoAnchor.append(genre, actors, director, writer, overview, awards);

     trailerCall(`${movieInfo.Title} ${movieInfo.Year} official trailer`) 

    },
  });
}
// OMBd API BLOCK ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// SEARCH BUTTON BLOCK --------------------------------------
inputBtn.on("click", function (event) {
  event.preventDefault();
  var movie = getInput.val();

  movieSearch(movie);
});
// movieSearch("Avatar");
// SEARCH BUTTON BLOCK ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
