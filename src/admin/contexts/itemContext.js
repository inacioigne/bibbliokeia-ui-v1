import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "../../services/api"

export const ItemContext = createContext({})

export const ItemProvider = ({ children }) => {
    const router = useRouter();
    const { item_id } = router.query
   
    const [item, setItem] = useState(null);

    const getData = async () => {
        const response = await api.get(`cataloging/item/${item_id}`);
        setItem(response.data)
        
    }

    useEffect(() => {
        getData()
        //console.log("ITEM: ",item)
        
    
      }, [])

    

    
    



    return <ItemContext.Provider value={{item_id, item, setItem, getData}}>
        { children}
    </ItemContext.Provider>
}