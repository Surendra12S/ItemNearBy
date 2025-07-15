import { useState } from "react";
import "./OwnerLogin.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

function OwnerLogin() {
  const [shopName, setShopName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/api/shop/ownerLogin", {
        name: shopName.trim(),
        phoneNumber: phoneNumber.trim(),
        password: password.trim(),
      });

      localStorage.setItem("ownerShop", JSON.stringify(res.data));
      toast.success("Login successful!");
      navigate("/myStore");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="owenerDeteilsContainer">
      <form className="ownerForm" onSubmit={handleSubmit}>
        <div className="CrossIconContainer" >
           <h2 className="formTitle">Shop Owner Login</h2>
           <Link to={"/"} >
            <RxCross2 className="crossIcon" />
           </Link>
          
          
        </div>
          
       
   

        <div className="formGroup">
          <label>Shop Name:</label>
          <input
            type="text"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            placeholder="Enter your shop name"
            required
          />
        </div>

        <div className="formGroup">
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className="formGroup passwordGroup">
          <label>Password:</label>
          <div className="passwordWrapper">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <span onClick={() => setShowPassword(!showPassword)} className="eyeIcon">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <button className="SubmitBtn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default OwnerLogin;
