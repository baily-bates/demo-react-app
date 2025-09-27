import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Detail from "./pages/Detail";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div>
        {/* Nav Bar */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/details">Detail</Link>
            </li>
          </ul>
        </nav>

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/details/:id" element={<Detail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
