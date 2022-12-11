import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Frame } from "./layout/frame/frame";
import { ToastContainer, toast, Flip } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        transition={Flip}
        autoClose={2000}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Frame />}></Route>
          <Route path="/test" element={<div>test</div>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;