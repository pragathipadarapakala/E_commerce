import {useState, useEffect, useContext, createContext} from "react"; 

const CartContext = createContext();

const CartProvider = ({children}) => {

    const [cart,
        setCart] = useState([ ]);


        useEffect(()=>{
            let exisitngCartItem = localStorage.getItem('cart')
            if(exisitngCartItem)setCart(JSON.parse(exisitngCartItem))

            //eslint-next-line-disable
        },[])

  

    return (
        <CartContext.Provider value={[
            cart,
            setCart
        ]}>
            {children}
        </CartContext.Provider>
    );
}

// custom hook
const useCart = () => useContext(CartContext);

export {useCart, CartProvider};