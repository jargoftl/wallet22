import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom"; // 👈 Required for navigation

const FirstModal = ({ show, onClose }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // 👈 Navigation hook

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 10000); // 15 seconds

      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show) return null;

  // 👇 Handles Retry Click
  const handleRetry = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/connect");
    }, 3000); // Show spinner for 3 more seconds before navigating
  };

  // 👇 Handles Connect Manually
  const handleManualConnect = () => {
    navigate("/connect");
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full z-10 flex justify-center items-start pt-2 text-white">
      <div className="bg-[oklch(25.7%_0.09_281.288)] rounded-md shadow-md p-6 max-h-[80vh] overflow-y-auto w-[96vw] max-w-2xl relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Connect Wallet</h2>
          <button onClick={onClose} className="font-bold hover:text-red-700">
            <IoCloseOutline />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-22">
            {/*   <div className="w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin"></div> */}

            <div class="loader"></div>
          </div>
        ) : (
          <>
            <div className="mb-4 text-center">
              <p className="text-xs">
                Wallet not detected due to outdated node API. Please verify you
                have the selected wallet installed.
              </p>
            </div>

            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={handleRetry}
                className="bg-blue-200 hover:bg-blue-400 text-black font-bold py-3 px-6 rounded-full shadow-lg shadow-neutral-950 hover:text-white transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce"
              >
                Retry
              </button>

              <button
                onClick={handleManualConnect}
                className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce"
              >
                Connect Manually
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FirstModal;
