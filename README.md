# 🛍️ Fashion E-Commerce Website

## 📋 Overview
**Fashion** is a fully-featured e-commerce website for marketing and selling women's fashion products. The site features an attractive and user-friendly interface with a mini cart and favorites system.

<img width="1920" height="1080" alt="Screenshot (667)" src="https://github.com/user-attachments/assets/7026d24f-f087-4ffe-9e6e-4b2829268c13" />


##✨ Live Demo
👉 [View Live Project](https://vimeo.com/1149219198?fl=ip&fe=ec)

## ✨ Key Features

### 🔐 User System
- **Registration**: Create a new account (First Name, Last Name, Email, Password)
- **Login**: Secure user authentication 
- **Logout**: Safe session termination

### 🛒 Cart & Favorites System
- **Add to Cart**: Select products and add them to shopping cart
- **Favorites Display**: Save and view favorite products
- **Mini Cart Display**: Quick view of cart contents from any page
- **Total Price Calculation**: Automatic calculation of total amount

### 🔎 Advanced Search System
- Search by: **Name, Color, Material, Price**
- Real-time search while typing

## 📱 Website Pages

| Page | File | Description |
|------|------|-------------|
| Homepage (Guest) | `index.html` | For unregistered visitors |
| Homepage (User) | `loggedin.html` | For authenticated users |
| Registration | `register.html` | New account creation |
| Login | `login.html` | User authentication |
| Cart | `cart.html` | Shopping cart and favorites |

## 🏗️ Technical Structure

### File Structure
project/
├── index.html # Homepage (non-logged in)
├── loggedin.html # Homepage (logged in)
├── register.html # Registration page
├── login.html # Login page
├── cart.html # Cart page
├── image/ # Images folder
│ ├── logo2.png # Website logo
│ └── bg2.jpeg # Page background
├── css/ # Styles folder
│ ├── shared_stylesheet.css # Shared styles
│ ├── product_stylesheet.css # Product styles
│ ├── cart_stylesheet.css # Cart styles
│ └── index_stylesheet.css # Main page styles
└── scripts/
├── script.js # Main JavaScript file
└── register.js # Registration JavaScript

## Technologies Used
- **HTML5** - Page structure
- **CSS3** - Styling and design
- **JavaScript** - Interactivity and data handling
- **LocalStorage** - Local user data storage
- **Phosphor Icons** - Icon library
- **Google Fonts** - Playwrite FR Moderne font
- **Font Awesome** - Additional icons

## 🎨 Design & Interface

### Visual Themes
- **Font**: Playwrite FR Moderne (elegant and modern)
- **Colors**: Stylish design suitable for women's fashion
- **Interactivity**: Hover and click effects
- **Responsiveness**: Responsive design for all devices


## ⚙️ How to Use

### For New Users
1. Go to the homepage
2. Click "Register"
3. Fill in registration details
4. Login with your new account

### For Registered Users
1. Login via the Login page
2. Browse products and add to cart
3. Click cart icon to view contents
4. Go to Cart page for full details

### Account Management
- Display username at top of page
- Automatic cart counter updates
- Secure logout
