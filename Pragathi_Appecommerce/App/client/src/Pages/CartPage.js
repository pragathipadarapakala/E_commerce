import React, { useState, useEffect } from 'react'
import Layout from '../Components/Layout/Layout'
import {useCart} from '../Components/Context/Cart'
import {useAuth} from '../Components/Context/Auth'
import {useNavigate} from 'react-router-dom'
import DropIn from 'braintree-web-drop-in-react'
import axios from 'axios'
import toast from 'react-hot-toast'

const CartPage = () => {

    const [auth,
        setAuth] = useAuth();
        // console.log(auth);
    const [cart,
        setCart] = useCart()
    const navigate = useNavigate()
    const [clientToken,setClientToken] = useState('')
    const [instance,setInstance] = useState("")
    const [loading,setLoading]= useState()

    const removeCartItem = (pid) => {
        try{
let myCart = [...cart];
let index = myCart.findIndex(item =>item._id === pid)
myCart.splice(index,1)
setCart(myCart)
localStorage.setItem('cart', JSON.stringify(myCart))

        }
        catch(error){
            console.log(error);
        }

    }

    //consttot
    const totalPrice = ()=>{
        try{

            let total=0; 
            cart?.map((item)=>(
                total = total + item.price
            ));
            return total.toLocaleString('en-us',{
                style:"currency",
                currency:"USD"
            });

        }catch(error){
            console.log(error);
        }

       

    }

    //get token payent
    const getToken= async()=>{
        try{
            const{data }= await axios.get('api/v1/product/braintree/token')
            setClientToken(data?.clientToken)


        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getToken();
    },[auth?.token])

    // / handlePayment

    const handlePayment = async () => {
        try {
          setLoading(true);
          const { nonce } = await instance.requestPaymentMethod();
          const { data } = await axios.post("/api/v1/product/braintree/payment", {
            nonce,
            cart,
          });
          setLoading(false);
          localStorage.removeItem("cart");
          setCart([]);
          navigate("/dashboard/user/orders");
          toast.success("Payment Completed Successfully ");
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };
    return ( <> <Layout>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <h1 className='text-center bg-light p-1'>{`Hello ${auth
                            ?.token && auth.user.name}`}</h1>
                    <h4 className='text-center'>

                        {cart
                            ?.length > 1
                                ? ` You have ${cart.length} items in your cart ${auth
                                    ?.token
                                        ? " "
                                        : `PleaseLogin to checkout`}`
                                    : `You cart is empty`}
                    </h4>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-8'>
                    {cart
                        ?.map((p) => (
                            <div className='row mb-3 flex-row card'>
                                <div className='col-md-4'>
                                    <img
                                        src={`http://localhost:8000/api/v1/product/product-photo/${p._id}`}
                                        className="card--top"
                                        width="130px"
                                        height="130px"
                                        alt={p.name}/>
                                </div>
                                <div className='col-md-8'>
                                    <h4>{p.name}</h4>
                                    <p>{p.description}</p>
                                    <h4>Price : {p.price}</h4>
                                    <button className='btn btn-danger' onClick={()=> removeCartItem(p._id)}>Remove</button>
                                </div>
                            </div>
                        ))
}
                </div>
                <div className='col-md-3 text-center'>
                    <h4>Cart Summary</h4>
                    <p>Total | Checkout | Payment</p>
                    <hr/>
                    <h5>Total : {totalPrice()}</h5>
                    {auth?.user?.address ? (<>
                        <div className='mb-3'>
                            <h4>Current addres : </h4>
                            <h5>{auth?.user?.address}</h5>
                            <button onClick={()=>{
                                navigate('/dashboard/user/profile')
                            }} className='btn btn-outline-warning'>
                                update Address 1
                            </button>
                        </div>
                    </>)
                    :
                    (<>
                    <div className='mb-3'>
                        {auth?.token ? (<>
                            <button onClick={()=>{
                                navigate('/dashboard/user/profile')
                            }} className='btn btn-outline-warning'>
                                update Address
                            </button>
                        </>) : (<>
                            <button onClick={()=>{
                                navigate('/login')
                            }} className='btn btn-outline-warning'>
                                Plesase Login to checkout
                            </button>
                        </>)}
                   
                    </div>
                   


                    </>)}
                    <div className='mt-2'>
                    {
                        (!clientToken ) ? (" ") : (<>
                            <DropIn options={{
                                authorization:clientToken,
                                paypal:{
                                    flow:"vault",
                                }
                            }}
                            onInstance={(instance)=>setInstance(instance)}/>
                            <button className='btn btn-primary'
                             onClick={handlePayment}
                            //  disabled={!instance || loading || !auth?.user?.address}
                             >{
                                loading ?"Processing" : "Make Payment"
                             }</button>
                        </>)
                    }
                           
                        </div>
                </div>
            </div>
        </div>
    </Layout> </> )
}

export default CartPage