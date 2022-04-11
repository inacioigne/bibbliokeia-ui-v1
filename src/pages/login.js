import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, Controller } from "react-hook-form";
import api from "../services/api"
import qs from 'qs';
import { setCookie } from "nookies"
import { useContext } from 'react';
import { AuthContext } from 'src/admin/contexts/AuthContext';




export default function Login() {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            username: "",
            password: ""
          }
    });
    //const contxt = useContext(AuthContext)
    const { user, signIn } = useContext(AuthContext);
    //console.log("LOGIN: ", user)

    async function handleSignIn(data) {
      
      const res = await signIn(data)
      console.log(res)
    }


    
    return (
        <Container sx={{
        display: "flex", justifyContent: "center", alignItems: "center",
        height:"100vh"
        }}>
        <Box sx={{
            p: 2,
        width: 300,
        height: 300,
        border: 1,
        borderRadius: 2}}>
        <Typography variant="h4" gutterBottom component="div" sx={{textAlign: "center"}}>
        BiblioKeia
      </Typography>
        <form onSubmit={handleSubmit(handleSignIn)}>
        <Box sx={{display: "flex", flexDirection: "column", gap: 3}}>
        <Controller 
         control={control}
         name="username"
         render={({ field }) => (
                  <TextField
                    {...field}
                    label="Usuário"
                    variant="standard"
                  />
                )}
          />
          <Controller 
         control={control}
         name="password"
         render={({ field }) => (
                  <TextField
                    {...field}
                    label="Senha"
                    variant="standard"
                  />
                )}
          />
        {/* <TextField id="username" label="Usuário" variant="standard" />
        <TextField id="password" label="Senha" variant="standard" /> */}
        <Button variant="contained" type="submit">Entrar</Button>
        </Box>
        
        </form>
    

        </Box>

         

        </Container>
       
    )
}
