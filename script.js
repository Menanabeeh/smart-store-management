const products=[
{id:1,name:"شاشة سمارت 50 بوصة",category:"شاشات",price:12500,icon:"📺",desc:"صورة واضحة وتجربة مشاهدة ممتعة"},
{id:2,name:"غسالة أوتوماتيك",category:"غسالات",price:9800,icon:"🧺",desc:"غسيل عملي وبرامج متعددة"},
{id:3,name:"ثلاجة نوفروست",category:"ثلاجات",price:18500,icon:"🧊",desc:"مساحة مناسبة وحفظ أفضل للطعام"},
{id:4,name:"تكييف 1.5 حصان",category:"تكييفات",price:22900,icon:"❄️",desc:"راحة وانتعاش في الجو الحار"},
{id:5,name:"قلاية هوائية",category:"أجهزة صغيرة",price:2400,icon:"🍟",desc:"تحضير أسهل بكمية زيت أقل"},
{id:6,name:"شاشة سمارت 43 بوصة",category:"شاشات",price:8900,icon:"📺",desc:"مناسبة لغرفتك ومساحتك"},
{id:7,name:"غلاية كهربائية",category:"أجهزة صغيرة",price:650,icon:"☕",desc:"استخدام يومي سريع وسهل"},
{id:8,name:"تكييف 2.25 حصان",category:"تكييفات",price:31500,icon:"❄️",desc:"تبريد قوي للمساحات الأكبر"}
];
let cart={},category="الكل",search="";
const money=n=>n.toLocaleString("en-US")+" جنيه";
const grid=document.getElementById("productGrid");
function render(){
 const shown=products.filter(p=>(category==="الكل"||p.category===category)&&(p.name.includes(search)||p.category.includes(search)));
 document.getElementById("resultCount").textContent=shown.length+" منتجات";
 grid.innerHTML=shown.length?shown.map(p=>`<article class="product-card"><div class="product-art"><small>${p.category}</small><span>${p.icon}</span></div><div class="product-info"><h3>${p.name}</h3><p>${p.desc}</p><div class="product-bottom"><b class="price">${money(p.price)}</b><button class="add" onclick="addToCart(${p.id})">أضف للسلة +</button></div></div></article>`).join(""):'<p class="no-results">مفيش منتجات مطابقة للبحث</p>';
}
function addToCart(id){cart[id]=(cart[id]||0)+1;renderCart();toast("اتضاف المنتج للسلة");}
function changeQty(id,delta){cart[id]=(cart[id]||0)+delta;if(cart[id]<=0)delete cart[id];renderCart();}
function renderCart(){
 const entries=Object.entries(cart);let count=entries.reduce((s,[,q])=>s+q,0),total=0;
 document.getElementById("cartCount").textContent=count;
 document.getElementById("cartItems").innerHTML=entries.length?entries.map(([id,q])=>{let p=products.find(x=>x.id==id);total+=p.price*q;return `<div class="cart-row"><div><b>${p.name}</b><small>${money(p.price)} × ${q}</small></div><div class="qty"><button onclick="changeQty(${id},-1)">−</button><b>${q}</b><button onclick="changeQty(${id},1)">+</button></div></div>`}).join(""):'<p class="empty">السلة لسه فاضية</p>';
 document.getElementById("cartTotal").textContent=money(total);
}
const drawer=document.getElementById("cartDrawer"),overlay=document.getElementById("overlay");
function openCart(){drawer.classList.add("show");overlay.classList.add("show")}
function closeCart(){drawer.classList.remove("show");overlay.classList.remove("show")}
document.getElementById("openCart").onclick=openCart;document.getElementById("closeCart").onclick=closeCart;overlay.onclick=closeCart;
document.getElementById("searchInput").addEventListener("input",e=>{search=e.target.value.trim();render()});
document.getElementById("filters").addEventListener("click",e=>{if(e.target.dataset.category){category=e.target.dataset.category;document.querySelectorAll(".filters button").forEach(b=>b.classList.toggle("active",b===e.target));render()}});
document.getElementById("checkout").onclick=()=>{if(!Object.keys(cart).length){toast("ضيف منتجات للسلة الأول");return}toast("هنضيف رقم واتساب المتجر في الخطوة الجاية")};
let toastTimer;function toast(msg){let el=document.getElementById("toast");el.textContent=msg;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2200)}
render();renderCart();