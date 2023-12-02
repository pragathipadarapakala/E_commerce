import {useState, useEffect, useContext, createContext} from "react"; 

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth,
        setAuth] = useState({user: null, token: ""});

    // def axios.default.header.common['authorization' ] = auth?.token
    //default axios
//   axios.defaults.headers.common["Authorization"] = auth?.token;

    useEffect(() => {
        const data = localStorage.getItem('auth'); 
        // console.log(JSON.parse(data));
        if (data) {
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token

            })
            // console.log("hello parse data");
            // console.log(parseData);
            // console.log(auth);
        } 
        //eslint-next-disable
    }, [])

    return (
        <AuthContext.Provider value={[
            auth,
            setAuth
        ]}>
            {children}
        </AuthContext.Provider>
    );
}

// custom hook
const useAuth = () => useContext(AuthContext);

export {useAuth, AuthProvider};