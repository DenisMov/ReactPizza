import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";

import "./scss/app.scss";
import Card from "./components/Card";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <BrowserRouter>
        <div className="content">
          <Routes>
            <Route index element={<Home />} />
            <Route path="card" element={<Card />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
