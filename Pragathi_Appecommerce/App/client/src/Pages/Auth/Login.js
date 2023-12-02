import React, {useState} from 'react';
import {toast} from 'react-hot-toast';
import Layout from '../../Components/Layout/Layout';
import '../../styles/Authstyle.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import {useAuth} from '../../Components/Context/Auth';

const Login = () => {
    const [email,
        setEmail] = useState('');
    const [password,
        setPassword] = useState('');
    const navigate = useNavigate();
    const [auth,
        setAuth] = useAuth();

    // Form function
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {email, password});
            if (res && res.data.success) {
                toast.success(res.data.message);

                setAuth({
                    ...auth,
                    user: res?.data?.user,
                    token: res?.data?.token
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                console.log(auth); // look after later
                navigate('/')
            } else {
                toast.error(res.data.message);
            }

        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    };

    return (
        <Layout title="Login Page">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h1 className="title">Login</h1>

                    <div className="mb-3">
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="InputEmail"
                            required
                            placeholder="Enter your email"/>
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="InputPassword"
                            placeholder="Enter your password"
                            required/>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Login;
