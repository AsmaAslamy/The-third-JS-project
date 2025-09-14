// آرایه محصولات
const products = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Phone", price: 500 },
  { id: 3, name: "Headphones", price: 150 },
  { id: 4, name: "Keyboard", price: 80 },
  { id: 5, name: "Mouse", price: 40 }
];

// لود cart از localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// المنت‌ها
const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const totalPriceSpan = document.getElementById("total");
const searchInput = document.getElementById("search");

// نمایش محصولات
function displayProducts(items) {
  productList.innerHTML = "";
  for (let product of items) {
    const div = document.createElement("div");
    div.className = "product";

    const span = document.createElement("span");
    span.textContent = product.name + " - $" + product.price;

    const button = document.createElement("button");
    button.textContent = "Add to Cart";
    button.addEventListener("click", function() {
      addToCart(product.id);
    });

    div.appendChild(span);
    div.appendChild(button);
    productList.appendChild(div);
  }
}

// افزودن به cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
  alert(product.name + " added to cart!");
}

// نمایش cart
function displayCart() {
  cartItems.innerHTML = "";

  for (let item of cart) {
    const div = document.createElement("div");
    div.className = "cart-item";

    const span = document.createElement("span");
    span.textContent = item.name + " - $" + item.price + " x " + item.quantity + " = $" + (item.price * item.quantity);

    const incBtn = document.createElement("button");
    incBtn.textContent = "+";
    incBtn.addEventListener("click", function() { increaseQuantity(item.id); });

    const decBtn = document.createElement("button");
    decBtn.textContent = "-";
    decBtn.addEventListener("click", function() { decreaseQuantity(item.id); });

    const remBtn = document.createElement("button");
    remBtn.textContent = "Remove";
    remBtn.addEventListener("click", function() { removeFromCart(item.id); });

    div.appendChild(span);
    div.appendChild(incBtn);
    div.appendChild(decBtn);
    div.appendChild(remBtn);

    cartItems.appendChild(div);
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalPriceSpan.textContent = total;
}

// افزایش تعداد
function increaseQuantity(id) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity += 1;
    updateCart();
  }
}

// کاهش تعداد
function decreaseQuantity(id) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity -= 1;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
    updateCart();
  }
}

// حذف محصول
function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCart();
}

// بروزرسانی cart و ذخیره در localStorage
function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// جستجو محصولات
searchInput.addEventListener("input", function(e) {
  const value = e.target.value.toLowerCase(); // گرفتن متن وارد شده و کوچک کردن حروف
  const filtered = products.filter(function(p) {
    return p.name.toLowerCase().includes(value); // فیلتر محصولات
  });
  displayProducts(filtered); // نمایش محصولات فیلتر شده
});