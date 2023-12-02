import React, {useState} from 'react'
import Layout from '../../Components/Layout/Layout'
import {  toast } from 'react-hot-toast';
import '../../styles/Authstyle.css'
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

    const navigate = useNavigate();

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [phone,setPhone] = useState("")
const [address,setAddress] = useState("")

//form function
const handeleSubmit =async (e) =>{
    e.preventDefault();
  try{
    const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,
    {name,email,password,phone,address});
    if(res && res.data.success){
        toast.success(res.data.message);
        navigate('/login')
    }else{
        toast.error(res.data.message);
    }

  }catch(error){
    toast.error("somethingwentwrong");
    console.log(error);
  }
}
    return (
        <Layout title="register - e commerce">
            <div className='form-container'>
                
                <form onSubmit={handeleSubmit}>
                <h1 className='title'>Register Form</h1>
                    <div className="mb-3"> 
                        <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            id="InputName"
                            placeholder='Enter your Name'
                            value={name}
                            required
                            />
                    </div>
                    <div className="mb-3"> 
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="InputEmail"
                            required
                            placeholder='Enter your email'/>
                    </div>
                    <div className="mb-3"> 
                        <input type="password"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                         className="form-control"
                          id="InputPassword"
                        placeholder='Enter your password'
                        required
                          />
                    </div>
                    <div className="mb-3"> 
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            id="InputPhone"
                            placeholder='Enter your Phone'
                            required />
                    </div>
                    <div className="mb-3"> 
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control"
                            id="InputAddress"
                            placeholder='Enter your address'
                            required />
                    </div>
                    
                     
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        </Layout>
    )
}

export default Register