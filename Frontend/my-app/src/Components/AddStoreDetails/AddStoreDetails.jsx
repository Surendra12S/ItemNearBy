import { useState } from "react";
import UploadImg from "../../assets/upload_area.png";
import "../AddStoreDetails/AddStoreDetails.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

function AddStoreDetails() {
   const url = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}`;
   const [image, setImage] = useState(null);
   const [data, setData] = useState({
      name: "",
      phoneNumber: "",
      address: "",
      category: "",
      password: ""
   });

   const onChangeHandler = (event) => {
      const { name, value } = event.target;
      setData(prev => ({ ...prev, [name]: value }));
   };

   const onSubmitHandler = async (event) => {
      event.preventDefault();

      if (!image) {
         toast.error("Please upload an image before submitting.");
         return;
      }

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("address", data.address);
      formData.append("category", data.category);
      formData.append("password", data.password);
      formData.append("image", image);

      try {
         const response = await axios.post(`${url}/api/shop/add`, formData, {
            headers: {
               "Content-Type": "multipart/form-data"
            }
         });

         if (response.data.success) {
            setData({
               name: "",
               phoneNumber: "",
               address: "",
               category: "",
               password: ""
            });
            setImage(null);
            toast.success(response.data.message);
         } else {
            toast.error(response.data.message);
         }
      } catch (error) {
         console.error("Error uploading:", error);
         toast.error("Something went wrong. Please try again.");
      }
   };

   return (
      <div className="FullContainer">
         <div className="newToclass">
            <h1>
               New to ItemNearBy? Fill the form below to add your store and
               start sharing your products.
            </h1>
         </div>

         <div className="addStoreDetailsContainer">
            <form className="flex-col" onSubmit={onSubmitHandler}>
               <div className="add-img-upload">
                  <div className="CrossIcon">
                     <p>Upload Image</p>
                     <Link to="/">
                        <RxCross2 className="icon" />
                     </Link>
                  </div>

                  <label htmlFor="image">
                     <img
                        src={image ? URL.createObjectURL(image) : UploadImg}
                        alt="Upload Preview"
                     />
                  </label>
                  <input
                     type="file"
                     id="image"
                     name="image" 
                     hidden
                     required
                     accept="image/*"
                     onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                           setImage(e.target.files[0]);
                        }
                     }}
                  />
               </div>

               <div className="add-store-name">
                  <p>Store Name</p>
                  <input
                     onChange={onChangeHandler}
                     value={data.name}
                     type="text"
                     name="name"
                     placeholder="Type here"
                     required
                  />
               </div>

               <div>
                  <p>Store Number</p>
                  <input
                     onChange={onChangeHandler}
                     value={data.phoneNumber}
                     type="text"
                     name="phoneNumber"
                     placeholder="Enter your number"
                     required
                  />
               </div>

               <div>
                  <p>Address</p>
                  <input
                     onChange={onChangeHandler}
                     value={data.address}
                     type="text"
                     name="address"
                     placeholder="Enter your address"
                     required
                  />
               </div>

               <div>
                  <p>Category</p>
                  <input
                     onChange={onChangeHandler}
                     value={data.category}
                     type="text"
                     name="category"
                     placeholder="Enter store category"
                     required
                  />
               </div>

               <div>
                  <p>Password</p>
                  <input
                     onChange={onChangeHandler}
                     value={data.password}
                     type="password"
                     name="password"
                     placeholder="Enter password"
                     required
                  />
               </div>

               <button className="submitBtn" type="submit">
                  Add
               </button>
            </form>

            
         </div>

         <div className="AlreadyClass">
            <h1>
               Already have a store? Click the "Go to My Store" button on navbar to manage your
               store.
            </h1>
         </div>
      </div>
   );
}

export default AddStoreDetails;
