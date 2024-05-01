import { useState } from "react";
import "./NewProduct.css";
import axios from "axios";
import { userRequest } from "../../requestMethod";


export default function NewProduct() {
  const [input,setInput]=useState({})
  const [file,setFile]=useState(null)
  const [cet,setCet]=useState([])
  const [size,setSize]=useState([])

  const handleChange=(e)=>{
    setInput(prev=>{
      return {...prev,[e.target.name]:e.target.value}
    })
  }
  const handleCet=(e)=>{
    setCet(e.target.value.split(","));
  }
  const handleSize=(e)=>{
    setSize(e.target.value.split(","));
  }
  const handleClick= async (e)=>{

    e.preventDefault();
    const formData=new FormData();
    formData.append('file',file)
    formData.append("upload_preset","upload")
    const uploadRes=await axios.post("https://api.cloudinary.com/v1_1/dfdmhagar/image/upload",formData)
    // console.log(uploadRes.data.secure_url);
    

    const postData = {
      img: uploadRes.data.secure_url,
      title: input.title,
      desc: input.desc,
      categories: cet,
      size: size,
      color: input.color,
      price: input.price,
      // inStock: input.inStock === 'true' ? true : false
      inStock: "true"
    };
    console.log(postData);
    try {
      // Make the POST request
      const response = await userRequest.post("product/", postData);
      
      // Handle response if needed
      alert("Product created:", response.data);
    } catch (error) {
      // Handle errors
      console.error("Error creating product:", error);
    }
  
    

  }
  // console.log(input,cet,size);
  // console.log(file);
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={e=>setFile(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input name="title" type="text" placeholder="Enter The Product Titel" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Product Description</label>
          <input name="desc" type="text" placeholder="Like:-cotton Machine Wash" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Cetegories</label>
          <input  name="categories[0]" type="text" placeholder="Like:-T-Shirt" onChange={handleCet}/>
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input  name="categories[0]" type="text" placeholder="Like:-T-Shirt" onChange={handleSize}/>
        </div>
        
        <div className="addProductItem">
          <label>Color</label>
          <input name="color" type="text" placeholder="Like:-red"  onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input name="price" type="number" placeholder="Like:-599" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
        <label>In Stock</label>
                        <select
                            name="inStock"
                            id="idStock"
                            value="inStock"
                            onChange={handleChange}
                        >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
        </div>
        <div className="addProductItem">
        </div>
        <button className="addProductButton" onClick={handleClick}>Create</button>
      </form>
    </div>
  );
}