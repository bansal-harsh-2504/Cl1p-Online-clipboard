import { FormEvent, useState } from "react";
import axios from "axios";

function generateRandomId(length = 5) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

function Home() {
  const [content, setContent] = useState("");
  const [shareableLink, setShareableLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const customId = generateRandomId();
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/clipboard`, {
        customId,
        content,
      });
      setShareableLink(`${window.location.origin}/clipboard/${customId}`);
    } catch (err) {
      setError("Failed to create clipboard. Please try again.");
    }
    setIsLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareableLink);
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Enter clipboard content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-2 rounded"
        >
          {isLoading ? "Creating..." : "Create Clipboard"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {shareableLink && (
        <div className="mt-4">
          <p>Shareable Link:</p>
          <div className="flex">
            <input
              readOnly
              value={shareableLink}
              className="flex-1 border p-2 rounded-l"
            />
            <button
              onClick={copyToClipboard}
              className="bg-gray-200 px-3 rounded-r"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
