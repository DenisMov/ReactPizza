import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Card from "./pages/Card";

import "./scss/app.scss";

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Header />
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
