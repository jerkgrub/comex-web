import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const start_btn = () => {
    // navigate('/login');
  };

  return (
    <div>
      <div className="min-h-[91.3vh] bg-gradient-bg3 p-10 py-24 flex flex-col bg-nucolor2 justify-around items-center gap-1">
        <div className="flex flex-col justify-center items-center gap-2 ">
          <p className="font-semibold font-roboto-slab text-6xl drop-shadow-lg	">
            "Unlock your Community Impact."
          </p>
          <p className=" font-extralight text-2xl drop-shadow-lg italic">
            Welcome to Comex Connect!
          </p>
          <img
          className="h-72 mt-12 drop-shadow-2xl"
          alt="hero"
          src="https://www.svgrepo.com/show/490900/hot-air-balloon.svg"
        />
        </div>
        
      </div>
    </div>
  );
};

export default HeroPage;
