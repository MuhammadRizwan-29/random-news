/* DOM Elements here*/
const blogContainer = document.querySelector("#blog-container");
const searchField = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");

const apiKey = "4086fd12fdb941d2be787bfd642a9319";

/* Calling News Api Here*/

async function fetchRandomNews() {
  try {
    const apiURL = `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apikey=${apiKey}`;
    const response = await fetch(apiURL);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.log(`Error Fetching Random News: ${error}`);
    return [];
  }
}

/* Search Box*/
searchButton.addEventListener("click", async () => {
  const query = searchField.value.trim();
  if (query !== "") {
    try {
      const articles = await fechingNewsQuery(query);
      displayBlog(articles);
    } catch (error) {
      console.log("Error fetching news by query", error);
    }
  } else {
  }
});

async function fechingNewsQuery(query) {
  try {
    const apiURL = `https://newsapi.org/v2/everything?q=${query}&pageSize=12&apikey=${apiKey}`;
    const response = await fetch(apiURL);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.log(`Error Fetching Random News: ${error}`);
    return [];
  }
}

function displayBlog(articles) {
  blogContainer.innerHTML = "";
  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blogCard");
    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;
    const title = document.createElement("h2");
    const truncedTitle =
      article.title.length > 30
        ? article.title.slice(0, 30) + "...."
        : article.title;
    title.textContent = article.title;
    title.textContent = truncedTitle;
    const description = document.createElement("p");
    const truncedDes =
      article.description.length > 30
        ? article.description.slice(0, 30) + "...."
        : article.description;
    description.textContent = article.description;
    description.textContent = truncedDes;

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });

    blogContainer.appendChild(blogCard);
  });
}

(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlog(articles);
  } catch (error) {
    console.log(`Error Fetching Random News: ${error}`);
  }
})();
