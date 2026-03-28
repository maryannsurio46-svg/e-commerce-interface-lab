// ===============================
// 1. PRODUCT CLASS
// ===============================
class Product {
    constructor(id, name, price, image, category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.category = category;
    }
}

// ===============================
// 2. PRODUCT DATA
// ===============================
const products = [
    new Product(1, "Macchiato", 100, "https://i.pinimg.com/1200x/15/64/e0/1564e0b50862040029cc4270e2f70a12.jpg", "espresso"),
    new Product(2, "Cappuccino", 120, "https://i.pinimg.com/736x/68/56/07/685607b5097e1adff1a1df2d2ea5a930.jpg", "cappuccino"),
    new Product(3, "Espresso", 50, "https://i.pinimg.com/1200x/04/d5/0f/04d50fbe2bde4143b0181b1c79e37d88.jpg", "espresso"),
    new Product(4, "Iced Americano", 70, "https://i.pinimg.com/1200x/49/ad/27/49ad276fdc6a5c3a8b46457a415471de.jpg", "americano"),
    new Product(5, "Iced Latte", 125, "https://i.pinimg.com/736x/cc/32/48/cc32481f44aedc6161f4514aa51e86ed.jpg", "latte"),
    new Product(6, "Lungo", 50, "https://i.pinimg.com/1200x/0e/48/20/0e48204e637cc1baeb61c15ac00c4df8.jpg", "espresso"),
    new Product(7, "Decaf Cappuccino", 90, "https://i.pinimg.com/736x/f8/38/17/f83817560f3c6cc3c9b311ad82517daf.jpg", "cappuccino"),
    new Product(8, "Flat White", 130, "https://i.pinimg.com/736x/1a/2b/3c/1a2b3c4d5e6f.jpg", "latte"),
    new Product(9, "Mocha", 140, "https://i.pinimg.com/736x/2b/3c/4d/2b3c4d5e6f7a.jpg", "latte"),
    new Product(10, "Americano", 80, "https://i.pinimg.com/1200x/70/12/0c/70120c.jpg", "americano")
];

// ===============================
// 3. CART STATE (localStorage)
// ===============================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===============================
// 4. SAVE CART
// ===============================
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ===============================
// 5. PRODUCT PAGE LOGIC
// ===============================
const productGrid = document.querySelector(".product-grid");

function renderProducts(list) {
    if (!productGrid) return;

    productGrid.textContent = "";

    list.forEach(product => {
        const article = document.createElement("article");

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;

        const title = document.createElement("h3");
        title.textContent = product.name;

        const price = document.createElement("p");
        price.textContent = `₱${product.price.toFixed(2)}`;

        const button = document.createElement("button");
        button.textContent = "Add to Cart";
        button.setAttribute("data-id", product.id);

        article.appendChild(img);
        article.appendChild(title);
        article.appendChild(price);
        article.appendChild(button);

        productGrid.appendChild(article);
    });
}

// ===============================
// 6. CART PAGE LOGIC
// ===============================
const cartList = document.querySelector("#cart-list");
const subtotalText = document.querySelector(".subtotal");
const emptyMessage = document.querySelector(".empty-message");

function renderCart() {
    if (!cartList) return;

    cartList.textContent = "";

    if (cart.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

    cart.forEach(item => {
        const li = document.createElement("li");

        const name = document.createElement("span");
        name.textContent = item.product.name;

        const price = document.createElement("span");
        price.textContent = `₱${item.product.price}`;

        const qty = document.createElement("input");
        qty.type = "number";
        qty.min = "0";
        qty.value = item.quantity;
        qty.setAttribute("data-id", item.product.id);

        li.appendChild(name);
        li.appendChild(price);
        li.appendChild(qty);

        cartList.appendChild(li);
    });

    const total = cart.reduce((sum, item) => {
        return sum + item.product.price * item.quantity;
    }, 0);

    subtotalText.textContent = `Subtotal: ₱${total.toFixed(2)}`;
}

// ===============================
// 7. EVENT DELEGATION (GLOBAL)
// ===============================
document.body.addEventListener("click", (e) => {

    // ADD TO CART
    if (e.target.matches("button[data-id]")) {
        const id = Number(e.target.getAttribute("data-id"));
        const product = products.find(p => p.id === id);

        const existing = cart.find(item => item.product.id === id);

        if (existing) {
            existing.quantity++;
        } else {
            cart.push({ product: product, quantity: 1 });
        }

        saveCart();
        alert(product.name + " added to cart!");
    }
});

// ===============================
// 8. QUANTITY CHANGE
// ===============================
document.body.addEventListener("input", (e) => {

    if (e.target.matches("input[type='number']")) {
        const id = Number(e.target.getAttribute("data-id"));
        const value = Number(e.target.value);

        const item = cart.find(i => i.product.id === id);

        if (value <= 0) {
            cart = cart.filter(i => i.product.id !== id);
        } else {
            item.quantity = value;
        }

        saveCart();
        renderCart();
    }
});

// ===============================
// 9. FILTER SYSTEM
// ===============================
const filterBtn = document.querySelector("#applyFilter");

if (filterBtn) {
    filterBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const selectedCategories = Array.from(
            document.querySelectorAll("input[type='checkbox']:checked")
        ).map(input => input.id);

        const selectedPrice = document.querySelector("input[name='price']:checked");

        let filtered = products;

        if (selectedCategories.length > 0) {
            filtered = filtered.filter(p =>
                selectedCategories.includes(p.category)
            );
        }

        if (selectedPrice) {
            if (selectedPrice.id === "p1") filtered = filtered.filter(p => p.price <= 50);
            if (selectedPrice.id === "p2") filtered = filtered.filter(p => p.price >= 51 && p.price <= 100);
            if (selectedPrice.id === "p3") filtered = filtered.filter(p => p.price >= 101 && p.price <= 150);
        }

        renderProducts(filtered);
    });
}

// ===============================
// 10. INITIAL LOAD
// ===============================
renderProducts(products);
renderCart();