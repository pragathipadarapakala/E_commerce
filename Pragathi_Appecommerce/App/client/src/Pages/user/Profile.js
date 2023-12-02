import React,{useState, useEffect} from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/userMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../../Components/Context/Auth'
const Profile = () => {
  const [auth,setAuth] = useAuth();
  
  const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [phone,setPhone] = useState("")
const [address,setAddress] = useState("")

//form function
console.log("Hello");
console.log(auth);
const handeleSubmit =async (e) =>{
    e.preventDefault();
  try{
    console.log("Hello");
    console.log(auth.user);
    const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`,
    {name,email,password,phone,address},{
      headers: {
          'Authorization': auth?.token
      }
  });
    if(!data?.success){
        toast.error(data.message);
        // navigate('/login')
    }else{
       setAuth({...auth, user : data?.updatedUser});
       let ls = localStorage.getItem('auth')
       ls = JSON.parse(ls);
       ls.user = data.updatedUser;
       localStorage.setItem("auth",JSON.stringify(ls));
       toast.success("profile updated succesfully");
    }

  }catch(error){
    toast.error("something went wrong");
    console.log(error);
  }
}


//user data
useEffect(()=>{
  const { name,email,phone,address} = auth?.user;

  setName(name); 
  setPhone(phone);
  setEmail(email);
  setAddress(address);
  
}, [auth?.user])
  return (
    <Layout>
    <div className='container-fluid m-3 p-3'>
  <div className='row'>
      <div className='col-md-3'> 
      <UserMenu/>
      </div>
      <div className='col-md-7 '>
          <div className='card w-55 p-3'>
          <div className='form-container'>
                
                <form onSubmit={handeleSubmit}>
                <h1 className='title'>user profile</h1>
                    <div className="mb-3"> 
                        <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            id="InputName"
                            placeholder='Enter your Name'
                            value={name}
                           
                            />
                    </div>
                    <div className="mb-3"> 
                        <input
                            type="text"
                            value={email}
                            disabled
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="InputEmail"
                           
                            placeholder='Enter your email'/>
                    </div>
                    <div className="mb-3"> 
                        <input type="password"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                         className="form-control"
                          id="InputPassword"
                        placeholder='Enter your password'
                       
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
                            />
                    </div>
                    <div className="mb-3"> 
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control"
                            id="InputAddress"
                            placeholder='Enter your address'
                            />
                    </div>
                    
                     
                    <button type="submit" className="btn btn-primary">Update user</button>
                </form>
            </div>
          </div>

      </div>
  </div>
</div>
</Layout>
  )
}

export default Profile