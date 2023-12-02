import React from 'react'
import {NavLink, Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/Auth';
import useCategory from '../hooks/useCategory';
import { useCart } from '../Context/Cart';


const Header = () => {

  const [auth,setAuth]= useAuth();
  const navigate = useNavigate();
  const [cart] = useCart();

  const categories = useCategory(); 

    const handlelogout=() =>{
    setAuth({...auth,user:null,token:""})
    localStorage.removeItem('auth');
    navigate('/login')

  } 
  return (<>
   <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link to='/' className="navbar-brand"> E-Commerce App</Link>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item">
          <NavLink to='/' className="nav-link " >Home</NavLink>
        </li>

          <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to={"/categories"}  data-bs-toggle="dropdown" >
          category
          </Link>
          
          <ul className="dropdown-menu">
            <li>
              <Link to={'/categories'} className="dropdown-item">
                All categories
              </Link>
              </li>
       
          {
            categories?.map((c => (
              
            <li><Link to={`/category/${c.name}`} className="dropdown-item"  >{c.name}</Link></li> 
        
            )))
          }
          </ul>
          </li> 
          
        { 
          !auth.user ? (<>
            <li className="nav-item">
          <NavLink to='/register' className="nav-link " >SignUp</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/login' className="nav-link">signin</NavLink>
        </li>
          </>) : (<>
            <li className="nav-item dropdown">
          <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {auth?.user?.name}
          </NavLink>
          <ul className="dropdown-menu">
            <li> <NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role===1 ? "admin" : 'user'}`} >Dashboard</NavLink></li>
            <li>  <NavLink onClick={handlelogout} to='/login' className="nav-link">Logout</NavLink> </li>
          </ul>
        </li>
            
          </>)        
          
        }
              <li className="nav-item">
          <NavLink to='/cart' className="nav-link">Cart {cart.length}</NavLink>
        </li>
       
     
      </ul> 
    </div>
  </div>
</nav> 
  </>)
}

export default Header