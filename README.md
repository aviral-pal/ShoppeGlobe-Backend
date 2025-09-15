
````markdown
# 🛒 ShoppeGlobe Backend

ShoppeGlobe is a backend API for an e-commerce platform, developed with **Node.js**, **Express.js**, and **MongoDB**.  
It provides essential e-commerce functionalities such as user authentication, product catalog management, and a secure shopping cart system.  
The API is designed for **scalability**, **security**, and **ease of integration** with frontend applications.

---

## 🔗 GitHub Repository
[ShoppeGlobe-Backend](https://github.com/aviral-pal/ShoppeGlobe-Backend)

---

## 🧾 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Setup](#-project-setup)
- [Development Commands](#-development-commands)
- [Production Commands](#-production-commands)
- [API Endpoints](#-api-endpoints)
- [Folder Structure](#-folder-structure)
- [Sample Requests](#-sample-requests)

---

## 🚀 Features
✅ **User Authentication** – Secure user registration and login with hashed passwords & JWT  
🛍️ **Product Management** – CRUD APIs for managing products  
🛒 **Shopping Cart System** – Add, update, or remove items from the cart  
🚫 **Centralized Error Handling** – Consistent API error responses via middleware  
🗃️ **MongoDB Integration** – Fully integrated with MongoDB (compatible with Compass)  
🌐 **RESTful Architecture** – Clean and scalable API design  

---

## 🛠 Tech Stack
- **Node.js** – Backend runtime  
- **Express.js** – Web framework  
- **MongoDB + Mongoose** – Database & ODM  
- **JWT** – Authentication  
- **dotenv** – Environment configuration  

---

## 🧩 Project Setup

### 1. Clone the Repository
```bash
git clone https://github.com/aviral-pal/ShoppeGlobe-Backend.git
cd ShoppeGlobe-Backend
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/shoppyglobe
JWT_SECRET=your_jwt_secret_here
```

### 4. Set up MongoDB

* Install [MongoDB Community Edition](https://www.mongodb.com/try/download/community) and [Compass](https://www.mongodb.com/products/compass).
* Run MongoDB locally:

  ```bash
  mongod
  ```
* Connect in Compass with:

  ```
  mongodb://localhost:27017/shoppyglobe
  ```

The `shoppyglobe` database will be created automatically on app start.

---

## 💻 Development Commands

Start server with **nodemon** (auto-reload):

```bash
npm start
```

(Optional) Seed product data:

```bash
npm run import:products
```

---

## 🚀 Production Commands

Start server in production mode:

```bash
npm start
```

---

## 🔌 API Endpoints

### Auth

* `POST /register` – Register new user
* `POST /login` – Login and return JWT

### Products

* `GET /products` – Get all products
* `GET /products/:id` – Get product by ID
* `POST /products` – Add product (Admin/Protected)

### Cart (Protected Routes)

* `GET /cart` – Get user’s cart
* `POST /cart` – Add product to cart
* `PUT /cart/:productId` – Update cart item quantity
* `DELETE /cart/:productId` – Remove product from cart

---

## 📁 Folder Structure

```
ShoppeGlobe-Backend/
│
├── config/
│   └── db.js              # MongoDB connection
│
├── controllers/
│   ├── authController.js
│   ├── cartController.js
│   └── productController.js
│
├── middlewares/
│   ├── auth.js            # JWT auth middleware
│   └── error.js           # Centralized error handling
│
├── models/
│   ├── Cart.js
│   ├── Product.js
│   └── User.js
│
├── routes/
│   ├── authRoutes.js
│   ├── cartRoutes.js
│   └── productRoutes.js
│
├── utils/
│   └── seedProducts.js
│
├── app.js / server.js     # Entry point
├── importProducts.js      # Product seeder script
├── package.json
└── .env
```

---

## 📬 Sample Requests

### 🔐 Register User

```json
POST /register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### 🔐 Login User

```json
POST /login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### 🛒 Add Product to Cart

```json
POST /cart
Authorization: Bearer <token>

{
  "productId": "PRODUCT_ID_HERE",
  "quantity": 2
}
```

### 🛒 Update Cart Item

```json
PUT /cart/:productId
Authorization: Bearer <token>

{
  "quantity": 3
}
```

### ❌ Remove Product from Cart

```json
DELETE /cart/:productId
Authorization: Bearer <token>
```

### ➕ Create Product

```json
POST /products
{
  "title": "Cool Gadget",
  "description": "Awesome features",
  "price": 199,
  "stock": 50,
  "category": "gadgets"
}
```

---

⚠️ **Note:** Run `npm run import:products` before testing APIs if you want dummy product data.

---

✍️ **Author**: [Aviral Pal](https://github.com/aviral-pal)
📧 **Email**: [aviralpal31@gmail.com](mailto:aviralpal31@gmail.com)


---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

```

---


