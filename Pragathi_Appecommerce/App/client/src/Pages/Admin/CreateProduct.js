import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import {useAuth} from '../../Components/Context/Auth'
import {Select} from 'antd';
const {Option} = Select;;


const CreateProduct = () => {

    const navigate = useNavigate()

    const [categories,
        setCategories] = useState([])
        const [category,
            setCategory] = useState([])
    const [photo,
        setPhoto] = useState('')
    const [name,
        setName] = useState('')
    const [description,
        setDescription] = useState('')
    const [price,
        setPrice] = useState('')
    const [quantity,
        setqQuantity] = useState('')
    const [shipping,
        setShipping] = useState('')
    const [auth] = useAuth();

    //getall categiors
    const getAllCategories = async() => {
        try {
            const {data} = await axios.get(`http://localhost:8000/api/v1/category/get-all-category`, {
                headers: {
                    'Authorization': auth
                        ?.token
                }
            });
            // console.log(data.category);

            if (data
                ?.success) {
                setCategories(data
                    ?.category)
            }

        } catch (error) {
            console.log(error);
            toast.error("Somthing went wrong in getting categories.")

        }
    }
    useEffect(() => {
        getAllCategories();
         //eslint-disable-next-line
    }, [])

    //craete product func
    const handleCreate =async (e)=>{
        e.preventDefault(); 
        try{
            const productData = new FormData();
            productData.append('name',name);
            productData.append('description',description);
            productData.append('price',price);
            productData.append('quantity',quantity);
            productData.append('category',category);
            photo && productData.append("photo", photo);


            const {data} = await axios.post(`http://localhost:8000/api/v1/product/create-product`, productData, {
                headers: {
                    'Authorization': auth
                        ?.token
                }
            });

            if(data.success){
                toast.success("Product created succesfullt")
                navigate('/dashboard/admin/products')
            }

        }catch(error){
            console.log(error);
            toast.error("Somthing went wrong .")
        }

    }

    return (<>
        <Layout>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu/>
                    </div>
                    <div className='col-md-9 '>
                        <div className='card w-55 p-3'>
                            <h2>Create Product
                            </h2>
                            <div className='m-1'>
                                <Select
                                    bordered={false}
                                    placeholder="select category"
                                    size='large'
                                    showSearch
                                    className='form-select mb-3'
                                    onChange={(value)=>{setCategory(value)}}
                                   > 
                                   {categories?.map((value)=>(
                                    <Option key={value._id} value={value._id}>
                                                    {value.name}
                                    </Option>
                                   ))}
                                   </Select>
                                   <div className='mb-3'>
                                            <label className='btn btn-outline-secondary col-md-12'>
                                                {photo ?  photo.name: "Upload photo"}
                                                <input type='file' name='"'  accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])} hidden/>
                                            </label>
                                   </div>
                                   <div className='mb-3'>
                                   {photo && (
                                    <div className='text-center'>
                                    <img src={URL.createObjectURL(photo)}
                                    alt='product'
                                    height={"200px"}
                                    className='img img-reponsive'/>
</div>
                                   )}

                                   </div>
                                   <div className='mb-3'>
                                        <input type='text' value={name} placeholder='write a name'
                                        className='form-control'
                                        onChange={(e)=> setName(e.target.value)}/>
                                   </div>
                                   <div className='mb-3'>
                                        <textarea type='text' value={description} placeholder='write a description'
                                        className='form-control'
                                        onChange={(e)=> setDescription(e.target.value)}/>
                                   </div>
                                   <div className='mb-3'>
                                        <input type='number' value={price} placeholder='write a price'
                                        className='form-control'
                                        onChange={(e)=>setPrice(e.target.value)}/>
                                   </div>
                                   <div className='mb-3'>
                                        <input type='number' value={quantity} placeholder='write a quantity'
                                        className='form-control'
                                        onChange={(e)=> setqQuantity(e.target.value)}/>
                                   </div>
                                   <div className='mb-3'>
                                        <Select placeholder="select shipping"
                                        showSearch
                                        size='large'
                                        bordered={false}
                                        className='form-control mb-3'
                                        onChange={(value)=> setShipping(value)}>
                                        <Option value='0'>No</Option>
                                        <Option value='1'>Yes</Option>
                                        </Select>
                                   </div>
                                   <div className='mb-3'>
                                    <button className='btn btn-primary' onClick={handleCreate}>
                                        CREATE PRODUCT
                                    </button>
                                   </div>
                                  
                                   </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Layout>
            </>  )}

export default CreateProduct 
