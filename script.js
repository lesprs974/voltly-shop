const products = [
  {
    id: 1,
    name: "Support téléphone",
    desc: "Support téléphone pour voiture",
    price: 10.99,
    cat: "accessoires"
  },
  {
    id: 2,
    name: "Câble USB",
    desc: "Câble USB de qualité",
    price: 5.99,
    cat: "accessoires"
  },
  {
    id: 3,
    name: "Protection câble FLEX",
    desc: "Gaine souple pour protéger les câbles",
    price: 4.59,
    cat: "accessoires"
  }
];

let cart = JSON.parse(localStorage.getItem("volty-cart")) || [];

function save() {
  localStorage.setItem("volty-cart", JSON.stringify(cart));
  renderCart();
}

function addToCart(id) {
  const x = cart.find(i => i.id === id);

  if (x) {
    x.qty++;
  } else {
    cart.push({ id: id, qty: 1 });
  }

  save();
  openCart();
}

function change(id, d) {
  const x = cart.find(i => i.id === id);

  if (!x) return;

  x.qty += d;

  if (x.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

  save();
}

function renderProducts() {
  const box = document.querySelector("#products");
  if (!box) return;

  box.innerHTML = products.map(p => `
    <div class="product">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <strong>${p.price.toFixed(2)} €</strong>
      <button onclick="addToCart(${p.id})">
        Ajouter au panier
      </button>
    </div>
  `).join("");
}

function renderCart() {
  const count = document.querySelector("#cartCount");
  if (count) {
    count.textContent = cart.reduce((a, x) => a + x.qty, 0);
  }
}

function openCart() {
  const cartBox = document.querySelector("#cart");
  const overlay = document.querySelector("#overlay");

  if (cartBox) cartBox.classList.add("open");
  if (overlay) overlay.classList.add("show");
}

function closeCart() {
  const cartBox = document.querySelector("#cart");
  const overlay = document.querySelector("#overlay");

  if (cartBox) cartBox.classList.remove("open");
  if (overlay) overlay.classList.remove("show");
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
});
