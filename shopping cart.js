// 1. Product array (should match your products in products.html)
const products = [
    { id: 1, name: "Macchiato", price: 100, img: "https://i.pinimg.com/1200x/15/64/e0/1564e0b50862040029cc4270e2f70a12.jpg" },
    { id: 2, name: "Cappuccino", price: 120, img: "https://i.pinimg.com/736x/68/56/07/685607b5097e1adff1a1df2d2ea5a930.jpg" },
    { id: 3, name: "Espresso", price: 50, img: "https://i.pinimg.com/1200x/04/d5/0f/04d50fbe2bde4143b0181b1c79e37d88.jpg" },
    { id: 4, name: "Iced Americano", price: 70, img: "https://i.pinimg.com/1200x/49/ad/27/49ad276fdc6a5c3a8b46457a415471de.jpg" },
    { id: 5, name: "Iced Latte", price: 125, img: "https://i.pinimg.com/736x/cc/32/48/cc32481f44aedc6161f4514aa51e86ed.jpg" },
    { id: 6, name: "Lungo", price: 50, img: "https://i.pinimg.com/1200x/0e/48/20/0e48204e637cc1baeb61c15ac00c4df8.jpg" },
    { id: 7, name: "Decaf Cappuccino", price: 90, img: "https://i.pinimg.com/736x/f8/38/17/f83817560f3c6cc3c9b311ad82517daf.jpg" },
    { id: 8, name: "Flat White", price: 110, img: "https://i.pinimg.com/736x/1a/2b/3c/1a2b3c4d5e6f.jpg" },
    { id: 9, name: "Mocha", price: 130, img: "https://i.pinimg.com/736x/2b/3c/4d/2b3c4d5e6f7a.jpg" },
    { id: 10, name: "Americano", price: 60, img: "https://i.pinimg.com/736x/3c/4d/5e/3c4d5e6f7a8b.jpg" }
];

// 1. Cart array
let cart = [];

// Select cart elements
const cartList = document.getElementById('cart-list');
const subtotalEl = document.querySelector('.subtotal');
const emptyMessage = document.querySelector('.empty-message');
const checkoutBtn = document.querySelector('.checkout-btn');

// 3. Render cart function
function renderCart() {
    // Clear current list
    cartList.innerHTML = '';

    if (cart.length === 0) {
        emptyMessage.style.display = 'block';
        checkoutBtn.classList.add('disabled');
    } else {
        emptyMessage.style.display = 'none';
        checkoutBtn.classList.remove('disabled');
    }

    cart.forEach(item => {
        const li = document.createElement('li');

        // Product name
        const name = document.createElement('span');
        name.textContent = item.name + " - ₱" + item.price.toFixed(2);
        li.appendChild(name);

        // Quantity input
        const qtyInput = document.createElement('input');
        qtyInput.type = 'number';
        qtyInput.min = 0;
        qtyInput.value = item.quantity;
        qtyInput.setAttribute('data-id', item.id);
        li.appendChild(qtyInput);

        cartList.appendChild(li);
    });

    // Calculate subtotal
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    subtotalEl.textContent = `Subtotal: ₱${subtotal.toFixed(2)}`;
}

// 2. Event delegation for Add to Cart buttons & quantity changes
document.body.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Add to Cart') {
        const id = parseInt(e.target.getAttribute('data-id'));
        const product = products.find(p => p.id === id);
        if (product) {
            const existing = cart.find(item => item.id === id);
            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            renderCart();
        }
    }
});

// Event delegation for quantity input changes
cartList.addEventListener('input', function(e) {
    if (e.target.tagName === 'INPUT' && e.target.type === 'number') {
        const id = parseInt(e.target.getAttribute('data-id'));
        const qty = parseInt(e.target.value);

        if (qty === 0) {
            cart = cart.filter(item => item.id !== id);
        } else {
            const item = cart.find(item => item.id === id);
            if (item) item.quantity = qty;
        }
        renderCart();
    }
});

// Initial render (in case cart has items from previous session)
renderCart();