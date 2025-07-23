import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FirstModal from "./FirstModal";

const Homepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  /* TITILE UPDATE */
  /* Title update */

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const response = await fetch("https://lol-ep0y.onrender.com/title");
        const data = await response.json();
        setTitle(data.title);
      } catch (error) {
        console.error("Failed to fetch title:", error);
        setTitle("Hyper Tech");
      }
    };

    fetchTitle(); // initial fetch
    const interval = setInterval(fetchTitle, 5000); // refetch every 5 seconds

    return () => clearInterval(interval); // clean up
  }, []);

  useEffect(() => {
    document.title = `Welcome ${title}`;
  }, [title]);
  return (
    <div
      className="
        flex flex-col items-center justify-center text-center px-4 min-h-screen text-white
        bg-animated-gradient bg-[length:400%_400%] animate-gradient-bg  z-0 relative bg-red-500
        font-sans overflow-hidden
      "
    >
      <FirstModal show={isModalOpen} onClose={closeModal} />

      {/* HYPER TECH SOLUTION - comes from the top */}
      <motion.h1
        className="text-xl font-extrabold mb-2 tracking-widest drop-shadow-lg"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {title}
      </motion.h1>

      {/* WELCOME - fades in & grows */}
      <motion.h2
        className="text-5xl font-bold mb-2 tracking-tight drop-shadow-xl"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
      >
        Welcome
      </motion.h2>

      {/* Let's start by connecting your wallet - comes from right */}
      <motion.p
        className="mb-6 text-lg font-medium max-w-md drop-shadow-md"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 1, ease: "easeOut" }}
      >
        Let's start by connecting your wallet
      </motion.p>

      {/* Button - appears normally with slight fade */}
      <motion.button
        onClick={openModal}
        className="
          px-6 py-2 rounded text-white
          bg-animated-gradient bg-[length:400%_400%] animate-gradient-bg
          hover:brightness-110 transition cursor-pointer drop-shadow-lg
          font-semibold tracking-wide
        "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.8 }}
      >
        ENTER APP
      </motion.button>

      {/* Next-Gen V4 AMM - comes from left */}
      <motion.p
        className="mt-6 max-w-md font-light italic drop-shadow-md"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 3.5, duration: 1, ease: "easeOut" }}
      >
        Next-Gen V4 AMM unlocking hyper-efficient liquidity on Hyper EVM.
      </motion.p>
    </div>
  );
};

export default Homepage;
