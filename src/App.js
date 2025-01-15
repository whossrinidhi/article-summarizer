import axios from "axios";
import { useState, useRef } from "react";

function App() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const url = useRef(null);
  const fetchSummary = async () => {
    const article = url.current?.value;
    if (!article) {
      alert("provide a url");
    }
    setLoading(true);
    const options = {
      method: "GET",
      url: "https://article-extractor-and-summarizer.p.rapidapi.com/summarize",
      params: {
        url: article,
        lang: "en",
        engine: "2",
      },
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_API_KEY,
        "x-rapidapi-host": "article-extractor-and-summarizer.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setSummary(response.data.summary);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-violet-400 flex items-center justify-center">
      <div className="text-center w-full max-w-lg">
        <h1 className="text-2xl font-bold text-white sm:truncate sm:text-3xl sm:tracking-tight mb-6">
          Article Summarizer
        </h1>

        <div className="flex items-center space-x-2 rounded-md bg-white pl-3 outline outline-1 outline-gray-300 focus-within:outline-2 focus-within:outline-indigo-600 p-2">
          <input
            type="text"
            name="url"
            ref={url}
            className="min-w-0 flex-grow py-2 px-3 text-base text-gray-900 focus:outline-none sm:text-sm"
            placeholder="Enter article URL"
          />
          <button
            onClick={fetchSummary}
            disabled={loading}
            className="bg-violet-500 text-white py-2 px-4 rounded hover:bg-violet-600"
          >
            {loading ? "Loading..." : "Summarize"}
          </button>
        </div>
        {summary && (
          <div className="mt-6 text-left bg-gray-100 p-4 rounded-lg border border-gray-300">
            <h2 className="text-xl font-semibold text-violet-700 mb-2">
              Summary:
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {summary}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
