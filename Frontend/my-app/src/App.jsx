import Home from "./Components/Home/Home";
import NavBar from "./Components/NavBar/NavBar";
import {Routes,Route} from "react-router-dom"; 
import ShopInfo from "./Components/ShopInfo/ShopInfo";
import { useEffect, useState } from "react";
import LoginPopup from "./Components/LoginPopup/LoginPopup";
import AddStoreDetails from "./Components/AddStoreDetails/AddStoreDetails";
 import { ToastContainer} from 'react-toastify';
import OwnerLogin from "./Components/OwnerLogin/OwnerLogin";
import MyStore from "./Components/MyStore/MyStore";
import AddItemForm from "./Components/AddItemForm/AddItemForm";
import ShopItem from "./Components/ShopItemList/ShopItem";
import SearchResults from "./Components/SearchResults/SearchResults";
import Footer from "./Components/Footer/Footer";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || "");

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
    setUserRole(localStorage.getItem("userRole") || "");
  }, []);

  return (
    <>
      {showLogin && (
        <LoginPopup
          setShowLogin={setShowLogin}
          setIsLoggedIn={setIsLoggedIn}
          setUserRole={setUserRole}
        />
      )}

      <div className="main-content">
        <NavBar
          setShowLogin={setShowLogin}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          userRole={userRole}
        />
        <ToastContainer position="top-right" autoClose={3000} toastClassName="custom-toast" />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop/:id" element={<ShopInfo />} />
          <Route path="/addShop" element={<AddStoreDetails />} />
          <Route path="/ownerLogin" element={<OwnerLogin />} />
          <Route path="/myStore" element={<><div className="ToSetSideBySide"><MyStore /><AddItemForm /></div>,<ShopItem /></>} />
          <Route path="/shop-items" element={<ShopItem />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}
export default App;

