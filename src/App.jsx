import AiMemeGenerator from "./components/AiMemeGenerator";
import MemeGenerator from "./components/MemeGenerator";

function App() {
  return (
    <>
      <AiMemeGenerator />
      <div style={{ marginTop: "100px" }}>
        <MemeGenerator />
      </div>
    </>
  );
}

export default App;
