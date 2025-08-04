# 💰 Expense Tracker App

A Flutter-inspired React application to track income and expenses in real time, with user authentication and persistent storage via Firebase.

---

## 🚀 Overview

The **Expense Tracker** is a responsive React web app that lets users:

* **Log income and expenses** with categories and timestamps
* **View a running balance** and transaction history
* **Authenticate** via Firebase Authentication
* **Persist data** in Firebase Firestore

---

## 🏗️ Tech Stack

* **React** (with Hooks & Context API)
* **Firebase**

  * Authentication (Email/Password)
  * Firestore Database
* **React Router** for client-side routing
* **Styled Components** / CSS Modules for styling

---

## 🔥 Features

* **User Sign-up & Login**
* **Add/Edit/Delete Transactions** (Income & Expense)
* **Real-time Balance Calculation**
* **Transaction History** with date filtering
* **Responsive Design** for mobile & desktop

---

## 🛠️ Installation & Running

1. **Clone the repo**

   ```sh
   git clone https://github.com/JOSU10xD/expense-tracker.git
   cd expense-tracker
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Configure Firebase**

   * Copy your Firebase config into `src/firebase/config.js`

4. **Start the dev server**

   ```sh
   npm start
   ```

---

## 📂 Project Structure

```
src/
├── App.js                 # Root component, routing & auth listener
├── components/            # Reusable UI components
│   ├── Header.js          # Navigation bar & logout
│   ├── TransactionForm.js # Add/Edit transaction form
│   ├── TransactionList.js # Displays list of transactions
│   ├── Balance.js         # Shows current balance
│   └── ...                
├── pages/                 # Page-level components (routes)
│   ├── LoginPage.js       # Sign-in & sign-up forms
│   ├── Dashboard.js       # Main app view after login
│   └── NotFound.js        # 404 fallback
├── firebase/              # Firebase setup & helpers
│   ├── config.js          # Firebase SDK initialization
│   ├── auth.js            # Auth helper functions
│   └── firestore.js       # Firestore CRUD wrappers
└── index.js               # Application entry point
```

---

## 🔍 How It Works

1. **App Initialization**

   * `App.js` listens for Firebase auth state changes.
   * Redirects to **LoginPage** or **Dashboard** based on user status.

2. **Authentication**

   * Sign-up and login handled in `pages/LoginPage.js` using `auth.js` helpers.
   * On success, user is routed to the dashboard.

3. **Dashboard**

   * Composed of `Header`, `Balance`, `TransactionForm`, and `TransactionList`.
   * `firestore.js` provides real-time listeners to sync transactions.

4. **Transactions**

   * **Add/Edit:** `TransactionForm.js` collects data and calls Firestore API.
   * **List & Delete:** `TransactionList.js` shows all records with delete option.
   * Balance auto-updates by summing incomes and expenses.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add awesome feature"`)
4. Push to your fork (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**. See [LICENSE](../LICENSE) for details.
