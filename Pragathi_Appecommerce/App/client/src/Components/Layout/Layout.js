import React from 'react'
import Header from './Header'
import Footer from './Footer'
import  { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({children}) => {
    //direct destructing of props to chhild
  return (<>
   <div>
        <Header/>
        <main style={{minHeight:"80vh"}}>
        <Toaster />
            {children}
        </main>
        <Footer/>
   </div>
  </>)
}

export default Layout