//////////////   RESPONSIVE NAVBAR   /////////////////
function toggleNavbar() {
  document.getElementById("navbar-responsive").classList.toggle("open");
}

document.getElementById("menu-btn").addEventListener("click", toggleNavbar);
//////////////   RESPONSIVE NAVBAR   /////////////////

/////////////////   BACKTOP   ///////////////
window.addEventListener("scroll", function () {
  toggleBacktop();
});

let backtop = document.getElementById("backtop");

function toggleBacktop() {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 200
  ) {
    backtop.style.bottom = "20px";
  } else {
    backtop.style.bottom = "-50px";
  }
}
/////////////////   BACKTOP   ///////////////

/////////////////       LOADING       ///////////////////
const loading = document.querySelector(".loading");
const loadingCards = document.querySelector(".loading-cards");
let arr = Array(10).fill("");
let fragment = document.createDocumentFragment();
arr.forEach((el, i) => {
  let div = document.createElement("div");
  div.classList.add("loading-card");
  div.innerHTML = `
  <div class="loading-card">
    <div class="div1"></div>
    <div class="div2"></div>
    <div class="div3"></div>
    <div class="divs">
      <div class="div4"></div>
      <div class="div5"></div>
    </div>
  </div>
  `;
  fragment.appendChild(div);
});
loadingCards.append(fragment);
/////////////////       LOADING       ///////////////////

////////////        LOADING AND API        /////////////
const card = document.querySelector(".cards");
const url = "https://fakestoreapi.com/products";

async function fetchData(api) {
  let data = await fetch(api);
  data
    .json()
    .then((res) => {
      createCard(res);
      CreateCategory(res);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      loading.style.display = "none";
    });
}

fetchData(url);
////////////        LOADING AND API        /////////////

////////////////        CREATE CARD        //////////////////
function createCard(data) {
  while (card.firstChild) {
    card.firstChild.remove();
  }
  let fragment = document.createDocumentFragment();
  data.forEach((post) => {
    const card = document.createElement("div");
    card.classList.add(".card");
    card.innerHTML = `
    <div class="card" data-id=${post.id}>
<img
name='product-image'

  class="card-img"
  src="${post.image}"
  style="width: 244px; height: 300px"
  alt="Rectanalage"
/>
<button class="card-btn1">НОВИНКА</button>
<img class="card-logo1" src="./images/paypal.png" alt="compare" />
<img class="card-logo2" name='product-heart' src="./images/heart.png" alt="heart" />
<p class="card-text">${post.title}</p>
<div class="card-images">
  <img src="./images/star.png" alt="star" />
  <img src="./images/otziv.png" alt="otziv" />
</div>
<p class="card-price">${post.price}сум</p>
<button class="card-price-12">2 400 сум x 12 мес</button>
<div class="card-btns">
  <button class="card-btn2">Предзаказ</button>
  <button class="card-btn3">
    <img src="./images/shop.png" alt="shop" />
  </button>
</div>
</div>
   `;
    fragment.appendChild(card);
  });
  card.appendChild(fragment);
}
////////////////        CREATE CARD        ////////////////

////////////////           SINGLE ROUTE              ////////////////////
const singleRoute = (id) => {
  window.open(`/pages/product.html?id=${id}`, "_self");
};

const setWishes = async (id) => {
  let data = await fetch(`${url}/${id}`);
  data
    .json()
    .then((res) => {
      let wishes = JSON.parse(localStorage.getItem("wishes")) || [];
      let index = wishes.findIndex((el) => el.id === +id);
      if (index < 0) {
        localStorage.setItem("wishes", JSON.stringify([...wishes, res]));
      }
    })
    .catch((err) => console.log(err));
};

card.addEventListener("click", (e) => {
  let { name } = e.target;
  if (name === "product-image") {
    let id = e.target.closest("[data-id]").dataset.id;
    singleRoute(id);
  } else if (name === "product-heart") {
    let id = e.target.closest("[data-id]").dataset.id;
    setWishes(id);
  }
});
////////////////           SINGLE ROUTE              ////////////////////

////////////////           CATEGORY            ////////////////////

const category = document.querySelector(".category");

function CreateCategory(data) {
  let categories = Array.from(new Set(data.map((el) => el.category)));
  categories.forEach((el) => {
    let option = document.createElement("option");
    option.innerHTML = el;
    option.setAttribute("value", el);
    category.appendChild(option);
  });
}

category.addEventListener("change", async (el1) => {
  loading.style.display = "flex";
  let value = el1.target.value;

  let categoryurl = value === "all" ? "" : `/category/${value}`;

  let data = await fetch(`${url}${categoryurl}`);
  data
    .json()
    .then((res) => {
      createCard(res);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      loading.style.display = "none";
    });
});
////////////////           CATEGORY            ////////////////////
