// YouTube Integration Test ---------------------------------------------
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
  var inputMovie = $("#search").val();
  movieCall(inputMovie);
});
// YouTube Integration Test ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
