let elm = document.querySelector(".movieElm");
import {
  loginHidden,
  registerHidden,
  register,
  login,
  loginInputUsername,
  loginInputPassword,
  loginBtn,
  registerBtn,
  registerInputName,
  registerInputPassword,
  registerInputUsername,
  searchInput,
} from "./elements";

import {
  sortGenres,
  genres,
  hearts,
  deleteBtns,
  pageBtns,
  movies,
  movies2,
  movies3,
  movieBtn,
  tableElm,
} from "./elements";
let searchMode = false;
const dashboard = document.querySelector("#dashboard")!;
const nav = document.querySelector("#nav")!;
const logOut = document.querySelector("#logOut")!;
const errorMessage = document.querySelector(
  "#errorMessage"
) as HTMLParagraphElement;

login.addEventListener("click", () => {
  registerHidden.classList.add("hidden");
  loginHidden.classList.remove("hidden");
});

register.addEventListener("click", () => {
  loginHidden.classList.add("hidden");
  registerHidden.classList.remove("hidden");
});
logOut.addEventListener("click", () => {
  elm?.classList.add("hidden");
  dashboard.classList.add("hidden");
  registerHidden.classList.add("hidden");
  loginHidden.classList.remove("hidden");
  nav.classList.remove("hidden");
  loginInputPassword.value = "";
  loginInputUsername.value = "";
});

let truePassword = "root123";
let truUsername = "admin";

loginBtn.addEventListener("click", () => {
  const enterPassword = loginInputPassword.value;
  const enterUsername = loginInputUsername.value;

  if (truUsername == enterUsername && truePassword == enterPassword) {
    loginHidden.classList.add("hidden");
    registerHidden.classList.add("hidden");
    dashboard.classList.remove("hidden");
    nav.classList.add("hidden");
    errorMessage.classList.add("hidden");

    renderMovie();
  } else {
    errorMessage.textContent = "Username yoki parol noto'g'ri!";
    errorMessage.classList.remove("hidden");

    setTimeout(() => {
      errorMessage.classList.add("hidden");
    }, 3000);
  }
});

registerBtn.addEventListener("click", () => {
  alert("sizning malumotlaringiz saqlandi.");
});

function renderMovie() {
  elm?.classList.remove("hidden");
  let moviesPerPage = 4;
  let currentPage = 1;

  function updateMovies() {
    if (searchMode) return;

    const freshMovies3 = document.querySelectorAll(".movie3");
    let allMovies = [
      ...Array.from(movies),
      ...Array.from(movies2),
      ...Array.from(freshMovies3),
    ];

    allMovies.forEach((movie) => movie.classList.add("hidden"));

    let startIndex = (currentPage - 1) * moviesPerPage;
    let endIndex = startIndex + moviesPerPage;

    allMovies
      .slice(startIndex, endIndex)
      .forEach((movie) => movie.classList.remove("hidden"));
  }

  function handleClickGenre(e: MouseEvent) {
    let target = e.target as HTMLButtonElement;
    let text = target.innerText;
    console.log(text);
    filterGenres(text);
  }

  function filterGenres(text: string) {
    if (text === "All Genres") {
      genres.forEach((genre) => {
        genre.parentElement?.classList.remove("hidden");
      });
      updateMovies();
      return;
    }

    genres.forEach((genre) => {
      if (genre.innerText !== text) {
        genre.parentElement?.classList.add("hidden");
      } else {
        genre.parentElement?.classList.remove("hidden");
      }
    });
  }

  function handleClickHeart(e: MouseEvent) {
    let target = e.target as HTMLSpanElement;
    target.classList.toggle("!text-red-700");
  }

  function handleClickDeleteBtn(e: MouseEvent) {
    let target = e.target as HTMLButtonElement;
    target.parentElement?.parentElement?.remove();
    updateMovies();
  }

  function handleClickPageBtn(e: MouseEvent) {
    let target = e.target as HTMLButtonElement;
    currentPage = Number(target.dataset.page);
    updateMovies();
  }

  function handleClickMovieBtn() {
    document.body.classList.add("hidden");

    let div = document.createElement("div");
    div.classList.add("flex", "justify-center", "items-center", "h-screen");
    div.innerHTML = `<div class="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
  <h1 class="text-2xl font-bold mb-4">Movie Form</h1>
  <form>
      <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-1">Title</label>
          <input type="text" class="title w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>
      <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-1">Genre</label>
          <select class="selectGenre w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Action</option>
              <option>Comedy</option>
              <option>Thriller</option>
          </select>
      </div>
      <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-1">Number in Stock</label>
          <input type="number" class="stock w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>
      <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-1">Rate</label>
          <input type="number" class="rate w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>
      <button class="save bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save</button>
  </form>
</div>`;
    document.documentElement.append(div);

    let titleInput = div.querySelector(".title") as HTMLInputElement;
    let genreSelect = div.querySelector(".selectGenre") as HTMLSelectElement;
    let stockInput = div.querySelector(".stock") as HTMLInputElement;
    let rateInput = div.querySelector(".rate") as HTMLInputElement;
    let save = div.querySelector(".save") as HTMLButtonElement;

    save.addEventListener("click", (event) => {
      event.preventDefault();

      let title = titleInput.value;
      let genre = genreSelect.value;
      let stock = stockInput.value;
      let rate = rateInput.value;

      if (!title || !genre || !stock || !rate)
        return alert("Barcha maydonlarni toldiring!");

      let tr = document.createElement("tr");
      tr.classList.add("movie3");
      tr.innerHTML = `<td class="cursor-pointer p-3 text-blue-500">${title}</td>
                    <td class="p-3 genre">${genre}</td>
                    <td class="p-3">${stock}</td>
                    <td class="p-3">${rate}</td>
                    <td class="cursor-pointer p-3"><i class="fa-solid fa-heart heart text-gray-400"></i></td>
                    <td class="p-3"><button class="rounded bg-red-500 px-3 py-1 text-white delete">Delete</button></td>`;

      tableElm.appendChild(tr);
      Array.from(movies3).push(tr);
      updateMovies();

      tr.querySelector(".delete")!.addEventListener("click", function () {
        tr.remove();
        updateMovies();
      });

      document.body.classList.remove("hidden");
      document.documentElement.removeChild(div);
    });
  }

  searchInput.classList.add(
    "border",
    "rounded",
    "py-2",
    "px-3",
    "mb-4",
    "w-full"
  );

  tableElm.before(searchInput);

  function searchMovies() {
    searchMode = true;
    currentPage = 1;
    let query = searchInput.value.toLowerCase();
    const freshMovies3 = document.querySelectorAll(".movie3");
    let allMovies = [
      ...Array.from(movies),
      ...Array.from(movies2),
      ...Array.from(freshMovies3),
    ];

    allMovies.forEach((movie) => {
      let title = movie.querySelector("td")?.innerText.toLowerCase() || "";
      if (title.includes(query)) {
        movie.classList.remove("hidden");
      } else {
        movie.classList.add("hidden");
      }
    });

    if (!query) {
      searchMode = false;
      updateMovies();
    }
  }

  searchInput.addEventListener("input", searchMovies);
  movieBtn.addEventListener("click", handleClickMovieBtn);
  pageBtns.forEach((pageBtn) =>
    pageBtn.addEventListener("click", handleClickPageBtn)
  );
  sortGenres.forEach((genre) =>
    genre.addEventListener("click", handleClickGenre)
  );
  hearts.forEach((heart) => heart.addEventListener("click", handleClickHeart));
  deleteBtns.forEach((deleteBtn) =>
    deleteBtn.addEventListener("click", handleClickDeleteBtn)
  );
}
