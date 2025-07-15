import { useState } from "react";
import axios from "axios";
import './AddItemForm.css';
import UploadImg from "../../assets/upload_area.png";
import { toast } from "react-toastify";

function AddItemForm() {
  const [itemData, setItemData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData({ ...itemData, [name]: value });
  };

  const handleImageChange = (e) => {
    setItemData({ ...itemData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {

  e.preventDefault();
 
  
  const shop = JSON.parse(localStorage.getItem("ownerShop"));
  const shopId = shop?._id;

  if (!shopId) {
    return toast.error("Shop not found. Please login again.");
  }

  const formData = new FormData();
  formData.append("name", itemData.name);
  formData.append("price", itemData.price);
  formData.append("description", itemData.description);
  formData.append("category", itemData.category);
  formData.append("image", itemData.image);
  formData.append("shopId", shopId);

  try {
    const response = await axios.post(
      "http://localhost:4000/api/item/add-item",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
        toast.success("Item added successfully!");

    if (response.status === 200) {
      setItemData({
        name: "",
        price: "",
        description: "",
        category: "",
        image: null,
      });
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong. Please try again.");
  }
};


  return (
    <form className="ItemContainer" onSubmit={handleSubmit}>
     <div>
  <p>Upload Image</p>
  <label htmlFor="image">
    <img
      src={itemData.image ? URL.createObjectURL(itemData.image) : UploadImg}
      alt="Preview"
    />
  </label>
  <input
    id="image"
    type="file"
    name="image"
    accept="image/*"
    onChange={handleImageChange}
  />
</div>

     
      <input
  name="name"
  placeholder="Item Name"
  onChange={handleChange}
/>
<input
  name="price"
  placeholder="Item Price (₹)"
  onChange={handleChange}
/>
<input
  name="description"
  placeholder="Short Description"
  onChange={handleChange}
/>
<input
  name="category"
  placeholder="Category"
  onChange={handleChange}
/>
      <button className="BtnSubmit" type="submit">Add Item</button>
    </form>
  );
}

export default AddItemForm;
