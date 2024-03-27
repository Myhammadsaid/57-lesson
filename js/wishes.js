function getwishes() {
  let wishes = JSON.parse(localStorage.getItem("wishes"));
  console.log(wishes);
}

getwishes();

const card = document.querySelector(".cards");
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
