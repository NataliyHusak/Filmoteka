const refs = {
  home_library: Array.from(document.querySelectorAll('.navbar__item')),
  addToWatched: document.querySelector('.detail__buttons--favorite'),
  addToQueue: document.querySelector('.detail__buttons--queue'),
  main: document.querySelector('.main'),
  detailsPageNone: document.querySelector('.detail'),
  filmLibraryPageNone: document.querySelector('.header-search__library'),
  thumbsNextBtn: document.querySelector('.thumbs__next-btn'),
  favoriteBtn: Array.from(document.querySelectorAll('.header-search__item'))[0],
  queueBtn: Array.from(document.querySelectorAll('.header-search__item'))[1],
  filmItem: document.querySelector('.films-item'),
  logo: document.querySelector('.logo'),
  navbarHome: document.querySelector('#home'),
  navbarLibrary: document.querySelector('#library'),
  formWrap: document.querySelector('.form-wrap'),
  thumbs: document.querySelector('.thumbs'),
  movieWrap: document.querySelector('.movies-wrap'),
};

let selectFilm;

const activeHomePage = () => {
  refs.movieWrap.classList.remove('display-section');
  refs.detailsPageNone.classList.add('display-section');
  refs.filmLibraryPageNone.classList.add('display-section');
  thumbs.addEventListener('click', plaginationNavigation);
  refs.navbarHome.classList.add('navbar__item--active');
  refs.navbarLibrary.classList.remove('navbar__item--active')

  refs.formWrap.classList.remove('display-section');
  refs.thumbs.classList.remove('display-section');
  
  refs.thumbs.classList.remove('display-section');
  fetchPopularMoviesList();
};

const activeLibraryPage = () => {
  refs.detailsPageNone.classList.add('display-section');
  refs.movieWrap.classList.add('display-section');
  refs.filmLibraryPageNone.classList.remove('display-section');

  refs.navbarHome.classList.remove('navbar__item--active');
  refs.navbarLibrary.classList.add('navbar__item--active');
  drawQueueFilmList();

  refs.queueBtn.classList.add('header-search__item--active');
  refs.favoriteBtn.addEventListener('click', drawWatchedFilmList);
  

};

function activeDetailsPage(e) {
  const movieId = e.target.closest('li').id;
  
  const itsLibraryFilm = e.currentTarget.dataset.page !== 'home';
  
  refs.movieWrap.classList.add('display-section');
  refs.filmLibraryPageNone.classList.add('display-section');
  refs.detailsPageNone.classList.remove('display-section');
  
  if(itsLibraryFilm){
    
    

    selectFilm = 
    JSON.parse(localStorage.getItem('filmsQueue')).find(obj => obj.id === Number(movieId)) ||
    JSON.parse(localStorage.getItem('filmsWatched')).find(obj => obj.id === Number(movieId))
    
    //console.log(selectFilm);
  } else {
    selectFilm = renderFilms.find(film => film.id === Number(movieId));
    
  }
  showDetails(selectFilm);
};

refs.addToQueue.addEventListener('click', toggleToQueue);
  refs.addToWatched.addEventListener('click', toggleToWatched);

//document.querySelector('main').addEventListener('click', activeDetailsPage);
// activeDetailsPage()
activeHomePage();


refs.home_library[0].addEventListener('click', activeHomePage);
refs.home_library[1].addEventListener('click', activeLibraryPage);
refs.logo.addEventListener('click', activeHomePage);
