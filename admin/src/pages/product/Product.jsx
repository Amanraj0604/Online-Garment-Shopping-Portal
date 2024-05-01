import { Link, useLocation } from "react-router-dom";
import "./Product.css";
import Chart from "../../componant/chart/Chart"
import { productData } from "../../dummyData"
import { Publish } from '@mui/icons-material';
import { publicRequest, userRequest } from "../../requestMethod";
import { useEffect, useMemo, useState } from "react";

export default function Product() {
    const [data, setData] = useState({
        title: "",
        desc: "",
        price: "",
        size: "",
        color: "",
        categories: [],
      });
    const location = useLocation()
    const productId = location.pathname.split("/")[2];
    const [pStats, setPStats] = useState([])
    // console.log(productId);
    const [formData, setFormData] = useState({
        title: "",
        desc: "",
        price: "",
        size: "",
        color: "",
        categories: [],
        inStock: true,
      });
    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    );
    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get("order/income?pid=" + productId);
                console.log("jgfha" + res.data);
                const list = res.data.sort((a, b) => {
                    return a._id - b._id
                })
                list.map((item) =>
                    setPStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], Sales: item.total },
                    ])
                );
            } catch (err) {
                console.log(err);
            }
        };
        getStats();
    }, [productId, MONTHS]);
    const fetchData = async () => {
        try {
            const response = await publicRequest.get(`product/find/${productId}`);
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "category1" || name === "category2") {
          // Handle categories separately
          setFormData((prevData) => ({
            ...prevData,
            categories: name === "category1" ? [value, prevData.categories[1]] : [prevData.categories[0], value]
          }));
        } else {
          // Handle other fields normally
          setFormData((prevData) => ({
            ...prevData,
            [name]: value
          }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await userRequest.put(
            `product/${productId}`,
            formData
          );
          alert("Updated data:", response.data);
          // You can handle success response here, e.g., show a success message
        } catch (error) {
          console.error("Error updating data:", error);
          // You can handle error response here, e.g., show an error message
        }
      };
    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <Chart data={productData} dataKey="Sales" title="Sales Performance" />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={data.img} alt="" className="productInfoImg" />
                        <span className="productName">{data.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{data._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Desc:</span>
                            <span className="productInfoValue">{data.desc}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Price:</span>
                            <span className="productInfoValue">{data.price}</span>
                        </div>

                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm" onSubmit={handleSubmit}>
                    <div className="productFormLeft">
                        <label>Product Name</label>
                        <input
                            type="text"
                            placeholder={data.title}
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                        <label>Descriptions</label>
                        <input
                            type="text"
                            placeholder={data.desc}
                            name="desc"
                            value={formData.desc}
                            onChange={handleChange}
                        />
                        <label>Price</label>
                        <input
                            type="text"
                            placeholder={data.price}
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                        <label>Size</label>
                        <input
                            type="text"
                            placeholder={data.size}
                            name="size"
                            value={formData.size}
                            onChange={handleChange}
                        />
                        <label>Color</label>
                        <input
                            type="text"
                            placeholder={data.color}
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                        />
                        <label>Categories</label>
                        <input
                            type="text"
                            placeholder={data.categories[0]}
                            name="category1"
                            value={formData.categories[0]}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder={data.categories[1]}
                            name="category2"
                            value={formData.categories[1]}
                            onChange={handleChange}
                        />
                        <label>In Stock</label>
                        <select
                            name="inStock"
                            defaultValue={data.inStock}
                            id="idStock"
                            value={formData.inStock}
                            onChange={handleChange}
                        >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img
                                src={data.img}
                                alt=""
                                className="productUploadImg"
                            />
                            <label htmlFor="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} />
                        </div>
                        <button className="productButton" type="submit">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}