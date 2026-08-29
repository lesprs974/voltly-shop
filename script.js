const products = [
  {id:1, name:"Support téléphone", desc:"Support téléphone pour voiture", price:10.99, cat:"accessoires"},
  {id:2, name:"Câble USB", desc:"Câble USB de qualité", price:5.99, cat:"accessoires"},
  {id:3, name:"Protection câble FLEX", desc:"Gaine souple pour protéger les câbles", price:4.59, cat:"accessoires"}

function save(){localStorage.setItem("voltly-cart",JSON.stringify(cart));renderCart()}
function addToCart(id){const x=cart.find(i=>i.id===id);x?x.qty++:cart.push({id,qty:1});save();openCart()}
function change(id,d){const x=cart.find(i=>i.id===id);if(!x)return;x.qty+=d;if(x.qty<=0)cart=cart.filter(i=>i.id!==id);save()}
function renderCart(){
document.querySelector("#cartCount").textContent=cart.reduce((a,x)=>a+x.qty,0);
const box=document.querySelector("#cartItems");if(!cart.length){box.innerHTML='<div class="empty">Ton panier est vide.<br>Ajoute ton premier accessoire ⚡</div>';document.querySelector("#subtotal").textContent=money(0);return}
let total=0;box.innerHTML=cart.map(x=>{const p=products.find(p=>p.id===x.id);total+=p.price*x.qty;return `<div class="cart-line"><img src="${p.img}" alt=""><div><h4>${p.name}</h4><p>${money(p.price)}</p></div><div class="qty"><button onclick="change(${p.id},-1)">−</button><b>${x.qty}</b><button onclick="change(${p.id},1)">+</button></div></div>`}).join("");
document.querySelector("#subtotal").textContent=money(total)}
function openCart(){document.querySelector("#cart").classList.add("open");document.querySelector("#overlay").classList.add("show")}
function closeCart(){document.querySelector("#cart").classList.remove("open");document.querySelector("#overlay").classList.remove("show")}
function openProduct(id){selected=products.find(p=>p.id===id);document.querySelector("#modalImg").src=selected.img;document.querySelector("#modalImg").alt=selected.name;document.querySelector("#modalBadge").textContent=selected.badge;document.querySelector("#modalName").textContent=selected.name;document.querySelector("#modalDesc").textContent=selected.desc;document.querySelector("#modalPrice").textContent=money(selected.price);document.querySelector("#productModal").classList.add("show")}
function closeProduct(){document.querySelector("#productModal").classList.remove("show")}
document.querySelector("#cartBtn").onclick=openCart;document.querySelector("#closeCart").onclick=closeCart;document.querySelector("#overlay").onclick=closeCart;
document.querySelector("#modalClose").onclick=closeProduct;document.querySelector("#modalAdd").onclick=()=>{if(selected)addToCart(selected.id);closeProduct()};
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderProducts(b.dataset.cat)});
document.querySelector("#checkout").onclick=()=>{if(!cart.length)return alert("Ton panier est vide.");alert("Étape suivante : connecter Stripe Checkout ou un autre prestataire de paiement. Ne vends pas avant cette connexion.");};
document.querySelector("#newsletter").onsubmit=e=>{e.preventDefault();alert("Inscription enregistrée dans cette démo. Pour envoyer réellement des emails, connecte un outil de newsletter conforme RGPD.");e.target.reset()};
renderProducts();renderCart();
