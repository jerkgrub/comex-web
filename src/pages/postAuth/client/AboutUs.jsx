import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  // Animation variants
  const fadeInVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: custom, ease: "easeOut" },
    }),
  };

  // State to track if the hero image has loaded
  const [isHeroImageLoaded, setIsHeroImageLoaded] = useState(false);
  const heroImageUrl =
    "https://www.marconews.com/gcdn/presto/2021/09/18/PTCN/299593ab-386d-41d4-bd8d-6f3018a0c512-TCN_COASTAL_CLEANUP07.jpg";

  useEffect(() => {
    // Preload the hero image
    const img = new Image();
    img.src = heroImageUrl;
    img.onload = () => {
      setIsHeroImageLoaded(true);
    };
  }, [heroImageUrl]);

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-[calc(100vh_-_80px)] min-h-[91.3vh]">
        {/* Placeholder background */}
        <div className="absolute inset-0 bg-gray-300"></div>

        {/* Background image with loading animation */}
        <motion.div
          className="absolute inset-0 bg-fixed bg-center bg-cover"
          style={{
            backgroundImage: `url('${heroImageUrl}')`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHeroImageLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        ></motion.div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,_0,_0,_0.6)_0%,_transparent_70%)] backdrop-brightness-75"></div>

        {/* Content */}
        <div className="select-none relative z-10 flex flex-col items-center justify-center h-full px-4">
          <motion.h1
            className="text-5xl md:text-6xl text-white text-center drop-shadow-lg"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            About Us
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-white text-center max-w-3xl mt-6 leading-relaxed font-light text-justify"
            variants={fadeInVariant}
            initial="hidden"
            animate="visible"
            custom={0.2}
          >
            The Community Extension Office is responsible for the development
            and implementation of sustainable community projects, social
            responsibility, and long-term learning programs on behalf of
            National University.
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <Section>
            <motion.div
              className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg p-12 rounded-lg shadow-lg -mt-20"
              variants={fadeInVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2 }}
              custom={0.1}
            >
              {/* Mission and Vision */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Mission */}
                <motion.div
                  variants={fadeInVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ amount: 0.2 }}
                  custom={0.3}
                >
                  <h2 className="text-3xl font-semibold mb-4 text-blue-900">
                    🚀 Our Mission
                  </h2>
                  <p className="text-gray-700 leading-relaxed font-light text-justify">
                    Guided by the core values and characterized by our cultural
                    heritage of Dynamic Filipinism, National University is
                    committed to provide relevant, innovative, and accessible
                    quality education and other development programs to its
                    students, associates, faculty, alumni, and other
                    stakeholders to be proactive in socio-economic-environmental
                    problems both local and national through the Community
                    Extension Office program and services addressing local and
                    international concerns as well as contributing to global
                    priorities.
                  </p>
                </motion.div>

                {/* Vision */}
                <motion.div
                  variants={fadeInVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ amount: 0.2 }}
                  custom={0.4}
                >
                  <h2 className="text-3xl font-semibold mb-4 text-blue-900">
                    📌 Our Vision
                  </h2>
                  <p className="text-gray-700 leading-relaxed font-light text-justify">
                    The Community Extension Unit of National University will be
                    the primary facilitator and provider of effective programs
                    and projects to help empower communities and sectors in
                    addressing socio-economic environmental problems as well as
                    promoting volunteerism by using dynamic, science-based
                    educational resources.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </Section>

          {/* Contact Information */}
          <Section>
            <motion.div
              className="mt-12 text-center"
              variants={fadeInVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2 }}
              custom={0.5}
            >
              <h2 className="text-3xl font-semibold mb-4 text-blue-900">
                Contact Us
              </h2>
              <div className="flex justify-center items-center">
                <div className="flex flex-col justify-start items-start w-max">
                  <div>
                    <p className="text-gray-700 text-lg font-light">
                      📞 Mobile Number -{" "}
                      <a
                        href="tel:09123456789"
                        className="text-nucolor1 font-bold hover:underline hover:text-blue-700 transition duration-300"
                      >
                        0912 345 6789
                      </a>
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700 text-lg mt-2 font-light ">
                      📧 Email -{" "}
                      <a
                        href="mailto:comexoffice@nu-moa.edu.ph"
                        className="text-nucolor1 font-bold hover:underline hover:text-blue-700 transition duration-300"
                      >
                        comexoffice@nu-moa.edu.ph
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </Section>

          {/* Administration & Staff */}
          <Section>
            <motion.div
              className="mt-12 text-center"
              variants={fadeInVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2 }}
              custom={0.6}
            >
              <h2 className="text-3xl font-semibold mb-6 text-blue-900">
                Administration & Staff
              </h2>
              <motion.div
                className="flex flex-col items-center"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.6, delay: 0.7, ease: "easeOut" },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.2 }}
              >
                <ImageWithLoader
                  src="https://i.imgur.com/xHQfWxh.png"
                  alt="Zoren Matthew M. Blardonny"
                  className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white shadow-md"
                />
                <p className="text-gray-800 text-xl font-medium">
                  Zoren Matthew M. Blardonny
                </p>
                <p className="text-gray-600 font-light">
                  Director of Community Extension
                </p>
              </motion.div>
            </motion.div>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

// Section Component
const Section = ({ children }) => {
  return <section className="mb-12">{children}</section>;
};

// ImageWithLoader Component
const ImageWithLoader = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${
          isLoaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};