import { useLocation, useNavigate } from "react-router-dom";
import "../ShopInfo/ShopInfo.css"

//1
import axios from "axios";
import { useEffect, useState } from "react";
//1

function ShopDetails() {

  const apiKey = "AIzaSyANgRP2HP-MNEp1ZYL-1UlctCrR45VJnrA";
 
  const location = useLocation();
  const navigate = useNavigate();
  const shop = location.state?.shop;
 //1
  const [items,setItems] = useState([]);
  

//1
  if (!shop) {
   
    return (
      <div>
        <h2>No shop data found.</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  const url = "http://localhost:4000";


  //1
  useEffect(()=>{
    axios.get(`http://localhost:4000/api/item/get-items/${shop._id}`)
    .then((res)=>{
      setItems(res.data);
    }).catch((err)=>{
      console.log("Error fetching shop items:",err);
    })
  },[shop]);
  //1

   const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(shop.address)}`;


  return (
    <div>

    
  <div className="shop-details">
  <div className="shop-container">
    <div className="shop-image-wrapper">
      <img src={`${url}/images/${shop.image}`} alt={shop.name} className="shop-image" />
    </div>
    <div className="shop-info">
      <h2 className="shop-name">{shop.name}</h2>
      <p><strong>📞</strong> {shop.phoneNumber}</p>
      <p><strong>📍</strong> {shop.address}</p>
      <p><strong>🛒</strong> {shop.category}</p>
      <a href={`https://wa.me/${shop.phoneNumber}`} target="_blank" rel="noopener noreferrer">
        <button className="whatsapp-button">Message on WhatsApp</button>
      </a>
    </div>
  </div>
</div>

   
    <div>
      <h3 className="shopItemsheading" >Items in this shop :</h3>
      <div className="Shop" >
        {
          items.length>0 ? (items.map((item)=>(
            <div className="ShopItemsList" key={item._id} >
              <img className="imgItem" src={`${url}/uploads/${item.image}`} width={200}/>
              <h4>{item.name}</h4>
              <p>Price: ₹{item.price}</p>
              <p>Description: {item.description}</p>
              <p>Category: {item.category}</p>
              </div>
          ))) :(<p>No items available for this shop.</p>)
        }
      </div>
       <div className="mapContainer">
        <iframe
        width="800"
        height="400"
        frameBorder="0"
        style={{ borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}
        src={mapSrc}
        allowFullScreen
        loading="lazy"
        title="Google Map"
      ></iframe>
    </div>
    </div>
    </div>
  );
}

export default ShopDetails;