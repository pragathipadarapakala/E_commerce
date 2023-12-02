import {Routes, Route} from 'react-router-dom'
import HomPage from './Pages/HomPage';
import AboutPage from './Pages/AboutPage';
import ContactPage from './Pages/ContactPage';
import Policy from './Pages/Policy';
import PageNotFound from './Pages/PageNotFound';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import Dashboard from './Pages/user/Dashboard';
import PrivateRoute from '../src/Components/Routes/Private'
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminRoute from './Components/Routes/AdminRoute';
import CreateProduct from './Pages/Admin/CreateProduct';
import CreateCategory from './Pages/Admin/CreateCategory';
import AdminUsers from './Pages/Admin/AdminUsers';
import Profile from './Pages/user/Profile';
import Orders from './Pages/user/Orders';
import Products from './Pages/Admin/Products';
import Product from './Pages/Admin/Product';
import ProductPages from './Pages/ProductPages';
import Categories from './Pages/Categories';
import CategoryProduct from './Pages/CategoryProduct';
import CartPage from './Pages/CartPage';

function App() {
    return ( <> <Routes>
        <Route path='/' element={< HomPage />}/>
        <Route path='/about' element={< AboutPage />}/>
        <Route path='/cart' element={< CartPage />}/>
        <Route path='/categories' element={< Categories />}/>
        <Route path='/category/:slug' element={< CategoryProduct />}/>
                <Route path='/dashboard' element={< PrivateRoute />}>
            <Route path='user' element={< Dashboard />}/>
            <Route path='user/orders' element={< Orders />}/>
            <Route path='user/profile' element={< Profile />}/>
        </Route>
        <Route path='/dashboard' element={< AdminRoute />}>
            <Route path='admin' element={< AdminDashboard />}/>
            <Route path='admin/create-product' element={< CreateProduct />}/>
            <Route path='admin/products' element={< Products />}/>
            <Route path='admin/product/:slug' element={< Product />}/> {/* // simialar to update product */}
            <Route path='admin/create-category' element={< CreateCategory />}/>
            <Route path='admin/user' element={< AdminUsers />}/>
        </Route>
        <Route path='/contact' element={< ContactPage />}/>
        <Route path='/policy' element={< Policy />}/>
        <Route path='/product/:slug' element={< ProductPages />}/>
        <Route path='/register' element={< Register />}/>
        <Route path='/login' element={< Login />}/>
        <Route path='*' element={< PageNotFound />}/>

    </Routes> </>
  );
}

export default App;