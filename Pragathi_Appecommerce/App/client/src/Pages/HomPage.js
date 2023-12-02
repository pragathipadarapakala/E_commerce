import React, {useEffect, useState} from 'react'
import Layout from '../Components/Layout/Layout' 
import '../styles/homepage.css'
import axios from 'axios'
import { useAuth } from '../Components/Context/Auth'
import toast from 'react-hot-toast'
import {Checkbox,Radio} from 'antd';
import { Price } from '../Components/Price'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../Components/Context/Cart'; 


const HomPage = () => {
    const navigate = useNavigate()
    const [auth,setAuth] = useAuth(); 
    const [checked,setChecked] = useState([])
    const [radio,setRadio] = useState([])
    const [cart,setCart] = useCart()
 

    const [Products,setProducts]= useState([])
    const[categories,setCategories] = useState([])
    const [total,setTotal] = useState(0)
    const [page, setPage] = useState(1);
    const [loading,setLoading] = useState(false)

    //get totoal count
    const getTotal = async () => {
        try {
          const { data } = await axios.get("http://localhost:8000/api/v1/product/product-count");
         
          setTotal(data?.Total);
        } catch (error) {
          console.log(error);
        }
      }; 
//get products

const getAllProducts =async () =>{
    try{
        setLoading(true)
        const{data } =  await axios.get(`http://localhost:8000/api/v1/product/product-list/${page}`) ;  
        setLoading(false)
        setProducts(data.products)

    }catch(error){ 
        setLoading(true)
        toast.error('Error in getting products');
        setLoading(false)
    }
}


 

    //getall categiors
    const getAllCategories = async() => {
        try {
            const {data} = await axios.get(`http://localhost:8000/api/v1/category/get-all-category`); 

            if (data.success) {
                setCategories(data.category)
            }

        } catch (error) {
            console.log(error);
            toast.error("Somthing went wrong in getting categories.")

        }
    }

    // ge filter prodyucst
    const filterProducts = async()=>{
        try{
            const{data } =  await axios.post('http://localhost:8000/api/v1/product//product-filter',{checked,radio}) ;      
            setProducts(data.products)

        }catch(error){ 
        toast.error('Error in getting products');
    }
    }
    useEffect(()=>{ 
       getAllCategories(); 
       
       },[ ])
   
useEffect(()=>{
     if(!checked.length || !radio.length) {
        getAllProducts();  
        getTotal();}
    },[checked.length , radio.length ])

    useEffect(()=>{
        if(checked.length || radio.length){

        filterProducts();  
        getTotal();}
       },[checked.length , radio.length ])
   

    // filter by cat
    const handleFilter=(value,id)=>{
        let all = [...checked]
        if(value){
            all.push(id)
        }else{
            all = all.filter(c=> c!== id)
        }

        setChecked(all)

    }
 
    //loading
    const loadMore=async()=>{
        try{
            setLoading(true)
            const{data } =  await axios.get(`http://localhost:8000/api/v1/product/product-list/${page}`) ;  
            setLoading(false)
            setProducts([...Products,...data.products])
        }catch(error){
            setLoading(true)
            toast.error('Error in getting products');
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(page===1)return;
        loadMore();
    },[page])
    return (
        <Layout> 
        <div className='row'>
            <div className='col-md-2'> 
                <h4 className='text-center'> Filter by catgeory</h4>
                <div className='d-flex felx-column'>
                {categories?.map((c)=>(
                    <Checkbox key={c._id} onChange={(e)=> handleFilter(e.target.checked,c._id)} >{c.name}</Checkbox>
                ))}
            </div>
            <h4 className='text-center'> Filter by Price</h4>
                <div className='d-flex felx-column'> 
                    <Radio.Group  onChange={(e)=>setRadio(e.target.value) } >
                    {Price?.map((p)=>(
                    <Radio value={p.array}>{p.name}</Radio>
                ))} 
                </Radio.Group>
            </div>
            <div className='d-flex felx-column'> 
                     <button className='btn btn-danger'
                     onClick={()=> window.location.reload()}
                     >Reset Filters</button>
             
            </div>
            </div>
            <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {Products?.map((p) => (
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
                  <button class="btn btn-secondary ms-1" onClick={()=> {

                  setCart([...cart,p]);
                  localStorage.setItem('cart',JSON.stringify([...cart,p]))
                  toast.success("Added to cart");
                  }}
                 >ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            
                {Products && Products.length < total && (  
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )
                }            
          </div>
        </div>
            </div>
        </Layout>
    )
}

export default HomPage