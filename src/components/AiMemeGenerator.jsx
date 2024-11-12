import { useState } from "react";
import axios from "axios";

const AiMemeGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiKey = import.meta.env.VITE_API_KEY; // Replace with your API key

    const payload = {
      prompt: prompt,
      output_format: "jpeg",
    };

    setLoading(true);
    setImageUrl(null); // Reset image
    setDownloadUrl(null); // Reset download link

    try {
      // Prepare payload as FormData
      const formData = new FormData();
      for (const key in payload) {
        formData.append(key, payload[key]);
      }

      const response = await axios.post(
        "https://api.stability.ai/v2beta/stable-image/generate/sd3",
        formData,
        {
          responseType: "arraybuffer",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            Accept: "image/*",
          },
        }
      );

      if (response.status === 200) {
        const imageBlob = new Blob([response.data], {
          type: "image/jpeg",
        });
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageUrl(imageUrl);
        setDownloadUrl(imageUrl); // Set download URL
      } else {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to generate image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Make The Memes 😆 with AI</h1>
        <p className="subtitle">Transform your imagination into memes!</p>
      </header>
      <main>
        <div className="controls">
          <form onSubmit={handleSubmit}>
            <div className="text-input">
              <label htmlFor="prompt">Enter Meme Prompt:</label>
              <textarea
                id="prompt"
                name="prompt"
                rows="6"
                placeholder="Enter your prompt here..."
                value={prompt}
                onChange={handlePromptChange}
              />
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
            >
              <button type="submit">Generate Meme</button>
              <a href={downloadUrl} download={"meme.jpeg"} style={{
                width:"100%",
                display:"flex",
                justifyContent:"center",
                padding:"1rem",
              }}>
                Download Meme
              </a>
            </div>
          </form>
        </div>
        <div className="canvas-container">
          {loading && <div className="loading">Generating your meme...</div>}
          {imageUrl && (
            <div id="imageContainer">
              <img
                src={imageUrl}
                alt="Generated Meme"
                style={{ width: "500px" }}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AiMemeGenerator;
