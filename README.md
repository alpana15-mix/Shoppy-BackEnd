GitHub Repository Link : https://github.com/alpana15-mix/Shoppy-BackEnd.git

ShoppyGlobe Backend API

This project is a Node.js + Express.js + MongoDB based backend for the ShoppyGlobe e-commerce platform. It includes authentication, product handling, and cart CRUD operations.


---

🚀 Tech Stack

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

bcryptjs

dotenv

ThunderClient / Postman



---

📁 Project Folder Structure

shoppyglobe-backend/
│
├── src/
│   ├── controllers/
│   │     ├── authController.js
│   │     ├── productController.js
│   │     └── cartController.js
│   ├── middlewares/
│   │     ├── auth.js
│   │     └── errorHandler.js
│   ├── models/
│   │     ├── User.js
│   │     ├── Product.js
│   │     └── CartItem.js
│   ├── routes/
│   │     ├── authRoutes.js
│   │     ├── productRoutes.js
│   │     └── cartRoutes.js
│   └── app.js
│
├── .env
├── package.json
└── README.md


---

⚙️ How to Run the Project

1️⃣ Install dependencies

npm install

2️⃣ Create a .env file

PORT=5000
MONGO_URI=mongodb://localhost:27017/shoppyglobe
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

3️⃣ Start the server

npm run dev

You should see:

MongoDB connected
Server running...


---

🔐 Authentication Routes

👉 Register — POST /register

Body:

{
  "name": "Alpana",
  "email": "alpana@gmail.com",
  "password": "123456"
}

👉 Login — POST /login

Body:

{
  "email": "alpana@gmail.com",
  "password": "123456"
}

Response:

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MmIwYWExMDdmYzAwNTJhMjJmYjNkZiIsImlhdCI6MTc2NDQyODY3OSwiZXhwIjoxNzY1MDMzNDc5fQ.-IwLs72nm4mUr6V_-lCAalJL27cO4aLknYRiTIaekNk"
}

Use the token as:

Authorization: Bearer <token>


---

🛍️ Product Routes

✔ Get all products — GET /products

✔ Get product by ID — GET /products/:id

✔ Add product (test purpose) — POST /products

Body:

{
  "name": "Laptop",
  "price": 45000,
  "description": "Sample product",
  "stock": 10
}


---

🛒 Cart Routes (Protected)

🛑 Token mandatory for all cart routes

✔ Add to Cart — POST /cart

{
  "productId": "692b0d1c07fc0052a22fb3e2",
  "quantity": 1
}

✔ Get Cart — GET /cart

✔ Update Cart — PUT /cart/:id

{
  "quantity": 2
}

✔ Delete Cart — DELETE /cart/:id


---

🧪 Required Screenshots for Submission:

Register API

Login API

Add Product

Get All Products

Get Product by ID

Add to Cart

Get Cart

Update Cart

Delete Cart

MongoDB → users collection

MongoDB → products collection

MongoDB → cartitems collection



---

🛡 Error Handling

Missing fields → 400

Invalid credentials → 401

Token missing → 401

Forbidden access → 403

Resource not found → 404

Server error → 500



---

✔ Final Notes

Backend fully tested on ThunderClient

Organized MVC folder structure

JWT-based secure authentication

MongoDB database properly structured

