const products = [
  {
    id: 1,
    name: "Gaine de câble spiralée",
    desc: "Protection spiralée pour câbles de trottinette",
    price: 0,
    cat: "accessoires",
    img: "protection-cable.jpg"
  },
  {
    id: 2,
    name: "Support téléphone aluminium",
    desc: "Support téléphone réglable et anti-vibration",
    price: 0,
    cat: "accessoires",
    img: "support-telephone.jpg"
  },
  {
    id: 3,
    name: "Embout de valve coloré",
    desc: "Embout de valve en aluminium disponible en plusieurs couleurs",
    price: 0,
    cat: "accessoires",
    img: "bouchon-valve.jpg"
  }
];

let cart = JSON.parse(localStorage.getItem("volty-cart") || "[]");

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
    <div class="product-card">
      ${p.img ? `<img src="${p.img}" alt="${p.name}">` : ""}
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

  const box = document.querySelector("#cartItems");
  if (!box) return;

  if (!cart.length) {
    box.innerHTML = "<p>Ton panier est vide.</p>";
    return;
  }

  let total = 0;

  box.innerHTML = cart.map(x => {
    const p = products.find(p => p.id === x.id);
    if (!p) return "";

    total += p.price * x.qty;

    return `
      <div class="cart-line">
        <span>${p.name}</span>
        <span>${p.price.toFixed(2)} €</span>
        <button onclick="change(${p.id}, -1)">−</button>
        <span>${x.qty}</span>
        <button onclick="change(${p.id}, 1)">+</button>
      </div>
    `;
  }).join("");

  const subtotal = document.querySelector("#subtotal");
  if (subtotal) {
    subtotal.textContent = total.toFixed(2) + " €";
  }
}

function openCart() {
  document.querySelector("#cart")?.classList.add("open");
  document.querySelector("#overlay")?.classList.add("show");
}

function closeCart() {
  document.querySelector("#cart")?.classList.remove("open");
  document.querySelector("#overlay")?.classList.remove("show");
}

function openProduct(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;

  const modal = document.querySelector("#productModal");
  if (!modal) return;

  modal.querySelector("#modalTitle").textContent = p.name;
  modal.querySelector("#modalDesc").textContent = p.desc;
  modal.querySelector("#modalPrice").textContent =
    p.price.toFixed(2) + " €";

  modal.classList.add("show");
}

function closeProduct() {
  document.querySelector("#productModal")?.classList.remove("show");
}

document.querySelector("#cartBtn")?.addEventListener("click", openCart);
document.querySelector("#closeCart")?.addEventListener("click", closeCart);
document.querySelector("#overlay")?.addEventListener("click", closeCart);

document.querySelector("#modalClose")?.addEventListener("click", closeProduct);

document.querySelector("#checkout")?.addEventListener("click", () => {
  if (!cart.length) {
    alert("Ton panier est vide.");
    return;
  }

  alert("Étape suivante : paiement.");
});

renderProducts();
renderCart();
