import { sortGenres, genres, hearts, deleteBtns, pageBtns, movies, movies2, movies3 } from "./elements";

function handleClickGenre(e: MouseEvent) {
  let target = e.target as HTMLButtonElement;

  let text = target.innerText;
  console.log(text)
  filterGenres(text);
}

function filterGenres(text: string) {
  if (text === 'All Genres') {
    genres.forEach(genre => {
      genre.parentElement?.classList.remove('hidden');
    })
    return;
  }

  genres.forEach(genre => {
    if (genre.innerText !== text) {
      genre.parentElement?.classList.add('hidden');
    } else {
      genre.parentElement?.classList.remove('hidden');
    }
  })
}

function handleClickHeart(e: MouseEvent) {
  let target = e.target as HTMLSpanElement;

  target.classList.toggle('!text-red-700');
}

function handleClickDeleteBtn(e: MouseEvent) {
  let target = e.target as HTMLButtonElement;

  target.parentElement?.parentElement?.remove();
}

function handleClickPageBtn(e: MouseEvent) {
  let target = e.target as HTMLButtonElement;
  let value = Number(target.dataset.page);

  movies.forEach(movie => movie.classList.remove('hidden'));
  movies2.forEach(movie2 => movie2.classList.remove('hidden'));
  movies3.forEach(movie3 => movie3.classList.remove('hidden'));

  if (value === 1) {
    movies2.forEach(movie2 => movie2.classList.add('hidden'));
    movies3.forEach(movie3 => movie3.classList.add('hidden'));
  } else if (value === 2) {
    movies.forEach(movie => movie.classList.add('hidden'));
    movies3.forEach(movie3 => movie3.classList.add('hidden'));
  } else if (value === 3) {
    movies.forEach(movie => movie.classList.add('hidden'));
    movies2.forEach(movie2 => movie2.classList.add('hidden'));
  }
}

pageBtns.forEach(pageBtn => pageBtn.addEventListener('click', handleClickPageBtn));
sortGenres.forEach(genre => genre.addEventListener('click', handleClickGenre));
hearts.forEach(heart => heart.addEventListener('click', handleClickHeart));
deleteBtns.forEach(deleteBtn => deleteBtn.addEventListener('click', handleClickDeleteBtn));