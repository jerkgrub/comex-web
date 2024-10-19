import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const HeroPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const fadeInVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: custom, ease: "easeOut" },
    }),
  };

  const scaleVariant = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const start_btn = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-[91.3vh] bg-gradient-bg3 p-10 py-24 flex flex-col bg-cover bg-no-repeat bg-nucolor2 justify-around items-center gap-1 text-justify">
      {/* Hero Content */}
      <div className="flex flex-col justify-center items-center gap-3">
        {/* Main Heading */}
        <motion.p
          className="font-bold font-roboto-slab text-5xl md:text-7xl text-black text-center tracking-wide drop-shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Unlock your Community Impact!
        </motion.p>

        {/* Subheading */}
        <motion.p
          className="font-light text-xl md:text-2xl text-black text-center italic drop-shadow-md"
          variants={fadeInVariant}
          initial="hidden"
          animate="visible"
          custom={0.2}
        >
          Welcome to COMEX CONNECT!
        </motion.p>

        {/* Hot Air Balloon Image */}
        <motion.img
          className="h-60 md:h-72 mt-12 drop-shadow-2xl"
          src="https://www.svgrepo.com/show/490900/hot-air-balloon.svg"
          alt="Hot Air Balloon"
          variants={scaleVariant}
          initial="hidden"
          animate="visible"
          custom={0.4}
        />

        {/* Android Download Image with download functionality */}
        <a href="/comexconnect-mobile.apk" download>
          <motion.img
            className="h-auto w-48 md:w-56 mt-8 cursor-pointer object-contain transition-transform duration-300 ease-in-out transform hover:scale-110 hover:rotate-3 drop-shadow-lg"
            src="/images/download_android.png"
            alt="Download Android App"
            whileHover={{ scale: 1.1 }}
          />
        </a>
      </div>
    </div>
  );
};

export default HeroPage;