import "../NavBar/NavBar.css";
import Logo from '../../assets/logo.jpg';
import { FaLocationDot } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import logoutIcon from "../../assets/logout_icon.png";
import { useState } from "react";
import userIcon from "../../assets/user.png"


function NavBar({ setShowLogin, isLoggedIn, setIsLoggedIn, userRole }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setShowDropdown(false);
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/search?query=${searchTerm}`);
      setSearchTerm("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="NavBarConatiner">
      <Link to={"/"}>
        <img className="logoImage" src={Logo} alt="Logo" />
      </Link>

      <div className="locationSection">
        <h1 className="locationtext">Location</h1>
        <FaLocationDot className="locationIcon" />
      </div>

      <div className="inputContainer">
        <IoSearch
          className="serchIcon"
          style={{ cursor: "pointer" }}
          onClick={handleSearch}
        />
        <input
          className="inputElm"
          placeholder="Search store items(to test, copy and past existing items)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {!isLoggedIn ? (
        <button onClick={() => setShowLogin(true)} className="LoginElm">
          Login
        </button>
      ) : (
        <div>
          <img
            src={userIcon}
            onClick={() => setShowDropdown(!showDropdown)}
            className="profileIcon"
            alt="Profile"
          />
          {showDropdown && (
            <div className="dropdown">
              <button
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <img src={logoutIcon} alt="Logout" style={{ width: 20 }} /> Logout
              </button>
            </div>
          )}
        </div>
      )}

      {isLoggedIn && userRole === "owner" && (
        <Link to={"/addShop"}>
          <button className="addStoreBtn">Add Your Store</button>
        </Link>
      )}
    </nav>
  );
}

export default NavBar;
