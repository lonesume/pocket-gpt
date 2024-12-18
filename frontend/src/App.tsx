import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { GetGPTResponse, GetUserName } from "../wailsjs/go/main/App";
function App() {
  const [resultText, setResultText] = useState("");
  const [name, setName] = useState("Brian");
  const updateName = (e: any) => setName(e.target.value);

  const nameOfUser = useMemo(async () => {
    const [userName, error] = await GetUserName();

    if (error) {
      throw new Error("Error fetching user name");
    }

    return userName;
  }, []);

  function getGPTResponse() {
    GetGPTResponse(name).then(typeResponseGradually);
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

  useEffect(() => {
    console.log("Frontend debugging is working!");
  }, []);

  return (
    <div id="App">
      <div id="input" className="input-box">
        <input
          id="name"
          className="w-10/12 text-black"
          onChange={updateName}
          autoComplete="off"
          name="input"
          type="text"
          placeholder={`How can I help today, ${name}?`}
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
