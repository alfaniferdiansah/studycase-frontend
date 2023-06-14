import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, SignupPage, HomePage, ProductsPage, ProfilePage } from "./Routes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectLoading } from "./redux/userSelector";
import { useSelector } from "react-redux";

const App = () => {
  const loading = useSelector(selectLoading);

  return (
    <div>
      {
        loading ? null : (
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route path="/product" element={<ProductsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
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
        )
      }
        
    </div>
  );
};

export default App;
