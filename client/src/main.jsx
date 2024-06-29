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
import Cart from './pages/Cart.jsx';
import SearchPage from './pages/SearchPage.jsx';
import Success from './pages/Success.jsx';
import Cancel from './pages/Cancel.jsx';
import OrderPage from './pages/OrderPage.jsx';
import AllOrders from './pages/AllOrders.jsx';
import ChangePassword from './components/ChangePassword.jsx';



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
        path: "/change-password/:email",
        element: <ChangePassword />
      },
      {
        path: "/product-category",
        element: <CategoryProduct />
      },
      {
        path: "/product-details/:id",
        element: <ProductDetails />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/success",
        element: <Success />
      },
      {
        path: "/cancel",
        element: <Cancel />
      },
      {
        path: "/order",
        element: <OrderPage />
      },
      {
        path: "search",
        element: <SearchPage />
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
          {
            path: "all-orders",
            element: <AllOrders />
          }

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