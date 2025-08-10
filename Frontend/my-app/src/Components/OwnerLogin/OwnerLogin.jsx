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
  const [name] = useState("Mangilal Sweets Store");
  const [number] = useState("918074952430");
  const [psWord] = useState("85559283"); 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/shop/ownerLogin`, {
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

   const handleCopyname = () => {
    navigator.clipboard.writeText(name)
  };

  const handleNumber = () =>{
   navigator.clipboard.writeText(number)
  };

  const handlePassword = () =>{
   navigator.clipboard.writeText(psWord)
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

        <p>To Test It Copy Past This Credentials <br></br>Shop Name :<span className="spanStyle"> Mangilal Sweets Store</span><button className="BtnStyle" onClick={handleCopyname} >Copy</button> <br></br>Phone Number : <span  className="spanStyle">918074952430</span> <button onClick={handleNumber} className="BtnStyle">Copy</button><br></br>Password : <span  className="spanStyle">85559283</span><button onClick={handlePassword} className="BtnStyle">Copy</button> </p>
      </form>
    </div>
  );
}

export default OwnerLogin;
