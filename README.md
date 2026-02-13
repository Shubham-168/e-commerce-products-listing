# 🛍️ TrendHive — Product Listing Web Application

A modern, responsive **Product Listing Web Application** built as part of the **TapGro Frontend Assessment**.

The application fetches products from a public API and displays them in a clean ecommerce-style interface with responsive layouts, filtering, and product detail navigation.

---

## 🚀 Live Demo

🔗 **Live Production URL:**  
https://e-commerce-products-listing-murex.vercel.app

📂 **GitHub Repository:**  
https://github.com/Shubham-168/e-commerce-products-listing.git

---

## 📌 Objective

Build a simple Product Listing Web Application using React that:

- Fetches product data from API
- Displays products in a grid layout
- Shows product details clearly
- Handles loading and error states properly
- Works across different screen sizes

---

## 🧰 Tech Stack

- **React (Vite)**
- **Redux Toolkit**
- **Tailwind CSS**
- **React Router DOM**
- **SweetAlert2**
- **FakeStore API**

---

## 🌐 API Used

Public API:


https://fakestoreapi.com/products


No backend was used for this project.

---

## ✨ Features

### ✅ Product Listing
- Fetch products from API
- Responsive grid layout
- Product cards include:
  - Product Image
  - Title
  - Price
  - Category
  - Rating
- Loading indicator while fetching data
- User-friendly error handling

---

### ✅ Category Filtering
- Sidebar category filtering
- Default category selected on load
- Instant filtering without refetching API

---

### ✅ Grid / List View
- Toggle between grid and list view
- List view shows extended product information

---

### ✅ Responsive Design
- Fully responsive layout
- Desktop:
  - Left sidebar + product grid
- Mobile:
  - Sidebar opens as right-side drawer
  - Hamburger navigation

---

### ✅ Product Details Page
- Click on product card to view details
- Larger banner image
- Full product description
- Category, rating and pricing details

---

### ✅ Login Modal (UI Feature)
- Login popup modal
- Form validation
- User data stored in localStorage
- Login button replaced with avatar after login
- SweetAlert success message on login

---

### ✅ UX Improvements
- Fixed layout height
- Only product cards scrollable
- Accordion sidebar (Collections & Categories)
- Smooth transitions and hover effects
- Cursor pointer for all clickable elements

---

## 📁 Project Structure


src/
│
├── components/
│ ├── Navbar.jsx
│ ├── Sidebar.jsx
│ ├── LoginModal.jsx
│ ├── ProductCard.jsx
│ ├── ProductListCard.jsx
│ └── ViewToggle.jsx
│
├── pages/
│ ├── LandingPage.jsx
│ └── ProductDetails.jsx
│
├── features/
│ └── products/
│ └── productSlice.js
│
├── app/
│ └── store.js
│
└── App.jsx


---

## ⚙️ Installation & Setup

Clone the repository:

```bash
git clone https://github.com/Shubham-168/e-commerce-products-listing.git

Navigate to project folder:

cd trendhive

Install dependencies:

npm install

Run development server:

npm run dev
📱 Responsive Behavior
Screen Size	Layout
Large Screens	Sidebar + Product Grid
Medium & Small	Hamburger Menu + Drawer Sidebar
✅ Assessment Requirements Covered

Fetch & display products from API

Grid layout implementation

Product image, title, price, category display

Loading indicator

API error handling

GitHub repository submission

Live deployed application

👨‍💻 Author

Shubham Saini

Frontend Developer (React / Next.js)

🙌 Acknowledgment

Thanks to TapGro for the opportunity to work on this frontend assessment.