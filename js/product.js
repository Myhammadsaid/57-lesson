//////////////   RESPONSIVE NAVBAR   /////////////////
function toggleNavbar() {
  document.getElementById("navbar-responsive").classList.toggle("open");
}

document.getElementById("menu-btn").addEventListener("click", toggleNavbar);
//////////////   RESPONSIVE NAVBAR   /////////////////

const url = "https://fakestoreapi.com/products";
const error = document.querySelector(".error");
const loading = document.querySelector(".loading");

async function fetchData(api) {
  let query = new URLSearchParams(window.location.search);
  let id = query.get("id");
  let data = await fetch(`${api}/${id}`);
  data
    .json()
    .then((res) => {
      createSingleProduct(res);
    })
    .catch((err) => {
      error.style.display = "flex";
      console.log(err);
    })
    .finally(() => {
      loading.style.display = "none";
    });
}

fetchData(url);

const productWrapper = document.querySelector(".product-wrapper");
function createSingleProduct(data) {
  console.log(data);
  productWrapper.innerHTML = `
  <div class="product-card">
  <img
  name='product-image'
    class="card-img1"
    width='300px'
    src="${data.image}"
    alt="Rectanalage"
  />
  <button class="card-btn1">НОВИНКА</button>
        <div class="wrapper-box">
          <p class="wrapper-text">${data.title}</p>
          <img src="../images/wrapper-images.png" alt="">
          <p class="wrapper-price">${data.price} сум</p>
          <p class="wrapper-price2">13 700 сум x 12 мес</p>
          <div class="wrapper-paragraph">
            <p class="wrapper-text2">Модел:</p>
            <p class="wrapper-par">Атлас анатомии человека для стоматологов</p>
          </div>
          <div class="wrapper-paragraph">
            <p class="wrapper-text2">Наличии:</p>
            <p class="wrapper-par">Нет в наличии</p>
          </div>
          <div class="wrapper-btns">
            <button class="wrapper-btn1"><img src="../images/shop.png" alt="shop">Добавить в корзину</button>
            <button class="wrapper-btn2">Купиить сейчас</button>
          </div>
          <p class="wrapper-title">Проголосуйте</p>
          <button class="wrapper-btn3"><img src="../images/heart.png">Я рекомендую <span>0</span></button>
      </div>
      <div class="wrapper-box2">
        <p class="box-text">Расрочка платежа</p>
        <div class="box-btns">
          <button class="box-btn1">3 мес.</button>
          <button class="box-btn1">6 мес.</button>
          <button class="box-btn1">12 мес.</button>
        </div>
        <div class="wrapper-box-wrap">
          <p class="box-text2">Рассрочка от партнера UzumNasiya
          </p>
          <div class="uzum">
            <img src="../images/uzumnasiya.svg" alt="uzum">
            <p class="uzum-price">13 300сум</p>
          </div>
    <button class="uzum-btn">Заказать в Расрочка</button>
</div>
<div class="wrapper-box-wrap2">
  <p class="box-text2">Рассрочка от Asaxyi
  </p>
  <div class="asaxiy2">
    <img src="../images/asaxiy-logo.png" alt="uzum">
    <p class="uzum-price">13 300сум</p>
  </div>
</div>
</div>
</div>
    `;
}
