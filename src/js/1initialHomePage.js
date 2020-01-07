'use strict'

let renderFilms, genres, pageNumber;

pageNumber = 1;

const list = document.querySelector('[data-page="home"]');
list.addEventListener('click',activeDetailsPage);

function createCardFunc( imgPath, filmTitle, movieId){

    const li = document.createElement('li');
    li.classList.add("films-item");
    li.id = movieId;

    const img = document.createElement('img');
    img.classList.add("films-item__image");
    const regEx = /null/g; 
    
    
    if(regEx.test(imgPath)){
        
        img.src = './images/Zaglushka.jpg'
    } else{
        img.src = imgPath;
    }
   

    const parag = document.createElement('p');
    parag.classList.add("films-item__describe");

    const span = document.createElement('span');
    span.classList.add("films-item__name");
    span.textContent = filmTitle;
    parag.append(span);
    li.append(img,parag);   

    
   return li;
}

function fetchPopularMoviesList(){
    const fragment = document.createDocumentFragment();

    fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9e008f5d338cd1f22f432e50e537417d&language=en-US&page=${pageNumber}&include_adult=false`)
        .then(response => response.json())
        .then(data => {
                renderFilms = [...data.results];
                list.innerHTML = '';
                data.results.map(el => {
                    const moviePath = `https://image.tmdb.org/t/p/w400/${el.backdrop_path}`;
                    const movieTitle = `${el.title} (${el.release_date.slice(0, 4)})`;
                    const movieId = el.id;
                    
                   fragment.appendChild(createCardFunc(moviePath, movieTitle, movieId));

                });
                
                list.innerHTML = '';
                list.appendChild(fragment);
            })
        .catch(err => {
            console.log(err);
        })
       }

       function fetchGenres(){   
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=9e008f5d338cd1f22f432e50e537417d`)
            .then(response => response.json())
            .then(data => {
                genres = data.genres;
             
                })
            .catch(err => {
                console.log(err);
            })
           }


       fetchPopularMoviesList();
       fetchGenres();

