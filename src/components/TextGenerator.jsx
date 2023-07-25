import React, { useState } from 'react';
import axios from 'axios';

const TextGenerator = () => {
  const [inputText, setInputText] = useState("");
  const [generatedText, setGeneratedText] = useState("");

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleTextGeneration = async () => {
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/text/generation",
      headers: {
        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMmUzMjIwNjAtYzZhNy00YThkLTgwMWEtYjFiYmVhNmI5MzA3IiwidHlwZSI6ImFwaV90b2tlbiJ9.OU-gaK1PvHflethqdlEq-k4pyj3deWoFLcxzkbzi0OM",
      },
      data: {
        providers: "cohere",
        text: inputText,
        temperature: 0.2,
        max_tokens: 250,
      },
    };

    try {
      const response = await axios.request(options);
      if (response.data.cohere.status === "success") {
        setGeneratedText(response.data.cohere.generated_text);
      } else {
        console.error("An error occurred while generating text");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="text" value={inputText} onChange={handleInputChange} />
      <button onClick={handleTextGeneration}>Generate Text</button>
      {generatedText && <p>{`Generated Text: ${generatedText}`}</p>}
    </div>
  );
};

export default TextGenerator;