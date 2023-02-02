console.log("Hello World")

// pull input from website
// var movie = $("#???????").val();

// Line below to test
var movie = "Harry Potter"

// Keep below!!!
var movieArr = movie.split(' ');
console.log(movieArr);
var movieURLInput = movieArr.join('+');
console.log(movieURLInput);

var movieQueryURL = "https://itunes.apple.com/search?&entity=album&term=" + movieURLInput + "&limit=5";

$.ajax({
    url: movieQueryURL,
    method: "GET"
})
    .then(function (response) {
        var array = JSON.parse(response)
        // console.log(array)
        for (let i = 0; i < 5; i++) {
            // console.log("loop is working")
            var thisArray = array.results[i];
            // console.log(thisArray);
            var albumCover = array.results[i].artworkUrl100;
            console.log("The album cover source is :" + albumCover);
            var albumName = array.results[i].collectionCensoredName;
            console.log("This album is called: " + albumName);
            var artist = array.results[i].artistName;
            console.log("The artist is: " + artist);
            var trackNumber = array.results[i].trackCount;
            console.log("There are " + trackNumber + " tracks in this album");
            var albumURL = array.results[i].collectionViewUrl;
            console.log("The link to this album is: " + albumURL)
            console.log("________________________")
        }
    })