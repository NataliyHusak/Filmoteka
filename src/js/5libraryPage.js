
const findUl = document.querySelector('[data-page="library"]');
findUl.addEventListener('click',activeDetailsPage);

const createLibraryCardFunc = (imgPath, filmTitle, movieId, voteAverage) => {
  const li = document.createElement('li');
  li.classList.add('films-item');
  li.id = movieId;

  const img = document.createElement('img');
  img.classList.add('films-item__image');
  img.src = imgPath;

  const parag = document.createElement('p');
  parag.classList.add('films-item__describe');

  const span = document.createElement('span');
  span.classList.add('films-item__name');
  span.textContent = filmTitle;
  parag.append(span);

  const mark = document.createElement('span');
  mark.classList.add('films-item__mark');
  console.log(voteAverage);
  mark.textContent = voteAverage;

  li.append(img, mark, parag);
  return li;
};

const drawQueueFilmList = () => {
  const fragment = document.createDocumentFragment();
  
  const keyFilm = localStorage.getItem('filmsQueue'); 
  findUl.innerHTML = '';

  if (keyFilm) {
    JSON.parse(keyFilm).forEach(el => {
      const li = createLibraryCardFunc(`https://image.tmdb.org/t/p/w400/${el.backdrop_path}`, el.title, el.id, el.vote_average);    
      fragment.appendChild(li);
    });

    findUl.classList.remove('display-section');
    findUl.append(fragment);

  } else {
    const createSpan = document.createElement('span');
    createSpan.textContent =
      'You do not have to queue movies to watch. Add them.';
      // refs.formWrap.classList.add('display-section');
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

const drawWatchedFilmList = () => {

  const fragment = document.createDocumentFragment();
  const keyFilm = localStorage.getItem('filmsWatched'); 
  findUl.innerHTML = '';
  if (keyFilm) {
    JSON.parse(keyFilm).forEach(el => {
      const li = createLibraryCardFunc(`https://image.tmdb.org/t/p/w400/${el.backdrop_path}`, el.title, el.id, el.vote_average);    
      fragment.appendChild(li);

    });
    //document.querySelector('.movies-wrap').classList.remove('display-section');
    findUl.append(fragment);
  } else {
    const createSpan = document.createElement('span');
    createSpan.textContent =
      'You do not have to queue movies to watch. Add them.';
      // refs.formWrap.classList.add('display-section');
      // refs.thumbs.classList.add('display-section');
      // refs.movieWrap.classList.remove('display-section')
   // list.innerHTML = '';
    list.append(createSpan);
  }
  refs.queueBtn.classList.remove('header-search__item--active');
  refs.favoriteBtn.classList.add('header-search__item--active');
  // refs.queueBtn.addEventListener('click', drawQueueFilmList);

  refs.favoriteBtn.removeEventListener('click', drawWatchedFilmList);
  refs.queueBtn.addEventListener('click', drawQueueFilmList); 

};
