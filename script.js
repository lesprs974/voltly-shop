const products=[
{id:1,name:"Support téléphone ALU",desc:"Support aluminium anti-vibration",price:24.90,cat:"pratique",img:"assets/phone-holder.png",badge:"BEST-SELLER"},
{id:2,name:"Bouchons de valve COLOR",desc:"Pack de 4 · plusieurs couleurs",price:7.90,cat:"style",img:"assets/valve-caps.jpeg",badge:"NOUVEAU"},
{id:3,name:"Protection câble FLEX",desc:"Gaine spirale pour câbles",price:6.90,cat:"pratique",img:"assets/cable-protectors.png",badge:"ESSENTIEL"}
];
let cart=JSON.parse(localStorage.getItem("voltly-cart")||"[]");
const productsEl=document.querySelector("#products");
function money(n){return n.toLocaleString("fr-FR",{style:"currency",currency:"EUR"})}
function renderProducts(cat="all"){
 productsEl.innerHTML=products.filter(p=>cat==="all"||p.cat===cat).map(p=>`
 <article class="product"><div class="product-img"><span class="badge">${p.badge}</span><img src="${p.img}" alt="${p.name}"></div>
 <div class="product-info"><h3>${p.name}</h3><p>${p.desc}</p><div class="price-row"><span class="price">${money(p.price)}</span><button class="add" onclick="addToCart(${p.id})">Ajouter +</button></div></div></article>`).join("");
}
function save(){localStorage.setItem("voltly-cart",JSON.stringify(cart));renderCart()}
function addToCart(id){const item=cart.find(x=>x.id===id);item?item.qty++:cart.push({id,qty:1});save();openCart()}
function change(id,d){const i=cart.find(x=>x.id===id);if(!i)return;i.qty+=d;if(i.qty<=0)cart=cart.filter(x=>x.id!==id);save()}
function renderCart(){
 document.querySelector("#cartCount").textContent=cart.reduce((a,x)=>a+x.qty,0);
 const box=document.querySelector("#cartItems");
 if(!cart.length){box.innerHTML='<div class="empty">Ton panier est vide.<br>Ajoute ton premier accessoire ⚡</div>';document.querySelector("#subtotal").textContent=money(0);return}
 let total=0;box.innerHTML=cart.map(x=>{const p=products.find(p=>p.id===x.id);total+=p.price*x.qty;return `<div class="cart-line"><img src="${p.img}" alt=""><div><h4>${p.name}</h4><p>${money(p.price)}</p></div><div class="qty"><button onclick="change(${p.id},-1)">−</button><b>${x.qty}</b><button onclick="change(${p.id},1)">+</button></div></div>`}).join("");
 document.querySelector("#subtotal").textContent=money(total)
}
function openCart(){document.querySelector("#cart").classList.add("open");document.querySelector("#overlay").classList.add("show")}
function closeCart(){document.querySelector("#cart").classList.remove("open");document.querySelector("#overlay").classList.remove("show")}
document.querySelector("#cartBtn").onclick=openCart;document.querySelector("#closeCart").onclick=closeCart;document.querySelector("#overlay").onclick=closeCart;
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderProducts(b.dataset.cat)});
renderProducts();renderCart();
