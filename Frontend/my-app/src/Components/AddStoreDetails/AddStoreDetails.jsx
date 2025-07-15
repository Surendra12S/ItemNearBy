import { useState } from "react";
import UploadImg from "../../assets/upload_area.png";
import "../AddStoreDetails/AddStoreDetails.css";
import axios from "axios"
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

function AddStoreDetails(){
   
   const url = "http://localhost:4000";
   const [image,SetImage] = useState(false);
   const [data,setData] = useState({
      name:"",
      phoneNumber:"",
      address:"",
      category:"",
      password:""
   })

   const onChangeHandler = (event)=>{
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}));
   }

   const onSubmitHandler = async (event)=>{
       event.preventDefault();
       const formData = new FormData();
       formData.append("name",data.name)
       formData.append("phoneNumber",data.phoneNumber)
       formData.append("address",data.address)
       formData.append("category",data.category)
       formData.append("password",data.password)
       formData.append("image",image)
       const response = await axios.post(`${url}/api/shop/add`,formData);
       if(response.data.success){
          setData({
              name:"",
              phoneNumber:"",
              address:"",
              category:"",
              password:""
          })
          SetImage(false)
          toast.success(response.data.message)
       }else{
            toast.error(response.data.message)
       }
   }

return(
   <div className="FullContainer">
      <RxCross2 />
    <div className="newToclass" >
      <h1>New to ItemNearBy? Fill the Form below to add your store details and start sharing your products.</h1>
    </div>
  
    <div className="addStoreDetailsContainer">
        <form className="flex-col" onSubmit={onSubmitHandler} >
         
             <div className="add-img-upload">
               <div className="CrossIcon" >
                   <p>Upload Image</p>
                   <Link to={"/"} >
                      <RxCross2 className="icon" />
                   </Link>
                  
               </div>
                  
                   <label htmlFor="image">
                  <img src={image? URL.createObjectURL(image) : UploadImg} alt=""/>
                 </label>
                 <input onChange={(e)=>SetImage(e.target.files[0])} type="file" id="image" hidden required/>             
            </div>
            <div className="add-store-name">
                 <p>Store Name</p>
                 <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here"/>
            </div>
             <div>
                <p>Store Number</p>
                <input onChange={onChangeHandler} value={data.phoneNumber} type="text" name="phoneNumber" placeholder="enter your number"></input>
             </div>
             <div>
                <p>Address</p>
                <input onChange={onChangeHandler} value={data.address} name="address" placeholder="enter you address"/>
             </div>
             <div>
                <p>Category</p>
                <input onChange={onChangeHandler} value={data.category} name="category" placeholder="Enter your store category"/>
             </div>
             <div>
               <p>Password</p>
               <input onChange={onChangeHandler} value={data.password} name="password" placeholder="Enter your password"/>
             </div>
             <button className="submitBtn" type="submit">Add</button>
        </form>
        <Link to={"/ownerLogin"} >
         <button className="goToMyStorBtn" >Go to My Store</button>
        </Link>
        
    </div>
    <div className="AlreadyClass">
      <h1 >Already have a store? Click the button below to manage your store.</h1>
    </div>
     </div>
)
}
export default AddStoreDetails;