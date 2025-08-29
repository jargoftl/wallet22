import React, { useEffect, useState } from "react";
import { BsTwitterX } from "react-icons/bs";
import { PiTelegramLogoLight } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";
import logo from "/images/logo/loo1.jpg";
import PopModal from "./PopModal";
import ErrorModal from "./ErrorModal";

const Homepage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);

  // state for info
  const [info, setInfo] = useState(null);

  // fetch info from API
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch("https://lol-ep0y.onrender.com/info");
        const data = await res.json();

        // ✅ Only set info if all fields exist
        if (data.name && data.title && data.paragraph) {
          setInfo(data);
        }
      } catch (err) {
        console.error("Error fetching info", err);
      }
    };

    fetchInfo();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/videos/planet.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="relative z-10 min-h-screen flex flex-col bg-opacity-40">
        <AnimatePresence>
          {info && (
            <>
              {/* HEADER */}
              <motion.div
                className="flex justify-between items-center p-4 text-white"
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              >
                <div className="flex items-center">
                  <motion.img
                    alt="logo"
                    src={logo}
                    className="w-[30px] h-[30px] rounded-full mr-2 border bg-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.h3
                    className="font-bold font-sans"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                  >
                    {info.name}
                  </motion.h3>
                </div>

                <div className="flex gap-3 text-[20px]">
                  <a
                    href="https://x.com/X"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500 transition-colors"
                  >
                    <BsTwitterX />
                  </a>

                  <a
                    href="https://t.me/TG"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sky-500 transition-colors"
                  >
                    <PiTelegramLogoLight />
                  </a>
                </div>
              </motion.div>

              {/* MIDDLE SECTION */}
              <div className="flex-1 flex flex-col justify-center items-center text-center px-4">
                <motion.h1
                  className="text-[2.5em] font-semibold my-4 text-white"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {info.title}
                </motion.h1>

                <motion.p
                  className="max-w-md mb-6 text-[13px] text-white"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  {info.paragraph}
                </motion.p>

                {/* Connect Wallet Button */}
                <motion.button
                  onClick={() => setShowModal(true)}
                  className="relative bg-[#4b48ff] text-white font-medium text-[17px] px-4 py-[0.35em] pl-5 h-[2.8em] rounded-[0.9em] flex items-center overflow-hidden cursor-pointer shadow-[inset_0_0_1.6em_-0.6em_#714da6] group"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <span className="mr-10">Connect wallet</span>
                  <div className="absolute right-[0.3em] bg-white h-[2.2em] w-[2.2em] rounded-[0.7em] flex items-center justify-center transition-all duration-300 group-hover:w-[calc(100%-0.6em)] shadow-[0.1em_0.1em_0.6em_0.2em_#7b52b9] active:scale-95">
                    →
                  </div>
                </motion.button>
              </div>
            </>
          )}
        </AnimatePresence>

        {/* Modals */}
        {showModal && (
          <PopModal
            onClose={() => setShowModal(false)}
            onError={() => {
              setShowModal(false);
              setShowError(true);
            }}
          />
        )}
        {showError && <ErrorModal onClose={() => setShowError(false)} />}
      </div>
    </div>
  );
};

export default Homepage;
