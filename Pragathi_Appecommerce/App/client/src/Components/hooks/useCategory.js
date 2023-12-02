import { useState,useEffect } from "react";
import axios from "axios";

export default function useCategory(){
    const [categories,setCategories]= useState([])


    //get categories
    const getCategories = async ()=>{
        try {
            const {data} = await axios.get(`http://localhost:8000/api/v1/category/get-all-category`); 
 
            if (data.success) {
                const t = data.category;
                setCategories(t)
            }

        } catch (error) {
            console.log(error);
          
        }
    }
    
    useEffect(() => { 
        getCategories();
        
    }, []);
 
    return categories;
}