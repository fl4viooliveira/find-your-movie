var section = $("#movie-info");
var getInput = $("#search-input");
var inputBtn = $("#btn-search");

// ITUNES API BLOCK ------------------------------------
function soundTrack(inp) {
  var movieArr = inp.split(" ");
  var movieURLInput = movieArr.join("+");
  var movieQueryURL =
    "https://itunes.apple.com/search?&entity=album&term=" +
    movieURLInput +
    "&limit=5";
  var footer = $("#footer-info");
  footer.attr('class', 'card-footer d-flex')

  var sondTrack = $('<span class="badge rounded-pill text-bg-info my-3">Movie Sound Tracks</span>')
  $('#sound-track').prepend(sondTrack)

  $.ajax({
    url: movieQueryURL,
    method: "GET",
  }).then(function (response) {
    var array = JSON.parse(response);
    console.log(array);

    for (let i = 0; i < 5; i++) {
      var thisArray = array.results[i];
      var card = $("<div>");
      console.log(thisArray);

      // Get the album cover
      var albumCover = thisArray.artworkUrl100;
      var albumIcon = $("<img>").attr("src", albumCover);

      // Get the Album name
      var albumName = thisArray.collectionCensoredName;
      var albumTitle = $('<p class="album-name">').text(albumName);

      // Get the link to the album
      var albumURL = thisArray.collectionViewUrl;

      var anchor = $(`<a href=${albumURL} target="_blank">`);
      anchor.append(albumIcon, albumTitle);

      // $("#music-input").append(card.append(albumTitle, albumIcon, artistName, numOfTracks, linkToAlbum))
      // footer.append(card.append(albumTitle, anchor));
      footer.append(card.append(anchor));
    }
  });
}
// ITUNES API BLOCK ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// YOUTUBE API BLOCK --------------------------------------
function trailerCall(inp) {
  $.ajax({
    url: `${YOUTUBE_URL}5&q=${inp}&key=${YOUTUBE_KEY_2}`,
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

    $("#trailer").append(iframe);
  });
}
// YOUTUBE API BLOCK ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// OMBd API BLOCK ------------------------------------------
function movieSearch(inp) {
  var newSearchBlock = $('<div class="container-fluid bg-black">');
  var newSearchBtn = $(
    '<button id="new-search" class="btn btn-outline-info p-0 my-2">New Search</button>'
  );
  newSearchBlock.append(newSearchBtn);
  $("#movie-info").prepend(newSearchBlock);

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

      trailerCall(`${movieInfo.Title} ${movieInfo.Year} official trailer`);
      soundTrack(movieInfo.Title);
    },
  });
  // NEW SEARCH BUTTON BLOCK --------------------------------------
  $("#new-search").on("click", function () {
    location.reload();
  });
  // NEW SEARCH BUTTON BLOCK ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
}
// OMBd API BLOCK ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// SEARCH BUTTON BLOCK --------------------------------------
inputBtn.on("click", function (event) {
  event.preventDefault();
  var movie = getInput.val();

  $(".jumbotron").attr("style", "display: none !important;");
  movieSearch(movie);
});
// movieSearch("Harry Potter");
// SEARCH BUTTON BLOCK ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
