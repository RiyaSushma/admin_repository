import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser, logoutUser } from "./Store/authSlice";
import "./App.css";
import { Footer, Header, Sidebar } from "./Components/index.js";
import { List } from "@phosphor-icons/react";
import Logo from "./Components/Logo/Logo.jsx";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 756);

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 756);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(authenticateUser(user));
    } else {
      dispatch(logoutUser());
    }
    setLoading(false);
  }, [dispatch, user]);

  return (
    <div className="main-container">
      <div className="header-main-container">
        <div className="btn-toggle-container">
          <button className="toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
            <List size={24} />
          </button>
        </div>
        <Header />
      </div>
      <main className="content-container">
        <div className={`sidebar-container ${isCollapsed ? "collapsed" : ""}`}>
          <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        </div>
        <div className="main-content-container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
