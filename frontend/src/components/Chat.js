import React, { useState } from 'react';

function ChatPage() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/gpt-3.5", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: inputText }),
    });
    const data = await response.json();
    setOutputText(data.reply);
    setInputText("");
  };

  return (
    <div>
      <h1>Chat App</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Input:
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {outputText && (
        <div>
          <p>Output: {outputText}</p>
          <button onClick={() => setOutputText("")}>Ask another question</button>
        </div>
      )}
    </div>
  );
}

export default ChatPage;

