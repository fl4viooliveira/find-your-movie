// CODE FOR CLICK LISTENER!!!!!!!
$("#search-button-new").on("click", function (event) {
    event.preventDefault();
    console.log("Hello World");

    // pull input from website
    var movie = $("#search-input").val();

    // Line below to test
    // var movie = "Harry Potter"

    // Keep below!!!
    var movieArr = movie.split(' ');
    // console.log(movieArr);
    var movieURLInput = movieArr.join('+');
    // console.log(movieURLInput);

    var movieQueryURL = "https://itunes.apple.com/search?&entity=album&term=" + movieURLInput + "&limit=5";

    $.ajax({
        url: movieQueryURL,
        method: "GET"
    })
        .then(function (response) {
            var array = JSON.parse(response)
            // console.log(array)
            for (let i = 0; i < 5; i++) {
                var thisArray = array.results[i];
                var card = $('<div>').addClass("card m-3 p-2 col-sm-2");
                console.log(thisArray);

                // Get the album cover
                var albumCover = thisArray.artworkUrl100;
                var albumIcon = $('<img>').attr("src", albumCover)
                // .css({ "height": 50, "width": 50 })
                console.log("The album cover source is :" + albumCover);

                // Get the Album name
                var albumName = thisArray.collectionCensoredName;
                console.log("This album is called: " + albumName);
                var albumTitle = $('<h5>').addClass("card-title").text(albumName);

                // Get artist information
                var artist = thisArray.artistName;
                console.log("The artist is: " + artist);
                var artistName = $('<p>').text("Artist: " + artist);

                // Get the number of tracks
                var trackNumber = thisArray.trackCount;
                console.log("There are " + trackNumber + " tracks in this album");
                var numOfTracks = $('<p>').text("Number of tracks: " + trackNumber);

                // Get the link to the album
                var albumURL = thisArray.collectionViewUrl;
                console.log("The link to this album is: " + albumURL);
                var linkToAlbum = $('<p>').text("Link to ITunes album: " + albumURL)

                console.log("_____________________________________________________________")
                $("#music-input").append(card.append(albumTitle, albumIcon, artistName, numOfTracks, linkToAlbum))
            }
        })
})