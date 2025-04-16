class Product {
    constructor(id, name, price, material, color, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.material = material;
        this.color = color;
        this.image = image;
        this.isFavorite = false;
        this.isInCart = false;
        this.quantity = 1;  
    }
}

const products = [
    new Product(11001 , 'Cropped Blouse' , 400 , 'Wool' , 'Havana Brown' , 'image/img (24).jpeg'),
    new Product(11002 , 'Cropped Blouse' , 400 ,  'Wool' , 'Beige' , 'image/img (25).jpeg'),
    new Product(11003 , 'Cropped Blouse' , 400 ,  'Wool' , 'Gray' , 'image/img (26).jpeg'),
    new Product(11004 , 'Shrug' , 580 , 'Wool' ,'Baby Blue' , 'image/img (16).jpeg'),
    new Product(11005 , 'Shrug' , 580 , 'Wool' , 'Kiwi Green' , 'image/img (17).jpeg'),
    new Product(11006 , 'Shrug' , 580 ,  'Wool' , 'Beige' , 'image/img (20).jpeg'),
    new Product(11007 , 'Wool Bolero' , 350 ,  'Cashmere' , 'Black' , 'image/img (14).jpeg'),
    new Product(11008 , 'Wool Bolero' , 350 ,  'Cashmere' , 'White' , 'image/img (1).jpeg'),
    new Product(11009 , 'Wool Bolero' , 350 ,  'Cashmere' , 'Beige' , 'image/img (19).jpeg'),
    new Product(110010 , 'Blouse' , 520 ,  'Merino' , 'Mint Green' , 'image/img (2).jpeg'),
    new Product(110011 , 'Blouse' , 520 ,  'Merino' , 'Lavender' , 'image/img (22).jpeg'),
    new Product(110012 , 'Blouse' , 520 ,  'Merino' , 'Navy Blue' , 'image/img (23).jpeg'),
];

function renderProducts(productList) {
    //................testtt........
    
    console.log('Rendering products:', productList);
    
    const productsRow = document.getElementById('products-row');
    productsRow.innerHTML = '';

    productList.forEach(product => {
        const productCard =
            `<div class="product_card">
                     <div id="img_box">
                        <p class="product_id">Code :  # ${product.id}</p>
                        <img src=" ${product.image}" class="product_img" alt="${product.name}">
                     </div>
                     <div class="product_info">
                        <h5 class="product_name">${product.name}</h5>
                        <p class="product_price">Price : ${product.price} $</p>
                        <p class="product_material">Material : ${product.material}</p>
                        <p class="product_color">Color : ${product.color}</p>
                    </div>
                    <div class="action-container">
                        <i class="fas fa-heart card_icon ${product.isFavorite ? 'active' : ''}" onclick="toggleFavorite(${product.id})"></i>
                         <button class="btns_card ${product.isInCart ? 'btn-outline-danger' : 'btn-primary'} ${product.isInCart ? 'active' : ''}" onclick="toggleCart(${product.id})">
                            ${product.isInCart ? 'Remove from Cart' : 'Add to Cart'}
                        </button>
                    </div>
             </div>`;
        productsRow.insertAdjacentHTML('beforeend', productCard);
    });
}

function searchProducts() {
    const searchType = document.getElementById('search_type').value;
    const searchText = document.getElementById('search_filed').value.toLowerCase();
    
    const filteredProducts = products.filter(product => {
        if (searchType === 'name') {
            return product.name.toLowerCase().includes(searchText);
        } else if (searchType === 'color') {
            return product.color.toLowerCase().includes(searchText);
        } else if (searchType === 'material') {
        return product.material.toLowerCase().includes(searchText);
        } 
        else if (searchType === 'price') {
            return product.price.toString().includes(searchText);
        }
        return false;
    });
    
    renderProducts(filteredProducts);
}

function redirectTo(url) {
    window.location.href = url;
}

// ------------------------------------------------

let loggedIn = false;

function register() {
    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('Password').value;
    if (!firstName || !lastName || !email || !password) {
        alert('Please fill in all fields.');
        return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || {};
    users[email] = { password, firstName, lastName };
    localStorage.setItem('users', JSON.stringify(users));
    alert('Account created successfully!');
    window.location.href = 'login.html';
    // {redirectTo('login.html');}
}

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[email] && users[email].password === password) {
        localStorage.setItem('loggedInUser', JSON.stringify(users[email]));
        loggedIn = true;
        localStorage.setItem('loggedIn', loggedIn); 
        window.location.href ='loggedin.html';
    } else {
        alert('Invalid email or password.');
    }
}

function logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loggedIn');
    loggedIn=false;
    // localStorage.clear();
    localStorage.removeItem('cart');
    localStorage.removeItem('favorites');
    window.location.href = 'index.html';
}

//--------------------------------------------------

let cartCount=0;

function toggleCart(productId) {
    const isLoggedIn = JSON.parse(localStorage.getItem('loggedIn'));
        //................testtt........

    console.log('Toggle Cart Clicked. Logged in:', isLoggedIn);
    
    if (!isLoggedIn) {
        //................testtt........
        console.log('Redirecting to login.html');
        redirectTo('login.html');
        return;
    }
    const product = products.find(p => p.id === productId);
    //l array el ha store feh el products el selected
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (product.isInCart) {
        product.isInCart = false;
        product.quantity = 0;
        const index = cart.findIndex(p => p.id === productId);
        if (index > -1) cart.splice(index, 1);
    } else {
        product.isInCart = true;
        product.quantity = 1;
        //l2eto hada5lo fl array
        cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: product.quantity });
    }
    //save in local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    saveCartAndFavorites();
    updateCartDropdown();
    updateCartCount();
    renderProducts(products);
}

function toggleFavorite(productId) {
    const isLoggedIn = JSON.parse(localStorage.getItem('loggedIn'));
    console.log('Toggle Favorite Clicked. Logged in:', isLoggedIn);

    if (!isLoggedIn) {
        console.log('Redirecting to login.html');
        redirectTo('login.html');
        return;
    }

    const product = products.find(p => p.id === productId);

    if (product.isFavorite) {
        removeFavorite(productId);
    } else {
        product.isFavorite = true;
        saveCartAndFavorites();
        const productCardHeart = document.querySelector(`.fa-heart[onclick="toggleFavorite(${productId})"]`);
        if (productCardHeart) {
            productCardHeart.classList.add('active');
        }
    }

    renderProducts(products);
    if (window.location.href.includes('cart.html')) {
        renderFavoriteItems();
    }
}

function toggleCartDropdown() {
    const cartDropdown = document.getElementById('cartDropdown').nextElementSibling;
    cartDropdown.classList.toggle('show');
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = cartCount;
}

function updateCartDropdown() {
    const cartItems = products.filter(product => product.isInCart);
    const cartDropdownItems = document.getElementById('cartDropdownItems');
    cartDropdownItems.innerHTML = '';

    if (cartItems.length === 0) {
        cartDropdownItems.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cartItems.forEach(item => {
            const cartItem = `
                <div class="cart-items"> 
                    <div class="p_info">
                        <p class="mb-0">${item.name}</p>
                        <p class="mb-0">Price: <span id="itemPrice${item.id}">${item.price * item.quantity} $</span></p>                  
                        </div>
                    <div id="counter">
                        <button class="cart_btns" onclick="decreaseQuantity(${item.id})">-</button>
                        <span id="itemQuantity${item.id}">${item.quantity}</span>
                        <button class="cart_btns" onclick="increaseQuantity(${item.id})">+</button>
                    </div>
                </div>
                <hr>`;
            cartDropdownItems.insertAdjacentHTML('beforeend', cartItem);
        });
    }
    updateCartCount();
}

function increaseQuantity(productId) {
    const product = products.find(p => p.id === productId);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    product.quantity++;
    const cartItem = cart.find(p => p.id === productId);
    if (cartItem) {
        cartItem.quantity = product.quantity;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById(`itemQuantity${productId}`).textContent = product.quantity;
    document.getElementById(`itemPrice${productId}`).textContent = product.price * product.quantity;
    updateCartDropdown();
    renderCartItems()
}

function decreaseQuantity(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);
    if (product && product.isInCart) {
        product.quantity--;
        if (product.quantity <= 0) {
            product.isInCart = false;
            const index = cart.findIndex(p => p.id === productId);
            if (index > -1) {
                cart.splice(index, 1);
            }
            const productCardButton = document.querySelector(`button[onclick="toggleCart(${productId})"]`);
            if (productCardButton) {
                productCardButton.textContent = 'Add to Cart';
                productCardButton.classList.remove('btn-outline-danger');
                productCardButton.classList.add('btn-primary');
            }
            const cartItemCard = document.querySelector(`#cart-items .card[data-product-id="${productId}"]`);
            if (cartItemCard) {
                cartItemCard.remove();
            }
        } else {
            const cartItem = cart.find(p => p.id === productId);
            if (cartItem) {
                cartItem.quantity = product.quantity;
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        document.getElementById(`itemQuantity${productId}`).textContent = product.quantity;
        document.getElementById(`itemPrice${productId}`).textContent = product.price * product.quantity;
        updateCartDropdown();
        renderCartItems();
        updateTotalPrice();
    }
}

function saveCartAndFavorites() {
    const cart = products.filter(product => product.isInCart);
    const favorites = products.filter(product => product.isFavorite);
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function loadCartAndFavorites() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    products.forEach(product => {
        const cartProduct = cart.find(p => p.id === product.id);
        const favoriteProduct = favorites.find(p => p.id === product.id)
        if (cartProduct) {
            product.isInCart = true;
            product.quantity = cartProduct.quantity;
        } else {
            product.isInCart = false;
            product.quantity = 0;
        }
        product.isFavorite = !!favoriteProduct;
    });
}

//-----------------------------------------------------------
function renderCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart_items');
    cartItemsContainer.innerHTML = '';
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p id="empty_text">Your cart is empty.</p>';
        return;
    }
    const cartItemsHtml = cartItems.map(item => 
       `<div  class="cart_card" data-product-id="${item.id}" >    
                <img src="${item.image}" class="card_img" alt="${item.name }">
                <div id="card_body">
                <div id="product_info">
                    <h5 class="card_title ">${item.name}</h5>
                    <p class="card_color ">Color : ${item.color}</p>
                    <p class="card_price ">Price: ${item.price * item.quantity} $</p>
                </div>
                    <div id="btns_box">
                        <div id="counter2">
                            <button class="card_btns" onclick="decreaseQuantity(${item.id})">-</button>
                            <span id="itemQuantity${item.id}" class="mx-2">${item.quantity}</span>
                            <button class="card_btns" onclick="increaseQuantity(${item.id})">+</button>
                        </div>     
                        <button id="remove_btn" onclick="removeFromCart(${item.id})">Remove from Cart</button>
                    </div> 
                </div>
        </div>
    `).join('');
    cartItemsContainer.innerHTML = `
        <div id="item_container">
            ${cartItemsHtml}
        </div>
    `;

    updateTotalPrice();
}

function renderFavoriteItems() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteItemsContainer = document.getElementById('favorite-items');
    favoriteItemsContainer.innerHTML = '';
    if (favorites.length === 0) {
        favoriteItemsContainer.innerHTML = '<p id="empty_text">You have no favorite items.</p>';
        return;
    }
    const favoriteItemsHtml = favorites.map(item => `
        <div class="fav_card" data-product-id="${item.id}">
            <img src="${item.image}" class="card-img-top" alt="${item.name}">
            <div class="product_info">
                <h5 class="product_name">${item.name}</h5>
                <h5 class="product_price"> Price : ${item.price} $</h5>
                <p class="product_code">Code: # ${item.id}</p>
                <i class="fas fa-heart crad_icon ${item.isFavorite ? 'active' : ''}" onclick="toggleFavorite(${item.id})"></i>
            </div>
        </div>
    `).join('');
    favoriteItemsContainer.innerHTML = favoriteItemsHtml;
}

function updateTotalPrice() {
    const totalPrice = products
        .filter(product => product.isInCart)
        .reduce((total, product) => total + product.price * product.quantity, 0);
        document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
}

function removeFromCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        product.isInCart = false;
        product.quantity = 0;
        saveCartAndFavorites();
        renderCartItems();
        updateCartDropdown();
        updateTotalPrice()
        document.querySelector(`#cart-items .card[data-product-id="${productId}"]`).remove();
    }
}

function removeFavorite(productId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const product = products.find(p => p.id === productId);

    if (product && product.isFavorite) {
        product.isFavorite = false;
        const index = favorites.findIndex(p => p.id === productId);
        if (index > -1) {
            favorites.splice(index, 1);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        const productCardHeart = document.querySelector(`.fa-heart[onclick="toggleFavorite(${productId})"]`);
        if (productCardHeart) {
            productCardHeart.classList.remove('active');
        }
        const favoriteItemCard = document.querySelector(`#favorite-items .card[data-product-id="${productId}"]`);
        if (favoriteItemCard) {
            favoriteItemCard.remove();
        }
        renderFavoriteItems();
    }
}
//-----------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
   
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const isLoggedIn = JSON.parse(localStorage.getItem('loggedIn'));
    if (loggedInUser && isLoggedIn) {
    loggedIn = true;
    document.getElementById('usernameDisplay').textContent = `Hello, ${loggedInUser.firstName}`;
    } else {
    loggedIn = false;
    }
    //................testtt........
    console.log('DOM fully loaded and parsed');
    loadCartAndFavorites();
    renderProducts(products);
    updateCartDropdown();
    updateCartCount();
    if (window.location.href.includes('cart.html')) {
        renderFavoriteItems();
    }
    // const cartIcon = document.getElementById('cartDropdown');
    const cartIcon = document.querySelector('.fas.fa-shopping-cart');
    cartIcon.addEventListener('click', toggleCartDropdown);
}); 