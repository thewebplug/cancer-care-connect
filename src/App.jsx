import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";


function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="*" element={<Test />} /> */}
    </Routes>
  </Router>
  </div>
  );
}

export default App;
