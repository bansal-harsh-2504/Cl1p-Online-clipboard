import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Clipboard = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClipboard = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/clipboard/${id}`
        );
        setContent(response.data.content);
        setExpiresAt(response.data.expiresAt);
      } catch (err) {
        setError("Clipboard not found or expired.");
      }
    };

    fetchClipboard();
  }, [id]);

  const getTimeRemaining = () => {
    const expiry = new Date(expiresAt).getTime();
    const now = new Date().getTime();
    const seconds = Math.floor((expiry - now) / 1000);
    if (seconds <= 0) return "Expired";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s remaining`;
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-2">Clipboard Content</h2>
          <pre className="bg-gray-100 p-3 rounded whitespace-pre-wrap">
            {content}
          </pre>
          {expiresAt && (
            <p className="text-sm text-gray-500 mt-2">{getTimeRemaining()}</p>
          )}
        </>
      )}
    </div>
  );
};

export default Clipboard;
