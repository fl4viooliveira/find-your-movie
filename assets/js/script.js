var key = youtubeKey;
var input = "The Matrix"
var queryURL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${input}&key=${key}`

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {

    console.log(response);
  })
