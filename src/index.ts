import { sortGenres, genres, hearts, deleteBtns } from "./elements";

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

sortGenres.forEach(genre => genre.addEventListener('click', handleClickGenre));
hearts.forEach(heart => heart.addEventListener('click', handleClickHeart));
deleteBtns.forEach(deleteBtn => deleteBtn.addEventListener('click', handleClickDeleteBtn));