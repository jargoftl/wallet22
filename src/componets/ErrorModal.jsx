import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ErrorModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Retry handler
  const handleRetry = () => {
    setLoading(true); // start spinner
    setTimeout(() => {
      navigate("/Connect"); // redirect after 10s
    }, 10000);
  };

  // Manual connect handler
  const handleManualConnect = () => {
    navigate("/Connect");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-[#00000099] flex items-start justify-center z-50">
        <motion.div
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: "50px", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-[oklch(12.9%_0.042_264.695)] border border-red-400 text-red-700 px-6 py-4 rounded-xl shadow-lg max-w-md w-full mx-2"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white text-2xl font-semibold">
              Connect Wallet
            </h2>
            <button onClick={onClose} className="text-white hover:text-red-400">
              <IoMdClose size={24} />
            </button>
          </div>

          {/* ERROR MESSAGE */}
          <div className="mb-6">
            <div className="px-3 py-3 rounded-lg bg-red-100 border border-red-300">
              <p className="text-red-700 text-sm">
                Wallet not detected due to outdated node API. Please verify you
                have the selected wallet installed.
              </p>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handleRetry}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Retry"
              )}
            </button>

            <button
              onClick={handleManualConnect}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition"
            >
              Connect Manually
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ErrorModal;
