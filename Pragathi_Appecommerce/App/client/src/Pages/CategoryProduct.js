import React,{useState,useEffect} from 'react'
import Layout from '../Components/Layout/Layout'
import axios from 'axios'
import { useParams , useNavigate} from 'react-router-dom'
import { useCart } from '../Components/Context/Cart'
import toast from 'react-hot-toast'


const CategoryProduct = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [product,setProduct]= useState([])
    const [category,setCategory]= useState([])
    const [cart,setCart] = useCart()

    const getProduct=async()=>{
        try {
            const {data} = await axios.get(`http://localhost:8000/api/v1/product/product-category/${params.slug}`);
            // console.log(data.category);
 

            if (data
                ?.success) {
                    setProduct(data?.products);
                    setCategory(data?.category);
            }
            console.log("xyz");
            console.log(data);

        } catch (error) {
            console.log(error); 

        }
    }

    useEffect(()=>{
        if(params?.slug)
        getProduct();
    },[params.slug])

  return (<>
    <Layout>
       <div className='container mt-3'>
    <h3 className='text-center'>Category : {category?.name}</h3>
    <h6 className='text-center'>{product.length}</h6>
<div className='row'>
    <div className="d-flex flex-wrap">
            {product?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 60)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button class="btn btn-primary ms-1"
                  onClick={()=> navigate(`/product/${p.slug}`)}>More Details</button>
                  <button class="btn btn-secondary ms-1"onClick={()=> {

setCart([...cart,p]);
localStorage.setItem('cart',JSON.stringify([...cart,p]))
toast.success("Added to cart");
}}>ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
        </div></div>
    </Layout>
  </> )
}

export default CategoryProduct