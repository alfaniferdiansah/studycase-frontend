import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, SignupPage, HomePage, AddProductPage, ProductsPage } from "./Routes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import { getAllCategory } from "./redux/actions/category";
import { getAllProduct } from "./redux/actions/product";
import { getAllTag } from "./redux/actions/tag";

const App = () => {
  useEffect (() =>{
    store.dispatch(loadUser());
    store.dispatch(getAllCategory());
    store.dispatch(getAllProduct());
    store.dispatch(getAllTag());
  },[]);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </div>
  );
};

export default App;
