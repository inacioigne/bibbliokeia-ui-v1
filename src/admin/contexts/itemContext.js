import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "../../services/api"

export const ItemContext = createContext({})

export const ItemProvider = ({ children }) => {
    const router = useRouter();
    const { item_id } = router.query
   
    const [item, setItem] = useState(null);
    const [rowsEx, setRowsEx] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openSnack, setOpenSnack] = useState()
    const [checkboxExemplares, setCheckboxExemplares] = useState(false);

    const getData = async () => {
        const response = await api.get(`cataloging/item/${item_id}`);
        setItem(response.data)
        
    }

    

  const getExemplar = async () => {
    const response = await api.get(`cataloging/exemplar/${item_id}`);
    const exm = response.data.exemplares.map((i) => {
          
                return {
                  id: i.id,
                  Biblioteca: i.library,
                  Localização: i.shelf,
                  Chamada: i.callnumber,
                  Volume: i.volume,
                  Exemplar: i.ex,
                  Registro: i.number,
                  Status: i.status                  
                }
              })
              setRowsEx(exm)
             

}

    useEffect(() => {
        getData()
        getExemplar()
      }, [])


    return <ItemContext.Provider value={{item_id, 
    item, rowsEx, setItem, setRowsEx, getData, 
    getExemplar, openModal, setOpenModal,
    openSnack, setOpenSnack, 
    checkboxExemplares, setCheckboxExemplares}}>
        { children}
    </ItemContext.Provider>
}