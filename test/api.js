var section = $("#movie-info");
var getInput = $("#search-input");
var inputBtn = $("#btn-search");

var local = JSON.parse(localStorage.getItem("listOfMovies"));
console.log(local);

// ITUNES API BLOCK ------------------------------------
function soundTrack(inp) {
  var movieArr = inp.split(" ");
  var movieURLInput = movieArr.join("+");
  var movieQueryURL =
    "https://itunes.apple.com/search?&entity=album&term=" +
    movieURLInput +
    "&limit=5";
  var footer = $("#footer-info");
  footer.attr("class", "card-footer d-flex justify-content-evenly flex-wrap");

  var sondTrack = $(
    '<span class="badge rounded-pill text-bg-info my-3">Movie Sound Tracks</span>'
  );
  $("#sound-track").prepend(sondTrack);

  $.ajax({
    url: movieQueryURL,
    method: "GET",
  }).then(function(response) {
    var array = JSON.parse(response);

    for (let i = 0; i < 5; i++) {
      var thisArray = array.results[i];
      var card = $("<div>");

      // Get the album cover
      var albumCover = thisArray.artworkUrl100;
      var albumIcon = $("<img>").attr("src", albumCover);

      // Get the Album name
      var albumName = thisArray.collectionCensoredName;
      var albumTitle = $(
        '<p class="album-name text-wrap" style="width:150px;">'
      ).text(albumName);

      // Get the link to the album
      var albumURL = thisArray.collectionViewUrl;

      var anchor = $(
        `<a href=${albumURL} class="list-group-item text-white" target="_blank">`
      );
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
    url: `${YOUTUBE_URL}5&q=${inp}&key=${YOUTUBE_KEY_3}`,
    method: "GET",
  }).then(function(response) {
    console.log(response);
    var videoId = response.items[0].id.videoId;
    // <iframe width="560" height="315"
    var iframe = $(`
      <iframe 
      class="trailer"
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

    var trailerPill = $(
      '<span class="badge rounded-pill text-bg-info mb-5">Watch the Trailer</span>'
    );
    $("#trailer-column").prepend(trailerPill);
    $("#trailer").append(iframe);
  });
}
// YOUTUBE API BLOCK ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

var movieHistory = [];

/*
 *The storage function, pull the localStorage,
 *convert from JSON to Object and push to movieHistory array,
 *The last step is clear the localStorage to not duplicate,
 *when send the array back to localStorage
 */
function storage() {
  if (localStorage.listOfMovies) {
    var storage = JSON.parse(localStorage.getItem("listOfMovies"));
    for (var i = 0; i < storage.length; i++) {
      movieHistory.push(storage[i]);
    }
    localStorage.clear();
  }
}

// Function to send to localStorage the array with Movies called
function storeMovies(arr) {
  localStorage.setItem("listOfMovies", JSON.stringify(arr));
}

function history(mTitle, mPoster) {
  var arr = [mTitle, mPoster];
  movieHistory.push(arr);
}

// OMBd API BLOCK ------------------------------------------
function movieSearch(inp) {
  var newSearchBlock = $(
    '<div class="container d-flex justify-content-center bg-black">'
  );
  var newSearchBtn = $(
    '<button id="new-search" class="btn btn-outline-info px-5 my-3">New Search</button>'
  );
  newSearchBlock.append(newSearchBtn);
  $("#movie-info").prepend(newSearchBlock);

  $.ajax({
    url: `https://www.omdbapi.com/?t=${inp}&apikey=${OMDB_KEY}`,
    method: "GET",
    success: function(movieInfo) {

      if (movieInfo.Response === "True") {
        // Movie Poster
        var imgAnchor = $("#img-anchor");
        var imgMovie = $(
          `<img src=${movieInfo.Poster} class="card-img rounded-start" alt=${movieInfo.Title}>`
        );
        imgAnchor.append(imgMovie);

        // Movie Info
        var headerInfo = $("#header-info");
        var title = $(
          `<h2 class="text-center text-white my-3">${movieInfo.Title} <small class="text-muted">(${movieInfo.Year})</small></h2>`
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
        // soundTrack(movieInfo.Title);
        soundTrack(`${movieInfo.Title}`);

        // ----------------

        history(movieInfo.Title, movieInfo.Poster);

        storage();
        storeMovies(movieHistory);

        /*
         * Set: A value in the Set may only occur once; it is unique in the Set's collection
         * Array.from: method creates a new array from an array-like structure
         */
        // var cleanList = Array.from(new Set(movieHistory));
        // storeMovies(cleanList);
      } else {
        $("#header-info").append(
          "<h2 class='text-white'>Sorry! We didn't find your movie, please try again.</h2> "
        );
        console.log("Failed");
      }
    },
  });

  console.log(movieHistory);

  /*
   * Set: A value in the Set may only occur once; it is unique in the Set's collection
   * Array.from: method creates a new array from an array-like structure
   */
  // var cleanList = Array.from(new Set(movieHistory));
  // storeMovies(cleanList);

  // NEW SEARCH BUTTON BLOCK --------------------------------------
  $("#new-search").on("click", function() {
    location.reload();
  });
  // NEW SEARCH BUTTON BLOCK ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
}
// OMBd API BLOCK ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^



// SEARCH BUTTON BLOCK --------------------------------------
inputBtn.on("click", function(event) {
  event.preventDefault();
  var movie = getInput.val();

  $(".jumbotron").attr("style", "display: none !important;");
  movieSearch(movie);
});
// movieSearch("Harry Potter");
// SEARCH BUTTON BLOCK ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// CAROUSEL -------------------------------------------------
var carouselAnchor = $("#carousel-anchor");

function carousel(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (i === 0) {
      var carouselItem = $(`<div class="carousel-item active">`);
      var img = $(`<img src=${arr[i][1]} class="d-block mx-auto movImg" role="button" alt="${arr[i][0]}">`)
      carouselAnchor.prepend(carouselItem);
      carouselItem.append(img)
    }else{
      var carouselItem = $(`<div class="carousel-item">`);
      var img = $(`<img src=${arr[i][1]} class="d-block mx-auto movImg" role="button" alt="${arr[i][0]}">`)
      carouselAnchor.prepend(carouselItem);
      carouselItem.append(img)
    }
  }
}
if (local.length > 0) {
  carousel(local);
}

$('.movImg').on('click', function(event){
  event.preventDefault();
  var alt = $(this).attr('alt')
  console.log(alt)
  $(".jumbotron").attr("style", "display: none !important;");
  movieSearch(alt);
})
// CAROUSEL ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
