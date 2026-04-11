# 🛍️ Crafty Corner – E-Commerce Platform

## 📌 Overview

Crafty Corner is a full-stack e-commerce platform designed to provide a seamless online shopping experience. It includes secure authentication, product management, cart functionality, and order processing, built using modern web technologies.

---

## 🚀 Features

* 🔐 JWT-based Authentication & Role-Based Authorization
* 🛒 Product Listing and Management
* 👤 User Registration & Login
* 🧺 Cart Management
* 📦 Order Processing
* 🔎 Efficient Data Handling with Entity Framework Core
* ⚡ Scalable and Clean Layered Architecture

---

## 🛠️ Tech Stack

### Backend

* ASP.NET Core Web API
* Entity Framework Core
* SQL Server

### Frontend

* React

### Tools & Technologies

* Postman (API Testing)
* Git & GitHub
* Visual Studio / VS Code

---

## 📂 Project Structure

```
CraftyCorner/
│
├── Backend/
│   ├── Controllers/
│   ├── Models/
│   ├── DTOs/
│   ├── Services/
│   ├── Repositories/
│   └── Data/
│
├── Frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── assets/
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/crafty-corner.git
cd crafty-corner
```

---

### 2️⃣ Backend Setup

```bash
cd Backend
dotnet restore
dotnet build
dotnet run
```

* Update `appsettings.json` with your SQL Server connection string
* Apply migrations:

```bash
dotnet ef database update
```

---

### 3️⃣ Frontend Setup

```bash
cd Frontend
npm install
npm start
```

---

## 🔐 Authentication

* JWT-based authentication is implemented
* Role-based access for Admin and Users
* Secure API endpoints

---

## 📸 Screenshots

*Add screenshots of your UI here (Home, Login, Cart, etc.)*

---

## 📈 Future Enhancements

* Payment Gateway Integration
* Product Reviews & Ratings
* Admin Dashboard
* Advanced Search & Filters
* Deployment on Cloud (Azure)

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

**Haarith P**

* LinkedIn: https://www.linkedin.com/in/haarith-p-5a503a235/
* GitHub: https://github.com/haarith30

---
