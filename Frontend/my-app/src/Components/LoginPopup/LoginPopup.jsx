import { useState } from "react";
import "../LoginPopup/LoginPopup.css";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

function LoginPopup({ setShowLogin, setIsLoggedIn, setUserRole }) {
  const [currState, setCurrState] = useState("Login");
  const [token, setToken] = useState("");
  const [selectedRole, setSelectedRole] = useState(""); // "owner" or "customer"

  const url = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}`;


  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    if (!selectedRole) {
      alert("Please select whether you are an owner or a customer.");
      return;
    }

    let newUrl = url;
    newUrl += currState === "Login" ? "/api/user/login" : "/api/user/register";

    const response = await axios.post(newUrl, { ...data, role: selectedRole });

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userRole", selectedRole); // Save role in local storage
      setIsLoggedIn(true);
      setUserRole(selectedRole); // Update parent state
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <RxCross2 className="crossIcon" onClick={() => setShowLogin(false)} />
        </div>



        <div className="login-popup-input">
          {currState === "Login" ? null : (
            <input
              type="text"
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              placeholder="Your name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
          <div className="role-buttons">
            <button
              type="button"
              onClick={() => setSelectedRole("owner")}
              className={selectedRole === "owner" ? "active" : ""}
            >
              I'm the Owner
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole("customer")}
              className={selectedRole === "customer" ? "active" : ""}
            >
              I'm a Customer
            </button>
          </div>
          <button type="submit">
            {currState === "Sign Up" ? "Create account" : "Login"}
          </button>

          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy</p>
          </div>

          {currState === "Login" ? (
            <p>
              Create a new account?{" "}
              <span onClick={() => setCurrState("Sign Up")}>Click here</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default LoginPopup;
