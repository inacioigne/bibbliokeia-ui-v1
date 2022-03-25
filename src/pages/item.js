import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import api from "../services/api"

export default function Item() {
    const router = useRouter()
    //const [id, setId] = useState(router.query.id);
    const { id } = router.query
    const url = `/cataloguing/item/${id}/json`

    const [item, setItem] = useState();
    

  useEffect(() => {
    
    console.log(url)
    api
      .get(url)
      .then((response) => {
      setItem(response.data)
      console.log(response.data)})
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);


    return (
        <Container>
        <h1>{id}</h1>
        <p>Usuário: {item?.login}</p>
      <p>Biografia: {item?.bio}</p>

        </Container>
       
    )
}