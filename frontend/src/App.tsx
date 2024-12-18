import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import { GetGPTResponse, GetUserName } from "../wailsjs/go/main/App";
function App() {
  const [resultText, setResultText] = useState("");
  const [query, setQuery] = useState("Brian");
  const [userName, setUserName] = useState("dear");
  const updateQuery = (e: any) => setQuery(e.target.value);

  useEffect(() => {
    async function fetchUserName() {
      const name = await GetUserName();
      if (!name) {
        console.error("User name not found");
        setUserName("dear");
      } else {
        setUserName(name);
      }
    }
    fetchUserName();
  }, []);

  function getGPTResponse() {
    GetGPTResponse(query).then(typeResponseGradually);
  }

  function typeResponseGradually(message: string) {
    setResultText(""); // Clear any previous text
    let index = -1;
    const speed = 50; // Speed of typing effect in milliseconds

    function typeChar() {
      if (index < message.length) {
        setResultText((prev) => {
          return prev + message.charAt(index);
        });
        index++;
        setTimeout(typeChar, speed); // Recursively call to add the next character
      }
    }

    typeChar(); // Start the typing effect
  }

  return (
    <div id="App">
      <div id="input" className="input-box">
        <input
          id="name"
          className="w-10/12 text-black"
          onChange={updateQuery}
          autoComplete="off"
          name="input"
          type="text"
          placeholder={`How can I help today, ${userName}?`}
        />
        <button className="btn" onClick={getGPTResponse}>
          Search
        </button>
        <div id="result" className="result">
          {resultText}
        </div>
      </div>
    </div>
  );
}

export default App;
