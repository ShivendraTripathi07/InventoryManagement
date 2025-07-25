# Inventory Management System

## 🧾 Overview

The **Inventory Management System** is a full-stack application designed to help businesses efficiently manage and monitor their inventory. It provides features for adding, updating, tracking stock levels, and gaining insights through analytics. Ideal for small to medium-sized enterprises, the system ensures seamless operations with a secure backend and a responsive, AI-enhanced frontend.

🔗 **Live Demo**: [https://inventorymanagement-2.onrender.com/](https://inventorymanagement-2.onrender.com/)

---

## 🚀 Features

- **Product Management**: Add, update, and delete inventory items with attributes like name, SKU, quantity, price, and description.
- **Stock Tracking**: Monitor stock levels and receive alerts when inventory falls below defined thresholds.
- **Analytics**: View inventory summaries, product category breakdowns, top product types, stock value summaries, and recently added items.
- **Low Stock Detection**: Automatically detect and report products that fall below a user-defined quantity threshold.
- **Role-Based Access**: Authentication with support for admin users to access sensitive analytics and perform advanced actions.
- **AI-Assisted Frontend**: Frontend was designed using AI tools for improved user experience, faster prototyping, and responsive layout generation.
- **Clean UI**: Intuitive and user-friendly interface for easy navigation and management.

---

## 🛠️ Technologies Used

### 🔙 Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt for password hashing

### 🌐 Frontend

- React.js
- Tailwind CSS
- React Router
- Axios

### 🧠 AI Tools

- UI generation assistance using AI-powered design tools
- AI code completion and layout suggestions
- Responsiveness optimization with the help of AI-guided best practices

### 🧰 Other Tools

- Postman (API testing)
- Swagger (API documentation)
- Docker (for containerized deployment)

---

## 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/ShivendraTripathi07/InventoryManagement.git

# 2. Navigate to the backend folder
cd InventoryManagement/backend

# 3. Install backend dependencies
npm install

# 4. Start the backend server
npm run dev

# 5. Open a new terminal, navigate to the frontend folder
cd ../frontend

# 6. Install frontend dependencies
npm install

# 7. Start the frontend server
npm run dev
```

> Ensure MongoDB is running locally or update your `.env` file with a valid MongoDB connection string.
