import { useState, useRef, useEffect } from "react";
import { useImageStore } from "../hooks/store/useImageStore";

const MemeGenerator = () => {
  const canvasRef = useRef(null);
  const [topText, setTopText] = useState("When the code works");
  const [bottomText, setBottomText] = useState("But you don't know why");
  const [fontSize, setFontSize] = useState(40);
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [currentImage, setCurrentImage] = useState(null);

  const { getImage } = useImageStore();

  useEffect(() => {
    const defaultImage = new Image();
    defaultImage.src =
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=500&q=80";
    defaultImage.onload = () => {
      setCurrentImage(defaultImage);
    };
  }, []);

  useEffect(() => {
    if (currentImage) drawMeme();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topText, bottomText, fontSize, textColor, currentImage]);

  const handleImageUpload = (event) => {
    const { imageBlob, imageUrl } = getImage();
    const file = event.target.files[0];
    if (imageBlob && imageUrl) {
      const img = new Image();
      img.onload = () => {
        setCurrentImage(img);
      };
      img.src = imageBlob;
    } else if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setCurrentImage(img);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const drawMeme = () => {
    if (!currentImage) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = currentImage.width;
    canvas.height = currentImage.height;

    ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = textColor;
    ctx.strokeStyle = "black";
    ctx.lineWidth = fontSize / 15;
    ctx.font = `bold ${fontSize}px Impact`;
    ctx.textAlign = "center";

    ctx.textBaseline = "top";
    drawText(ctx, topText, canvas.width / 2, fontSize / 2);

    ctx.textBaseline = "bottom";
    drawText(ctx, bottomText, canvas.width / 2, canvas.height - fontSize / 2);
  };

  const drawText = (ctx, text, x, y) => {
    const words = text.split(" ");
    let line = "";
    const lineHeight = fontSize * 1.2;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const testWidth = ctx.measureText(testLine).width;
      if (testWidth > canvasRef.current.width - 40 && i > 0) {
        ctx.strokeText(line.trim(), x, y);
        ctx.fillText(line.trim(), x, y);
        line = words[i] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.strokeText(line.trim(), x, y);
    ctx.fillText(line.trim(), x, y);
  };

  const downloadMeme = () => {
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  const generateJoke = async () => {
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      const joke = await response.json();
      setTopText(joke.setup);
      setBottomText(joke.punchline);
    } catch (error) {
      console.error("Error fetching joke:", error);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>MemeIt 😆</h1>
        <p className="subtitle">Transform your images into memes!</p>
      </header>

      <main>
        <div className="controls">
          <div
            className="upload-zone"
            onClick={() => document.getElementById("imageInput").click()}
          >
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            <p>Click to upload image</p>
            <small>or drag and drop</small>
          </div>

          <div className="text-input">
            <label htmlFor="topText">Top Text</label>
            <textarea
              id="topText"
              rows="2"
              placeholder="Enter top text"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
            />
          </div>

          <div className="text-input">
            <label htmlFor="bottomText">Bottom Text</label>
            <textarea
              id="bottomText"
              rows="2"
              placeholder="Enter bottom text"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
            />
          </div>

          <div className="text-input">
            <label htmlFor="fontSize">Font Size</label>
            <input
              type="range"
              id="fontSize"
              min="20"
              max="100"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
            />
          </div>

          <div className="text-input">
            <label>Text Color</label>
            <input
              type="color"
              id="textColor"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />
          </div>

          <button onClick={generateJoke}>Generate AI Joke</button>
          <button onClick={downloadMeme}>Download Meme</button>
        </div>

        <div className="canvas-container">
          <canvas ref={canvasRef}>
            Your browser doesn&apos;t support canvas.
          </canvas>
        </div>
      </main>
    </div>
  );
};
export default MemeGenerator;
