import "../Home/Home.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaPhone } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { FcRating } from "react-icons/fc";


function Home(){

    const url = "http://localhost:4000"
    const [shopList,setShopList] = useState([]);

    const fetchList = async () =>{
        const response = await axios.get(`${url}/api/shop/list`);
        console.log(response.data);
        if(response.data.success){
            setShopList(response.data.data);
        }else{
            toast.error("Error");
        }

    }

    useEffect(()=>{
        fetchList();
    },[])

    

return(
    <div>
    <div className="PurposeHeading" >
        <h1 className="mainHeading">Find What You Need, Neaeby - Instantly</h1>
        <p className="subHeading" >ItemNearBy helps you find items available in local stores near your location. You can search for any product and see which nearby shop has it in stock.</p>
        <p className="subHeadingTwo"> It's a quick and easy way to connect with local shops and save time.</p>
    </div>
    <div>
        <h2 className="SubHeading">Shops Around You - Discover Great Deals from Local Stores :-</h2>
    </div>
    <div >
      
                   <div className="shopListContainer" >
                    {
                       shopList.map((item,index)=>{
                        return(
                          <Link className="link-style-storeList" to={`/shop/${item._id}`} state={{shop:item}} key={index}>
                            <div className="list-format" >
                             <img src={`${url}/images/`+item.image}/>
                             <div className="storeNameContainer" >
                              <p className="StoreName" >{item.name}</p>
                              <p><FcRating />3.8</p>
                             </div>
                             
                             <p className="StoreNumber" ><FaPhone className="phoneIcon" />{item.phoneNumber}</p>
                             <p className="StoreAddress" ><FaLocationDot className="locationIcon" />{item.address}</p>
                             <p className="StoreCategory" ><MdCategory className="categoryIcon" />{item.category}</p>
                           </div>
                            </Link>
                        )
                       }) 
                    }
                   </div>
       
        
    </div>
    </div>
)

}
export default Home;