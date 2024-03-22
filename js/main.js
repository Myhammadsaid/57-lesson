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

const card = document.querySelector(".cards");
const url = "https://fakestoreapi.com/products";
const loading = document.querySelector(".loading");

async function fetchData(api) {
  let data = await fetch(api);
  data
    .json()
    .then((res) => createCard(res))
    .catch((err) => console.log(err))
    .finally(() => {
      loading.style.display = "none";
    });
}

fetchData(url);

function createCard(data) {
  let fragment = document.createDocumentFragment();
  data.forEach((post) => {
    const card = document.createElement("div");
    card.classList.add(".card");
    card.innerHTML = `
    <div class="card">
              <img
                class="card-img"
                src="./images/Rectanalage.png"
                alt="Rectanalage"
              />
              <button class="card-btn1">НОВИНКА</button>
              <img class="card-logo1" src="./images/paypal.png" alt="compare" />
              <img class="card-logo2" src="./images/heart.png" alt="heart" />
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
