import React from 'react'
import AdminMenu from '../../Components/Layout/AdminMenu'
import {useAuth} from '../../Components/Context/Auth'
import Layout from '../../Components/Layout/Layout';
const AdminDashboard = () => {
    const [auth] = useAuth();

    return ( <> 
    <Layout>
    <div className='container-fluid m-3 p-3'>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-7 '>
                <div className='card w-55 p-3'>{console.log(auth.user.name)}
                    <h2>Admin Name : {auth.user.name}</h2>
                    <h2>Admin email : {auth.user.email}</h2>
                    <h2>Admin Contact : {auth.user.phone}</h2>
                </div>

            </div>
        </div>
    </div>
    </Layout> </> )
}

export default AdminDashboard