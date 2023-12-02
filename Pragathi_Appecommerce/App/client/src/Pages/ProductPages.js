import React,{useState,useEffect} from 'react'
import Layout from '../Components/Layout/Layout' 
import { useParams,useNavigate } from 'react-router-dom'
import { useAuth } from '../Components/Context/Auth'
import axios from 'axios'

const ProductPages = () => {

    const params = useParams();
    const [auth]= useAuth();
    const navigate = useNavigate()

    const [product,setProduct] = useState({})

    const [realedProducts,setRelatedProducts]= useState([])

    //
    const getSimilarProduct = async(pId,cId)=>{
        try{
            const {data} = await axios.post(`http://localhost:8000/api/v1/product/related-product/${pId}/${cId}`,{
                headers: {
                    'Authorization': auth?.token
                }

            });
            setRelatedProducts(data?.products)
        }catch(error){
            console.log(error);

        }
    }

// intial pdetails

useEffect(()=>{
    if(params?.slug)
    getProduct();
},[params.slug])
    //grt product
    const getProduct =async () =>{
        console.log(("h1"));
        console.log(auth);

        try{
            const {data} = await axios.get(`http://localhost:8000/api/v1/product/get-product/${params.slug}`,{
                headers: {
                    'Authorization': auth?.token
                }

            })

            setProduct(data?.product)
            getSimilarProduct(data?.product._id, data?.category._id)

        }catch(error){
            console.log(error);
        }

    }
  return (<>
    <Layout>
    <div className='row container mt-2'>
        <div className='col-md-6'>
        <img  src={`http://localhost:8000/api/v1/product/product-photo/${product._id}`}
        className='card-img-top' 
            alt={product.name}/> 
        </div>
        <div className='col-md-6'>
        <h1 className='text-center'>Product Details</h1>
        <h6>name : {product.name}</h6>
        <h6>description : {product.description}</h6>
        <h6>price : {product.price}</h6>
        <h6>category : {product.category?.name}</h6>
        <button class="btn btn-secondary mt-1">ADD TO CART</button>
    </div>
    </div>
    <hr/>
    <div className='row'><h1>Similar products</h1>
    {realedProducts.length <1 && <p> No similar product fournd</p>}
    {realedProducts.map((p)=>(
        <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`/api/v1/product/product-photo/${p?._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text"> $ {p.price}</p>
                <button
                  className="btn btn-primary ms-1"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                <button class="btn btn-secondary ms-1">ADD TO CART</button>
              </div>
            </div>
    ))}
    
</div>
    </Layout>
  </> )
}

export default ProductPages