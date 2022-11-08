import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/header/header";
import { PostCard } from "./components/post_card/post_card";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <PostCard />
              </>
            }
          ></Route>
          <Route path="/test" element={<div>test</div>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
