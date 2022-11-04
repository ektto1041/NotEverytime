import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Hi</div>}></Route>
          <Route path="/test" element={<div>test</div>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
