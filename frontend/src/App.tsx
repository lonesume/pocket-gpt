import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { GetGPTResponse, GetUserName } from "../wailsjs/go/main/App";
function App() {
  const [resultText, setResultText] = useState("");
  const [query, setQuery] = useState("");
  const [userName, setUserName] = useState("dear");
  const [isGptResponseLoading, setIsGptResponseLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const updateQuery = (e: any) => setQuery(e.target.value);

  const getGPTResponse = useCallback(async () => {
    if (!query) {
      setResultText(
        "Query cannot be empty, please enter something in the search bar"
      );
      return;
    }

    if (isGptResponseLoading || isTyping) {
      return;
    }

    try {
      setIsGptResponseLoading(true);
      const gptResponse = await GetGPTResponse(query);
      setIsGptResponseLoading(false);

      typeResponseGradually(gptResponse);
    } catch (e) {
      setResultText(`Error getting GPT response: ${e}`);
    }
  }, [query, isTyping, isGptResponseLoading]);

  const typeResponseGradually = (message: string) => {
    setResultText(""); // Clear any previous text
    setIsTyping(true);
    let index = 0;
    const speed = 50;

    const typeChar = () => {
      if (index < message.length) {
        setResultText((prev) => prev + message.charAt(index));
        index++;
        setTimeout(typeChar, speed);
      } else {
        setIsTyping(false);
      }
    };

    typeChar();
  };

  // Handle keyboard events
  const handleInputEvent = useCallback(
    async (event: KeyboardEvent) => {
      const key = event.key;

      switch (key) {
        case "Enter":
          if (isGptResponseLoading || isTyping) {
            return;
          }
          try {
            await getGPTResponse();
            return;
          } catch (e) {
            setResultText(`Unable to get chatGPT response: ${e}`);
          }
        case "Escape":
          console.log("closing");
          return;
      }
    },
    [query, isGptResponseLoading, isTyping, getGPTResponse]
  );

  // Fetch username on component mount
  useEffect(() => {
    const fetchUserName = async () => {
      let name;
      try {
        name = await GetUserName();
      } catch (e) {
        setUserName("dear");
      }

      if (!name) {
        console.error("User name not found");
        setUserName("dear");
      } else {
        setUserName(name);
      }
    };
    fetchUserName();
  }, []);

  useEffect(() => {
    document.addEventListener("keypress", handleInputEvent);
    return () => {
      document.removeEventListener("keypress", handleInputEvent);
    };
  }, [handleInputEvent]);

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
        <button
          className="btn"
          onClick={getGPTResponse}
          disabled={isGptResponseLoading || isTyping}
        >
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
