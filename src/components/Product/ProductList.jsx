import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import ProductCard from "../Route/ProductCard/ProductCard";
import styles from "../../styles/styles";
import axios from "axios";
import { server } from "../../server";
import Tags from "../Route/Tags/Tags";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [product, setProduct] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${server}/product`)
      .then(function (response) {
        setProduct(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (categoryData === null) {
      const d = product;
      setData(d);
    } else {
      const d =
        product && product.filter((i) => i.category === categoryData.id);
      setData(d);
    }
  }, [product]);

  return (
    <>
      <div>
        <Header activeHeading={3} />
        <br />
        <Tags />
        <br />
        <div className={`${styles.section}`}>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {data &&
              data.map((i, index) => <ProductCard data={i} key={i._id} />)}
          </div>
          {data && data.length === 0 ? (
            <h1 className="text-center w-full pb-[100px] text-[20px]">
              No products Found!
            </h1>
          ) : null}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ProductsPage;
