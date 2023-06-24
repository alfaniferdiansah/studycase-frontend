import React, { useState, useEffect } from "react";
import styles from "../../styles/styles";
import { server } from "../../server";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const DropDown = ({ selectCategory }) => {
  const [categories, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("test Drop effect");
    axios
      .get(`${server}/category`)
      .then(function (response) {
        setCategory(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="pb-4 w-[270px] bg-[white] absolute z-30 rounded-b-md shadow-sm">
      {categories &&
        categories.map((item, index) => (
          <div
            key={index}
            className={`${styles.normalFlex}`}
            onClick={() => selectCategory(item._id)}
          >
            <Link to={`/product/?category=${item.name}`}>
              <h3 className="m-3 flex  cursor-pointer select-none">
                {item.name}
              </h3>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default DropDown;
