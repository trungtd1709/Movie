$(document).ready(function () {
    $('#formID').on('keyup', function (e) {
        e.preventDefault();
        var x = $('#searchText').val();
        console.log(x);
        findMovies(x);
    
    });
});

function findMovies(searchText) {
    axios.get("http://www.omdbapi.com/?apikey=c56dd119&s="+ searchText)
    .then((e)=>{
        var x = e.data.Search;
        console.log(x);
        let movies = "";
        $.each(x, function (index, value) { 
              movies += `<div class = "outputData"  > 
              <img src = "${value.Poster}">  
              <div class="ovelay">
              <h3  class = "title"> ${value.Title} </h3> 
              <p class = "year"> ${value.Year} </p>
              <a onclick="getID('${value.imdbID}')" class="btn btn-success">Chi tieet </a>
              </div>
              </div>
              
            
             `
        });
        $('#show').html(movies);
    }   
    );  
}

function getID(id){
    sessionStorage.setItem("movieID",id);
    window.location= 'moviePage.html';
    return false;
}


function getDetail() {
    var movieID= sessionStorage.getItem("movieID");
    console.log(movieID);
    let output = '';
    axios.get("http://www.omdbapi.com/?apikey=c56dd119&i=" + movieID)
    .then((e)=>{
        movie=e.data;
        console.log(movie);
        output = `
            <div class="col-md-4 photoDiv">
                <img class="photo" src="${movie.Poster}" alt="">
              </div>
              <div class="col-md-4 text text-center">
                <h1 style="padding-top: 60px;"> ${movie.Title}</h1>
                <h3> ${movie.Year}</h3>
              </div>
            `
        $('#show').html(output);
    }).catch((err)=>{
        console.log(err);
    })
    
    
}



