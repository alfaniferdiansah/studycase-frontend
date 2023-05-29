import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { server } from "../../server";
import axios from "axios";

const DropDown = ({ categories, setDropDown }) => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.get(`${server}/category`,{
      name
    })
      .then(function (response) {
        navigate(`/product?category=${name.name}`);
        window.location.reload();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
      {categories &&
        categories.map((i, index) => (
          <div
            key={index}
            className={`${styles.normalFlex}`}
            onClick={() => handleSubmit(i)}
          >
            <h3 className="m-3 cursor-pointer select-none">{i.name}</h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;
