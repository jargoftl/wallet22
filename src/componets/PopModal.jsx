import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "Initializing connection...",
  "Establishing secure channel...",
  "Verifying wallet compatibility...",
  "Connecting to blockchain...",
  "Authenticating wallet...",
  "Finalizing connection...",
  "Connection established!",
];

const PopModal = ({ onClose, onError }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    let currentProgress = 0;
    let index = 0;

    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 15) + 5; // +5 to +20
      currentProgress = Math.min(currentProgress + increment, 100);

      setProgress(currentProgress);

      if (
        index < messages.length - 1 &&
        currentProgress >= (100 / (messages.length - 1)) * (index + 1)
      ) {
        index++;
        setMessageIndex(index);
      }

      if (currentProgress === 100) {
        clearInterval(interval);
        setTimeout(() => {
          onError();
        }, 3000);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [onError]);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-end justify-center z-50">
      <AnimatePresence>
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: -10 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg text-center"
        >
          <h3 className="font-bold text-lg mb-2">Connecting Wallet</h3>

          <p className="mb-4 text-sm text-gray-500 font-light leading-relaxed tracking-wide">
            Please wait while we establish a secure connection...
          </p>

          {/* Progress Bar */}
          <div className="w-full h-3 rounded-lg bg-gray-200 overflow-hidden shadow-inner">
            <div
              className="h-full rounded-lg bg-gradient-to-r from-slate-900 via-blue-900 to-slate-600 animate-[gradientShift_4s_linear_infinite]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Percentage & Status */}
          <div className="text-center mt-4">
            <h2 className="text-xl font-bold">{progress}%</h2>
            <p className="mt-2 text-sm text-gray-600 font-medium italic">
              {messages[messageIndex]}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Keyframes for gradient animation */}
      <style jsx>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default PopModal;
