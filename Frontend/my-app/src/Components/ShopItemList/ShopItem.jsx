import { useEffect, useState } from "react";
import axios from "axios";
import "./ShopItem.css";

function ShopItem() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedShop = localStorage.getItem("ownerShop");
    if (storedShop) {
      const shop = JSON.parse(storedShop);
      fetchItems(shop._id); 
    }
  }, []);

  const fetchItems = async (shopId) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/item/get-items/${shopId}`);
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  return (
    <div className="item-list">
      {items.length > 0 ? (
        items.map((item) => (
          <div key={item._id} className="item-card">
            <img
              className="itemImg"
              src={`http://localhost:4000/uploads/${item.image}`}
              alt={item.name}
            />
            <h3>{item.name}</h3>
            <p>Price: ₹{item.price}</p>
            <p>Description: {item.description}</p>
            <p>Category: {item.category}</p>
          </div>
        ))
      ) : (
        <p>No items found.</p>
      )}
    </div>
  );
}

export default ShopItem;
