var section = $('#section2')
var getInput = $("#search-input");
var inputBtn = $("#btn-search");

function movieSearch(inp) {
  $.ajax({
    url: `https://www.omdbapi.com/?t=${inp}&apikey=556cb440`,
    method: "GET",
    success: function(movieInfo) {
      console.log(movieInfo);

      var row = $('<div class="row" >')
      var carCol = $('<div class="card md-3 col-6">')
      row.append(carCol)
      var rowG = $('<div class="row g-0">')
      carCol.append(rowG)
      var colMd4 = $('<div class="col-md-4">')
      rowG.append(colMd4)
      var imgMovie = $(`<img src=${movieInfo.Poster} class="img-fluid rounded-start" alt=${movieInfo.Title}>`)
      colMd4.append(imgMovie)
      var colMd8 = $('<div class="col-md-8">')
      rowG.append(colMd8)
      var cardBody = $('<div class="card-body">')
      colMd8.append(cardBody)
      var title = $(`<h6 class="card-title">${movieInfo.Title} <small class="text-muted">(${movieInfo.Year})</small></h6>`)
      cardBody.append(title)
      var genre = $(`<p class="card-text">- ${movieInfo.Genre}</p>`)
      cardBody.append(genre)
      var overview = $(`<p class="card-text">${movieInfo.Plot}</p>`)
      cardBody.append(overview)



      
      section.append(row)

    },
  });
}

inputBtn.on("click", function(event) {
  event.preventDefault();
  var movie = getInput.val();

  movieSearch(movie)

});
  movieSearch("Avatar")
