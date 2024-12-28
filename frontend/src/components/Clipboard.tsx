import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Clipboard() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClipboard = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/clipboard/${id}`
        );
        setContent(response.data.content);
      } catch (err: unknown) {
        setError("Clipboard not found or has expired.");
      }
      setIsLoading(false);
    };

    fetchClipboard();
  }, [id]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Clipboard Content
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <p className="text-sm text-gray-900 whitespace-pre-wrap">
              {content}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
}

export default Clipboard;
