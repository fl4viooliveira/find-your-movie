// get name input from film search API

// Use this to return search of albums on offer

// show albums listed
// how many??

console.log("Hello World")

var movieQueryURL = "https://itunes.apple.com/search?&term=star+wars&limit=5"

$.ajax({
    url: movieQueryURL,
    method: "GET"
})
    .then(function (response) {
        var array = JSON.parse(response)
        console.log(array)
        for (let i = 0; i < 5; i++) {
            console.log("loop is working")
            var artist = array.results[i].artistName;
            console.log("The artist is: " + artist);
            var albumName = collectionCensoredName
            console.log("The" + i + "st album is called: " + albumName)
        }
    })