import React, {useState, useEffect} from 'react'
import AdminMenu from '../../Components/Layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import {useAuth} from '../../Components/Context/Auth'
import {Link} from 'react-router-dom'
import Layout from '../../Components/Layout/Layout'
const Products = () => {

    const [products,
        setProducts] = useState([])

    const [auth] = useAuth();

    // get all products
    const getAllProducts = async() => {
        try {
            const {data} = await axios.get('http://localhost:8000/api/v1/product/get-all-products', {
                headers: {
                    'Authorization': auth
                        ?.token
                }
            })
            setProducts(data.products)

        } catch (error) {
            console.log(error);
            toast.error("something went wrong")
        }
    }

    //lifescyclemehods
    useEffect(() => {
        getAllProducts();
    }, [])
    return ( <> 
    <Layout>
    <div className='container-fluid m-3 p-3'>
    <div className='row'>
        <div className='col-md-3'>
            <AdminMenu/>
        </div>
        <div className='col-md-9'>
            <h1 className='text-center'>All products</h1>
            <div className='d-flex'>
                {products.map((product) => {
                    return ( <> <Link className='product-link' to={`/dashboard/admin/product/${product.slug}`} key={product._id}>

                        <div
                            className="card m-2"
                            style={{
                            width: "18rem"
                        }}>
                            <img src={`http://localhost:8000/api/v1/product/product-photo/${product._id}`} className="card--top" alt={product.name}/>
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                            </div>
                        </div>
                    </Link> </>)
            })}
            </div>
        </div>
    </div> 
    </div>
    </Layout></> )
}

export default Products