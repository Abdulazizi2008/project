const container = document.querySelector(".products-container");

async function fetchProducts() {
  container.insertAdjacentHTML("afterbegin", "<div class='spinner'></div>");

  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();

  return products;
}

function renderProducts(products) {
  const spinner = document.querySelector(".spinner");
  spinner.remove();

  products.forEach((product) => {
    const li = document.createElement("li");
    li.style.width = "300px";

    const img = document.createElement("img");
    img.src = product.image;
    li.append(img);

    const title = document.createElement("h3");
    title.textContent = product.title;
    li.append(title);

    const ratingContainer = document.createElement("div");
    ratingContainer.style.display = "flex";
    ratingContainer.style.gap = "6px";
    ratingContainer.style.alignItems = "center";

    const starsContainer = document.createElement("div");
    starsContainer.insertAdjacentHTML(
      "beforeend",
      "<span>⭐️</span>".repeat(Math.round(product.rating.rate))
    );
    starsContainer.style.width = "170px";
    starsContainer.style.marginTop = "auto";

    ratingContainer.append(starsContainer);

    const ratingCount = document.createElement("div");
    ratingCount.textContent = `(${product.rating.count})`;
    ratingContainer.append(ratingCount);

    li.append(ratingContainer);

    const price = document.createElement("strong");
    price.textContent = `$${product.price}`;
    li.append(price);
    const button = document.createElement("button");
    button.textContent = "Add to cart";
    li.append(button);

    container.append(li);
  });
}

// IIFE
(async function () {
  const products = await fetchProducts();
  renderProducts(products);
})();
const header = document.querySelector("header");
const menuBtn = document.querySelector(".menu");

menuBtn.addEventListener("click", () => {
  header.classList.toggle("open");
});
