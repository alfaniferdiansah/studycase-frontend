import React from "react";
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data";
import styles from "../../../styles/styles";
import { useSelector } from "react-redux";

const Tags = () => {
  const { allTags } = useSelector((state) => state.tag);
  const navigate = useNavigate();
  return (
    <>
      <div className={`${styles.section} hidden sm:block`}>
        <div
          className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-start" key={index}>
                {i.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                  <p className="text-xs md:text-sm">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div
        className={`${styles.section} bg-[hsl(27,96%,53%)] p-6 rounded-lg mb-12`}
        id="categories"
      >
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
          { categoriesData &&
            categoriesData.map((item) => {
              const handleSubmit = (item) => {
                navigate(`/products?tag=${item.title}`);
              };
              return (
                <div
                  className="w-full h-[25px] flex items-center justify-center cursor-pointer overflow-hidden"
                  key={item}
                  onClick={() => handleSubmit(item)}
                >
                  <h5 className={`font-bold text-[18px] leading-[1.3]`}>{item.title}</h5>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Tags;