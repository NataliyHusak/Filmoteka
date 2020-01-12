'use strict';

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var renderFilms, genres, pageNumber;
pageNumber = 1;
var list = document.querySelector('[data-page="home"]');
list.addEventListener('click', activeDetailsPage);

function createCardFunc(imgPath, filmTitle, movieId) {
  var li = document.createElement('li');
  li.classList.add("films-item");
  li.id = movieId;
  var img = document.createElement('img');
  img.classList.add("films-item__image");
  var regEx = /null/g;

  if (regEx.test(imgPath)) {
    img.src = './images/Zaglushka.jpg';
  } else {
    img.src = imgPath;
  }

  var parag = document.createElement('p');
  parag.classList.add("films-item__describe");
  var span = document.createElement('span');
  span.classList.add("films-item__name");
  span.textContent = filmTitle;
  parag.append(span);
  li.append(img, parag);
  return li;
}

function fetchPopularMoviesList() {
  var fragment = document.createDocumentFragment();
  fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9e008f5d338cd1f22f432e50e537417d&language=en-US&page=".concat(pageNumber, "&include_adult=false")).then(function (response) {
    return response.json();
  }).then(function (data) {
    renderFilms = _toConsumableArray(data.results);
    list.innerHTML = '';
    data.results.map(function (el) {
      var moviePath = "https://image.tmdb.org/t/p/w400/".concat(el.backdrop_path);
      var movieTitle = "".concat(el.title, " (").concat(el.release_date.slice(0, 4), ")");
      var movieId = el.id;
      fragment.appendChild(createCardFunc(moviePath, movieTitle, movieId));
    });
    list.innerHTML = '';
    list.appendChild(fragment);
  })["catch"](function (err) {
    console.log(err);
  });
}

function fetchGenres() {
  fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=9e008f5d338cd1f22f432e50e537417d").then(function (response) {
    return response.json();
  }).then(function (data) {
    genres = data.genres;
  })["catch"](function (err) {
    console.log(err);
  });
}

fetchPopularMoviesList();
fetchGenres();
"use strict";

var inputValue = document.querySelector('.search-form__input').value;
var searchForm = document.querySelector('.search-form');
var input = document.querySelector('.search-form__input');
var btnPrev = document.querySelector('.thumbs__prev-btn');
var btnNext = document.querySelector('.thumbs__next-btn');
var paginationTxt = document.querySelector('.thumbs__txt');
var thumbs = document.querySelector('.thumbs');
var topBtn = document.querySelector('.top-btn');
paginationTxt.innerText = pageNumber;

if (pageNumber === 1) {
  btnPrev.classList.add('disable');
}

function fetchFilms() {
  fetch("https://api.themoviedb.org/3/search/movie?api_key=9e008f5d338cd1f22f432e50e537417d&language=en-US&query=".concat(inputValue, "&page=").concat(pageNumber, "&include_adult=false")).then(function (response) {
    return response.json();
  }).then(function (data) {
    if (!data.results.length) {
      var warning = document.createElement('p');
      warning.classList.add('warning');
      warning.textContent = 'Enter correct query!!!';
      document.querySelector('.movies-wrap').insertBefore(warning, list);
      setTimeout(function () {
        warning.remove();
      }, 2000);
    } else {
      list.innerHTML = '';
      data.results.map(function (el) {
        var moviePath = "https://image.tmdb.org/t/p/w400/".concat(el.backdrop_path);
        var movieTitle = "".concat(el.title, " (").concat(el.release_date.slice(0, 4), ")");
        var movieId = el.id;
        list.appendChild(createCardFunc(moviePath, movieTitle, movieId));
      });
    }
  })["catch"](function (err) {
    console.log(err);
  });
}

function searchFilms(e) {
  e.preventDefault();
  inputValue = input.value;
  pageNumber = 1;
  paginationTxt.innerText = pageNumber;
  btnPrev.classList.remove('active');
  btnPrev.classList.add('disable');
  fetchFilms();
  e.target.reset();
}

function plaginationNavigation(e) {
  if (e.target.classList.contains('thumbs__prev-btn')) {
    if (pageNumber > 1) {
      paginationTxt.innerText--;
      pageNumber--;

      if (inputValue) {
        fetchFilms();
      } else fetchPopularMoviesList();

      if (pageNumber === 1) {
        btnPrev.classList.remove('active');
        btnPrev.classList.add('disable');
      }
    }
  }

  if (e.target.classList.contains('thumbs__next-btn')) {
    btnPrev.classList.add('active');
    paginationTxt.innerText++;
    pageNumber++;
    if (inputValue) fetchFilms();else fetchPopularMoviesList();
  }
}

function scrollToTop() {
  var scrollStep = -window.scrollY / (300 / 15),
      scrollInterval = setInterval(function () {
    if (window.scrollY != 0) {
      window.scrollBy(0, scrollStep);
    } else clearInterval(scrollInterval);
  }, 15);
}

function fillScrollBar() {
  document.querySelector('.progress-container').classList.remove('disable');
  if (!document.documentElement.scrollTop) document.querySelector('.progress-container').classList.add('disable');
  var windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = windowScroll / height * 100;
  document.querySelector('.progress-bar').style.width = scrolled + '%';
}

searchForm.addEventListener('submit', searchFilms);
topBtn.addEventListener('click', scrollToTop);
window.addEventListener('scroll', function (e) {
  if (document.documentElement.scrollTop > searchForm.offsetTop) {
    topBtn.classList.remove('disable');
  }

  if (document.documentElement.scrollTop < searchForm.offsetTop) {
    topBtn.classList.add('disable');
  }
});
window.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    window.scroll(0, -document.documentElement.clientHeight);
    window.addEventListener('scroll', fillScrollBar);
    document.documentElement.classList.remove('preloaderHeight');
    document.querySelector('.preloader').remove();
  }, 4000);
});

window.onload = function () {
  window.removeEventListener('scroll', fillScrollBar);
};
"use strict";

var refs = {
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
  movieWrap: document.querySelector('.movies-wrap')
};
var selectFilm;

var activeHomePage = function activeHomePage() {
  refs.movieWrap.classList.remove('display-section');
  refs.detailsPageNone.classList.add('display-section');
  refs.filmLibraryPageNone.classList.add('display-section');
  thumbs.addEventListener('click', plaginationNavigation);
  refs.navbarHome.classList.add('navbar__item--active');
  refs.navbarLibrary.classList.remove('navbar__item--active');
  refs.formWrap.classList.remove('display-section');
  refs.thumbs.classList.remove('display-section');
  refs.thumbs.classList.remove('display-section');
  fetchPopularMoviesList();
};

var activeLibraryPage = function activeLibraryPage() {
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
  var movieId = e.target.closest('li').id;
  var itsLibraryFilm = e.currentTarget.dataset.page !== 'home';
  refs.movieWrap.classList.add('display-section');
  refs.filmLibraryPageNone.classList.add('display-section');
  refs.detailsPageNone.classList.remove('display-section');

  if (itsLibraryFilm) {
    selectFilm = JSON.parse(localStorage.getItem('filmsQueue')).find(function (obj) {
      return obj.id === Number(movieId);
    }) || JSON.parse(localStorage.getItem('filmsWatched')).find(function (obj) {
      return obj.id === Number(movieId);
    }); //console.log(selectFilm);
  } else {
    selectFilm = renderFilms.find(function (film) {
      return film.id === Number(movieId);
    });
  }

  showDetails(selectFilm);
}

;
refs.addToQueue.addEventListener('click', toggleToQueue);
refs.addToWatched.addEventListener('click', toggleToWatched); //document.querySelector('main').addEventListener('click', activeDetailsPage);
// activeDetailsPage()

activeHomePage();
refs.home_library[0].addEventListener('click', activeHomePage);
refs.home_library[1].addEventListener('click', activeLibraryPage);
refs.logo.addEventListener('click', activeHomePage);
"use strict";

var addToWatchedBtn = document.querySelector('.detail__buttons--favorite');
var addToQueueBtn = document.querySelector('.detail__buttons--queue');
var addDeleteFromWatched = document.querySelector('.videoBtn');
var addDeleteFromQueue = document.querySelector('.calendarBtn');
var imgOfFilm = document.querySelector('.detail__img--item');
var titleOfFilm = document.querySelector('.detail__description--title');
var voteOfFilm = document.querySelector('.detail__votes--value');
var popularityOfFilm = document.querySelector('.detail__popularity--value');
var originalNameOfFilm = document.querySelector('.detail__name--value');
var genreOfFilm = document.querySelector('.detail__genre--value');
var aboutFilm = document.querySelector('.detail__description--text');
var filmsQueueStorage = localStorage.getItem('filmsQueue');
var filmsWatchedStorage = localStorage.getItem('filmsWatched'); // localStorage.setItem('filmsQueue', '[]');
// localStorage.setItem('filmsWatched', '[]');

function monitorButtonStatusText() {
  if (filmsQueueStorage) {
    if (JSON.parse(filmsQueueStorage).find(function (obj) {
      return obj.id === Number(selectFilm.id);
    })) {
      console.log('yes');
      addToQueueBtn.textContent = 'Delete from queue';
      addDeleteFromQueue.src = '/images/removeFromQueue.jpg';
      var arr = JSON.parse(filmsQueueStorage).filter(function (el) {
        return el.id !== selectFilm.id;
      });
    }
  } else {
    console.log('no');
    addToQueueBtn.textContent = 'Add to queue';
    addDeleteFromQueue.src = '/images/detailsCalendar.png';
  }

  if (filmsWatchedStorage) {
    if (JSON.parse(filmsWatchedStorage).find(function (obj) {
      return obj.id === Number(selectFilm.id);
    })) {
      addToWatchedBtn.textContent = 'Delete from watched';
      addDeleteFromWatched.src = '/images/addDeleteFromWatched.jpg';
    }
  } else {
    addToWatchedBtn.textContent = 'Add to watched';
    addDeleteFromWatched.src = '/images/detailsVideo.png';
  }
}

var arrayOfQueue = [];

function toggleToQueue() {
  var dublicateMovie = arrayOfQueue.find(function (el) {
    return el.id === selectFilm.id;
  });

  if (!dublicateMovie) {
    arrayOfQueue.push(selectFilm);
  }

  localStorage.setItem('filmsQueue', JSON.stringify(arrayOfQueue));
  monitorButtonStatusText();
}

var arrayOfWatched = [];

function toggleToWatched() {
  var dublicateMovie = arrayOfWatched.find(function (el) {
    return el.id === selectFilm.id;
  });

  if (!dublicateMovie) {
    arrayOfWatched.push(selectFilm);
  }

  localStorage.setItem('filmsWatched', JSON.stringify(arrayOfWatched));
  monitorButtonStatusText();
}

function showDetails(selectFilm) {
  imgOfFilm.src = "https://image.tmdb.org/t/p/w500".concat(selectFilm.poster_path);
  titleOfFilm.textContent = "".concat(selectFilm.original_title, " (").concat(selectFilm.release_date.slice(0, 4), ")");
  voteOfFilm.textContent = "".concat(selectFilm.vote_average, " / ").concat(selectFilm.vote_count);
  popularityOfFilm.textContent = selectFilm.popularity.toFixed(1);
  originalNameOfFilm.textContent = selectFilm.original_title;
  aboutFilm.textContent = selectFilm.overview;
  var idOfGenres = selectFilm.genre_ids;
  var arrayOfGenres = [];

  var _loop = function _loop(i) {
    var id = idOfGenres[i];
    var result = genres.find(function (obj) {
      return obj.id === id;
    });
    arrayOfGenres.push(result);
  };

  for (var i = 0; i < idOfGenres.length; i++) {
    _loop(i);
  }

  var arrOfGenres = arrayOfGenres.map(function (obj) {
    return obj.name;
  });
  genreOfFilm.textContent = arrOfGenres.join(', ').toLowerCase();
  monitorButtonStatusText();
}
"use strict";

var findUl = document.querySelector('[data-page="library"]');
findUl.addEventListener('click', activeDetailsPage);

var createLibraryCardFunc = function createLibraryCardFunc(imgPath, filmTitle, movieId, voteAverage) {
  var li = document.createElement('li');
  li.classList.add('films-item');
  li.id = movieId;
  var img = document.createElement('img');
  img.classList.add('films-item__image');
  img.src = imgPath;
  var parag = document.createElement('p');
  parag.classList.add('films-item__describe');
  var span = document.createElement('span');
  span.classList.add('films-item__name');
  span.textContent = filmTitle;
  parag.append(span);
  var mark = document.createElement('span');
  mark.classList.add('films-item__mark');
  console.log(voteAverage);
  mark.textContent = voteAverage;
  li.append(img, mark, parag);
  return li;
};

var drawQueueFilmList = function drawQueueFilmList() {
  var fragment = document.createDocumentFragment();
  var keyFilm = localStorage.getItem('filmsQueue');
  findUl.innerHTML = '';

  if (keyFilm) {
    JSON.parse(keyFilm).forEach(function (el) {
      var li = createLibraryCardFunc("https://image.tmdb.org/t/p/w400/".concat(el.backdrop_path), el.title, el.id, el.vote_average);
      fragment.appendChild(li);
    });
    findUl.classList.remove('display-section');
    findUl.append(fragment);
  } else {
    var createSpan = document.createElement('span');
    createSpan.textContent = 'You do not have to queue movies to watch. Add them.'; // refs.formWrap.classList.add('display-section');
    //refs.thumbs.classList.add('display-section');
    // refs.movieWrap.classList.remove('display-section')
    // list.innerHTML = '';

    list.append(createSpan);
  }

  refs.queueBtn.classList.add('header-search__item--active');
  refs.favoriteBtn.classList.remove('header-search__item--active');
  refs.favoriteBtn.addEventListener('click', drawWatchedFilmList);
  refs.queueBtn.removeEventListener('click', drawQueueFilmList);
};

var drawWatchedFilmList = function drawWatchedFilmList() {
  var fragment = document.createDocumentFragment();
  var keyFilm = localStorage.getItem('filmsWatched');
  findUl.innerHTML = '';

  if (keyFilm) {
    JSON.parse(keyFilm).forEach(function (el) {
      var li = createLibraryCardFunc("https://image.tmdb.org/t/p/w400/".concat(el.backdrop_path), el.title, el.id, el.vote_average);
      fragment.appendChild(li);
    }); //document.querySelector('.movies-wrap').classList.remove('display-section');

    findUl.append(fragment);
  } else {
    var createSpan = document.createElement('span');
    createSpan.textContent = 'You do not have to queue movies to watch. Add them.'; // refs.formWrap.classList.add('display-section');
    // refs.thumbs.classList.add('display-section');
    // refs.movieWrap.classList.remove('display-section')
    // list.innerHTML = '';

    list.append(createSpan);
  }

  refs.queueBtn.classList.remove('header-search__item--active');
  refs.favoriteBtn.classList.add('header-search__item--active'); // refs.queueBtn.addEventListener('click', drawQueueFilmList);

  refs.favoriteBtn.removeEventListener('click', drawWatchedFilmList);
  refs.queueBtn.addEventListener('click', drawQueueFilmList);
};