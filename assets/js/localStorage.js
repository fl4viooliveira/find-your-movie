var carouselItems = document.getElementById('carousel-items');

function readSearchedMovies() {

    var moviesContent = '';

    //iterates localStorage

    for (var i = 0; i < localStorage.length; i++) {

        var carouselActive;
        if (i === 0) {
            carouselActive = " active";
        }
        else {
            carouselActive = "";
        }

        //sets iteration key name
        var key = localStorage.key(i);

        //uses key name to retrieve the corresponding value
        var value = localStorage.getItem(key);

        console.log(key + " " + value);

        moviesContent += `<div class="carousel-item` + carouselActive + `">
        <img src="`+ value + `" class="d-block mx-auto" alt="` + key + `">
        <div class="carousel-caption">
        <button type="button" class="btn btn-info p-0">`+ key + `</button>
        </div>
        </div>`;
    }
    carouselItems.innerHTML = moviesContent;
}

readSearchedMovies();

