import "./ProductList.css";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {userRequest} from "../../requestMethod"



export default function ProductList() {
  const [data, setData] = useState(productRows);
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await userRequest.get("product");
        // console.log(response.data);
        setProducts(response.data);
      
      } catch (error) {
        console.error('Error fetching products:', error);
        
      }
    }

    fetchProducts();
  }, []);
// console.log(products);


const handleDelete = (id) => {
  userRequest.delete(`/product/${id}`)
  
  .then(response => {
      
      alert(`Product with ID ${id} deleted successfully`);
      setProducts(products.filter(product => product._id !== id));
  })
  .catch(error => {
      
      alert(`Failed to delete product with ID ${id}`, error);
    
  });
};


  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 280,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img ||"https://images.unsplash.com/photo-1588099768531-a72d4a198538?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNsb3RoaW5nfGVufDB8fDB8fHww"} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },
    {
      field: "size",
      headerName: "Size",
      width: 120,
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row)=>row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}