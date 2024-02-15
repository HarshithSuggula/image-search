const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const more = document.getElementById("more");
const accesKey = "a7A3o_1gmpFBbcB6LwWtIr-32L0G7TQ4TvbYe_Gx-Nw";

let keyword = "";

let page = 1;
let per_page = 12;

async function searchImages() {
  keyword = searchBox.value.trim();
  searchBox.value = keyword;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesKey}&per_page=${per_page}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;
  if (page == 1) {
    searchResult.innerHTML = "";
  }

  results.map((result) => {
    const image = document.createElement("img");
    image.src = result.urls.small;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.appendChild(image);
    searchResult.appendChild(imageLink);
  });
  console.log(keyword);

   if (keyword.length > 0 && ((results.length > 0)||(page>1))) {
    oops.style.display = "none";
    more.style.display = "block";
  } else {
    oops.style.display = "block";
    more.style.display = "none";
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

more.addEventListener("click", () => {
  page++;
  searchImages();
});
