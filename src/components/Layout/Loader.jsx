import React from "react";
import Lottie from "lottie-react";
import animationData from "../../Assests/animations/9295-full-movie-experience-including-music-news-video-weather-and-lots-of-entertainment.json";

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Lottie options={defaultOptions} width={300} height={300} />
    </div>
  );
};

export default Loader;
