import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Frame } from "./layout/frame/frame";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Frame />}></Route>
          <Route path="/test" element={<div>test</div>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
