import {useState, useEffect, useContext, createContext} from "react"; 

const searchContext = createContext();

const searchProvider = ({children}) => {

    const [search,
        setSearch] = useState({
            
        });


    useEffect(() => {
        const data = localStorage.getItem('search'); 
        console.log(JSON.parse(data));
        if (data) {
            const parseData = JSON.parse(data);
            setSearch({
                ...search,
                user: parseData.user,
                token: parseData.token

            })
            console.log(parseData);
        }
        //eslint-disable-next-line
    }, [])

    return (
        <searchContext.Provider value={[
            search,
            setSearch
        ]}>
            {children}
        </searchContext.Provider>
    );
}

// custom hook
const usesearch = () => useContext(searchContext);

export {useSearch, searchProvider};