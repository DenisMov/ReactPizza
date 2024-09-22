import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import MainLayout from "./layout/MainLayout";
import "./scss/app.scss";

const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart" */ "./pages/Cart")
);
const FullPizza = React.lazy(
  () => import(/* webpackChunkName: "FullPizza" */ "./pages/FullPizza")
);
const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound")
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Відбувається загрузка...</div>}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pizza/:id" element={<FullPizza />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Header from "./components/Header";
// import Home from "./pages/Home";
// import Card from "./pages/Cart";

// import "./scss/app.scss";
// import FullPizza from "./pages/FullPizza";

// function App() {
//   return (
//     <div className="wrapper">
//       <BrowserRouter>
//         <Header />
//         <div className="content">
//           <Routes>
//             <Route index element={<Home />} />
//             <Route path="/card" element={<Card />} />
//             <Route path="/pizza/:id" element={<FullPizza />} />
//           </Routes>
//         </div>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
