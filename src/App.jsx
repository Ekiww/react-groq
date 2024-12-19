import { useState } from "react";
import { requestToGroqAI } from "./utils/groq";
import { Light as SyntaxHighlight } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import './App.css';

function App() {
  const [data, setData] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    if (inputValue.trim() === "") {
      setError("Input tidak boleh kosong!"); 
      return; 
    }
    setError(""); 
    const ai = await requestToGroqAI(inputValue);
    setData(ai);
    setInputValue(""); 
  };

  return (
    <main className="flex flex-col min-h-screen justify-center items-center max-w-xl w-full mx-auto p-4 bg-gradient-to-r from-blue-500 to-purple-500 overflow-x-auto w-full mt-4">
      <h1 className="text-4xl text-white text-center font-bold mb-6">HIOS AI</h1>
      <form className="flex flex-col gap-4 py-4 w-full bg-white rounded-lg shadow-lg p-6" onSubmit={handleSubmit}>
        <input
          placeholder='Mau nanya apa nich?'
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} 
          type="text"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white px-4 py-2 font-bold rounded-md hover:bg-indigo-600 transition duration-200 transform hover:scale-105">KIRIM</button>
      </form>

      <div className="max-w-xl overflow-x-auto w-full mt-4" > 
        {data ? (
          <div className="code-block">
            <SyntaxHighlight language="swift" style={darcula}>{data}</SyntaxHighlight>
          </div>
          
        ) : null}
      </div>
    </main>
  );
}

export default App;