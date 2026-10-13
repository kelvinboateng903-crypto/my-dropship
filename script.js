const products=[
{id:1,name:"Classic Linen Shirt",price:18500,cat:"shirts",img:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=80"},
{id:2,name:"Elegant Summer Dress",price:32000,cat:"dresses",img:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=80"},
{id:3,name:"Premium Street Hoodie",price:28000,cat:"hoodies",img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=80"},
{id:4,name:"Relaxed Cargo Trousers",price:24000,cat:"trousers",img:"https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=700&q=80"},
{id:5,name:"Oversized Cotton Tee",price:15000,cat:"shirts",img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80"},
{id:6,name:"Classic Black Dress",price:35000,cat:"dresses",img:"https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=700&q=80"},
{id:7,name:"Everyday Hoodie",price:26000,cat:"hoodies",img:"https://images.unsplash.com/photo-1509942774463-acf339cf87d5?auto=format&fit=crop&w=700&q=80"},
{id:8,name:"Straight Fit Trousers",price:22000,cat:"trousers",img:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80"}
];
let cart=JSON.parse(localStorage.getItem("preciousGemsCart")||"[]");

const money=n=>"₦"+n.toLocaleString("en-NG");
function save(){localStorage.setItem("preciousGemsCart",JSON.stringify(cart));updateCount()}
function updateCount(){document.getElementById("cartCount").textContent=cart.reduce((s,i)=>s+i.qty,0)}
function renderProducts(){
 const filter=document.getElementById("categoryFilter").value;
 document.getElementById("products").innerHTML=products.filter(p=>filter==="all"||p.cat===filter).map(p=>`
 <article class="product"><img src="${p.img}" alt="${p.name}">
 <div class="product-info"><h3>${p.name}</h3><div class="price">${money(p.price)}</div>
 <button class="add" onclick="addToCart(${p.id})">Add to Cart</button></div></article>`).join("");
}
function addToCart(id){let item=cart.find(x=>x.id===id);item?item.qty++:cart.push({id,qty:1});save();renderCart();openCart()}
function changeQty(id,delta){let i=cart.find(x=>x.id===id);if(!i)return;i.qty+=delta;if(i.qty<=0)cart=cart.filter(x=>x.id!==id);save();renderCart()}
function total(){return cart.reduce((s,i)=>s+products.find(p=>p.id===i.id).price*i.qty,0)}
function renderCart(){
 document.getElementById("cartItems").innerHTML=cart.length?cart.map(i=>{let p=products.find(x=>x.id===i.id);return `<div class="cart-item"><img src="${p.img}"><div class="cart-item-info"><b>${p.name}</b><p>${money(p.price)}</p><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button> ${i.qty} <button onclick="changeQty(${p.id},1)">+</button></div></div></div>`}).join(""):"<p>Your cart is empty.</p>";
 document.getElementById("cartTotal").textContent=money(total());
}
function openCart(){renderCart();document.getElementById("cartOverlay").classList.remove("hidden")}
function closeCart(){document.getElementById("cartOverlay").classList.add("hidden")}
function openCheckout(){
 if(!cart.length){alert("Add an item to your cart first.");return}
 closeCart();document.getElementById("checkoutSummary").innerHTML=`<div class="summary"><b>Order total: ${money(total())}</b><br>${cart.map(i=>{let p=products.find(x=>x.id===i.id);return `${p.name} × ${i.qty}`}).join("<br>")}</div>`;
 document.getElementById("checkoutOverlay").classList.remove("hidden")
}
function closeCheckout(){document.getElementById("checkoutOverlay").classList.add("hidden")}
function placeOrder(e){
 e.preventDefault();
 const name=document.getElementById("name").value;
 const orderId="PG"+Date.now().toString().slice(-7);
 document.getElementById("successText").textContent=`Thank you, ${name}. Your order ${orderId} has been received. Total: ${money(total())}. We will contact you to confirm delivery and payment.`;
 cart=[];save();closeCheckout();document.getElementById("successOverlay").classList.remove("hidden");e.target.reset()
}
function closeAll(){document.querySelectorAll(".overlay").forEach(x=>x.classList.add("hidden"))}
renderProducts();updateCount();