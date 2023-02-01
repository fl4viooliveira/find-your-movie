var test = document.querySelector(".test");
var h1 = document.createElement("h1");

h1.textContent = "Test from script.js file";
test.append(h1);

// console.log(youtubeKey)

var key = youtubeKey;
var input = "The Matrix"
var queryURL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${input}&key=${key}`

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {

    // Log the queryURL
    console.log(response);
  })
