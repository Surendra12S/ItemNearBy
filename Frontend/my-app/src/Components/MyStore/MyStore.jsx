import React, { useEffect, useState } from "react";
import "./MyStore.css";


function MyStore() {

  const [shop, setShop] = useState(null);

 
  useEffect(() => {
   const storedShop = localStorage.getItem("ownerShop");
    if (storedShop) {
        const parsedShop = JSON.parse(storedShop);
      setShop(parsedShop);
    }
  }, []);

  if (!shop) return <p>Loading...</p>

  return (
    
    <div className="my-store-container">
      
      {shop.image ? (
        <img
          src={`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/images/${shop.image}`}
          alt="Store"
          width={150}
        />
      ) : (
        <p>No store image available.</p>
      )}
      <h2> {shop.name}</h2>
      <p>{shop.phoneNumber}</p>
      <p> {shop.address}</p>
      <p> {shop.category}</p>
    </div>

  );
}

export default MyStore