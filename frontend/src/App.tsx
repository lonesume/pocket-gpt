import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { GetGPTResponse, GetUserName } from "../wailsjs/go/main/App";
function App() {
  const [resultText, setResultText] = useState("");
  const [query, setQuery] = useState("");
  const [userName, setUserName] = useState("dear");

  const updateQuery = (e: any) => setQuery(e.target.value);

  // Fetch username on component mount
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

  // Handle keyboard events
  const handleInputEvent = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key;
      console.log(event);

      switch (key) {
        case "Enter":
          getGPTResponse();
          return;
        case "Escape":
          console.log("closing");
          return;
      }
    },
    [query]
  );

  useEffect(() => {
    document.addEventListener("keypress", handleInputEvent);
    return () => {
      document.removeEventListener("keypress", handleInputEvent);
    };
  }, [handleInputEvent]);

  const getGPTResponse = useCallback(() => {
    if (!query) {
      alert("Query cannot be empty");
      return;
    }
    GetGPTResponse(query).then(typeResponseGradually);
  }, [query]);

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
