import {Route, Routes, useNavigate } from "react-router-dom";
import Home from './components/Home/Home.jsx';
import Movies from './components/Movies/Movies';
import People from "./components/People/People.jsx";
import Navbar from './components/Navbar/Navbar';
import Register from './components/Register/Register.jsx';
import ItemsDetails from "./components/Details/ItemsDetails.jsx";
import Login from "./components/login/Login.jsx";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import Protect from "./components/ProtectRoutes/Protect.jsx";
import Notfound from "./components/ErrorPage/Notfound.jsx";

function App() {
  const navigate = useNavigate();
  const [loginData, setUserData] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      const decodedToken = jwtDecode(userToken);
      setUserData(decodedToken);
    }
  }, []); 

  function handleLogout() {
    localStorage.removeItem("token");
    setUserData(null);
    navigate("/");
  }
  return (
    <div className="App">
      <Navbar userData={loginData} logout={handleLogout} />
      <Routes>
        <Route
          path="/home"
          element={
            <Protect>
              <Home />
            </Protect>
          }
        />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="details/:id/:type" element={<ItemsDetails />} />
        <Route path="people" element={<People />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
