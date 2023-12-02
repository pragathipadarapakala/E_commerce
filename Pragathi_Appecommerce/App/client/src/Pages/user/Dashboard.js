import React,{useState, useEffect} from 'react'
import Layout from '../../Components/Layout/Layout' 
import UserMenu from '../../Components/Layout/userMenu'
import { useAuth } from '../../Components/Context/Auth' 
const Dashboard = () => {
  const [auth,setAuth] = useAuth();
  
// console.log(auth);
  return (
    <Layout>
    <div className='container-fluid m-3 p-3'>
        <div className='row'>
            <div className='col-md-3'>
                <UserMenu/>
            </div>
            <div className='col-md-7 '>
                <div className='card w-55 p-3'>{console.log(auth?.user?.name)}
                    <h2>user Name : {auth?.user.name}</h2>
                    <h2>user email : {auth?.user.email}</h2>
                    <h2>user Contact : {auth?.user.phone}</h2>
                </div>

            </div>
        </div>
    </div>
    </Layout>
  )
}

export default Dashboard