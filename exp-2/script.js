const products = [
    { id: 1, name: 'Apple', price: 50 },
    { id: 2, name: 'Banana', price: 30 },
    { id: 3, name: 'Orange', price: 40 },
    { id: 4, name: 'Grapes', price: 60 },
    { id: 5, name: 'Mango', price: 70 },
    { id: 6, name: 'Pineapple', price: 80 },
    { id: 7, name: 'Strawberry', price: 45 },
    { id: 8, name: 'Watermelon', price: 60 },
    { id: 9, name: 'Peach', price: 60 }
];

// Initialize cart state
let cart = {};

const productGrid = document.getElementById('product-grid');
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

// Initialize the application
function init() {
    renderProducts();
    renderCart();
}

// Render the product grid
function renderProducts() {
    productGrid.innerHTML = products.map(product => `
        <div class="product-card" onclick="addToCart('${product.name}')">
            <div class="product-name">${product.name}</div>
            <div class="product-price">₹${product.price}</div>
        </div>
    `).join('');
}

// Add item to cart
function addToCart(productName) {
    if (cart[productName]) {
        cart[productName]++;
    } else {
        cart[productName] = 1;
    }
    renderCart();
}

// Remove/Decrease item from cart
function removeFromCart(productName) {
    if (cart[productName]) {
        cart[productName]--;
        if (cart[productName] === 0) {
            delete cart[productName];
        }
    }
    renderCart();
}

// Render the cart items
function renderCart() {
    let cartHTML = '';
    let total = 0;

    products.forEach(product => {
        const qty = cart[product.name] || 0;
        if (qty > 0) {
            total += product.price * qty;
            cartHTML += `
                <div class="cart-item">
                    <div class="cart-item-name">${product.name}</div>
                    <div class="cart-item-price">${product.price}x${qty}=${product.price * qty}</div>
                    <div class="cart-controls">
                        <button class="btn" onclick="addToCart('${product.name}')">+</button>
                        <button class="btn" onclick="removeFromCart('${product.name}')">-</button>
                    </div>
                </div>
            `;
        }
    });

    if (total === 0) {
        cartItemsContainer.innerHTML = '<div style="text-align:center; color:#999;">Cart is empty</div>';
    } else {
        cartItemsContainer.innerHTML = cartHTML;
    }

    // Update Total
    totalPriceElement.innerText = `Total: ₹${total}`;
}

function buy() {
    if (Object.keys(cart).length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Clear cart
    cart = {};

    // Update UI to empty state but show success message
    // We manually set innerHTML here to show the specific success message
    // instead of the generic empty cart message from renderCart()
    cartItemsContainer.innerHTML = `
        <div style="
            color: #4CAF50; 
            font-weight: bold; 
            text-align: center; 
            padding: 20px; 
            font-size: 1.1rem;
            background-color: #e8f5e9;
            border-radius: 6px;
            border: 1px solid #c8e6c9;">
            Bought successfully!
        </div>
    `;
    totalPriceElement.innerText = `Total: ₹0`;
}

// Start the app
init();