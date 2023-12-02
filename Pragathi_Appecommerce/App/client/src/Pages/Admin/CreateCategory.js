import React, {useState, useEffect} from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios';
import {useAuth} from '../../Components/Context/Auth';
import CategoryForm from '../../Components/Form/CategoryForm';
import { Modal } from 'antd'
const CreateCategory = () => {

    const [categories,
        setCategories] = useState([]);
    const [auth] = useAuth();

    const [name,setName]= useState("");
    const [visible, setVisible] = useState(false);
    const [selected,setSelected]= useState(null);
    const [updatedName,setUpdatedName] = useState("")
    const handleSubmit =async (e) =>{
        e.preventDefault();
        try{

            const {data}= await axios.post("http://localhost:8000/api/v1/category/create-category",{name},{
                 headers: {
                'Authorization': auth
                    ?.token
            }}
            )
            console.log(data.category);
            if(data.success){
                toast.success(`${data.category.name} is creatwdw.`)
                getAllCategories();
            }else{
                toast.error(data.message)
            }
        }catch(error){console.log(error);
        toast.error("Somethingwent wrong with input form.")}
    }

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

            if (data.success) {
                setCategories(data.category)
            }

        } catch (error) {
            console.log(error);
            toast.error("Somthing went wrong in getting categories.")

        }
    }

    useEffect(() => {
        getAllCategories();
        
    }, [])
    //handleUpdate
    const handleUpdate= async(e)=>{ 
        e.preventDefault();
        try{
           const{data} = await axios.put(`http://localhost:8000/api/v1/category/update-category/${selected._id}`,{name:updatedName}, {
            headers: {
                'Authorization': auth
                    ?.token
            }
        })
           if (data.success) { 
            toast.success(data.message)
            setSelected(null);
            setVisible(false);
            setUpdatedName(" ")
            getAllCategories();
        }else{
            toast.error(data.message)
        }
        }catch(error){
            console.log(error);
            toast.error("Somthing went wrong in updating categories.")
        }
    }

     //handleUpdate
     const handleDelete= async(pId)=>{   
        try{
           const{data} = await axios.delete(`http://localhost:8000/api/v1/category/delete-category/${pId}`, {
            headers: {
                'Authorization': auth
                    ?.token
            }
        })
           if (data.success) { 
            toast.success(data.message)  
            getAllCategories();
        }else{
            toast.error(data.message)
        }
        }catch(error){
            console.log(error);
            toast.error("Somthing went wrong in Deleteing categories.")
        }
    }
    return ( <> <Layout>
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu/>
                </div>
                <div className='col-md-7 '>
                    <div className='card w-55 p-3'>
                        <h2>Manage category</h2>
                        <div className='p-3 w-50'>
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
                        </div>
                        <div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {categories.map(( value) => ( <> 
                                    {/* {console.log(value)} */}
                                    <tr>
                                        <td key={value._id}>{value.name}</td>

                                    <td>
                                        <button className='btn btn-primary ms-2' onClick={()=>{setVisible(true);
                                        setSelected(value); setUpdatedName(value.name)}}>
                                            Edit
                                        </button>
                                        <button onClick={()=> { handleDelete(value._id)}} className='btn btn-danger ms-2'>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </>
                                            ))}
                        </tbody>
                    </table>
                </div>
                <Modal onCancel={()=> setVisible(false)} footer={null} visible={visible}>
                    <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
                </Modal>
            </div>

        </div>
    </div> </div>
    </Layout> </>)
}

export default CreateCategory