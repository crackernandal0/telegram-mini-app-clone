import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./splash.css";
import persons from "@/assets/Group 48095651.png";
import sony from "@/assets/splash/sony-icons.svg";

export function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/home");
    }, 4000);
  }, []);

  return (
    <div className="bg-[#242C3B] min-h-screen flex flex-col items-center bg-bg bg-no-repeat bg-left-bottom">
      <header className="pt-6 pb-4 flex flex-col gap-2.5 items-center">
        <p className="text-white text-lg font-medium text-center max-w-[200px]">
          Need Up
        </p>
        <span className="text-center text-white text-xs">
          Join the Community, reap the rewards!
        </span>
      </header>

      {/* <img src={sony} alt="" />
      <img src={persons} alt="" /> */}

      {/* Loading line */}
      <div className="w-full flex justify-center mt-4">
        <div
          className="loader-line bg-gray-200 h-1 w-[80%] rounded-full relative"
          style={{
            position: "absolute",
            bottom: "30px",
          }}
        >
          <div className="loading-bar bg-blue-500 h-full rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
