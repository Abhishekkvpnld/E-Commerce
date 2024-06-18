import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import Signup from './pages/SignUp.jsx';
import { Provider } from "react-redux";
import { store } from './redux/store.js';
import AdminPanel from './pages/AdminPanel.jsx';
import AllUsers from './pages/AllUsers.jsx';
import AllProducts from './pages/AllProducts.jsx';
import CategoryProduct from './pages/CategoryProduct.jsx';
import ProductDetails from './pages/ProductDetails.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/product-category/:categoryName",
        element: <CategoryProduct />
      },
      {
        path: "/product-details/:id",
        element:<ProductDetails/>
      },
      {
        path: "/admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "all-users",
            element: <AllUsers />
          },
          {
            path: "all-products",
            element: <AllProducts />
          },

        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode  >
);