import {Container, Card } from "@mui/material/";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
//import Button from "@mui/material/Button";
import { useForm, Controller } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useContext, useState } from "react";
import { AuthContext } from "src/admin/contexts/AuthContext";

export default function Login() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { user, signIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  async function handleSignIn(data) {
    setLoading(!loading)
    const res = await signIn(data);
  }
  
  

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        //bgcolor: 'text.disabled' 
      }}
    >
      <Card
      sx={{ minWidth: 275, p: 2 }}
        // sx={{
        //   p: 2,
        //   width: 300,
        //   height: 300,
        //   border: 1,
        //   borderRadius: 2,
        // }}
      >
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          sx={{ textAlign: "center" }}
        >
          BiblioKeia
        </Typography>
        <form onSubmit={handleSubmit(handleSignIn)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Controller
              control={control}
              name="username"
              rules={{ required: true }}
              render={({ field }) => (
                <TextField  {...field} label="Usuário" variant="standard" />
              )}
            />
             {errors.username?.type === 'required' && "Entre com o nome de usuário"}
            <Controller
              control={control}
              name="password"
              rules={{ required: true }}
              render={({ field }) => (
                <TextField {...field} label="Senha" variant="standard" />
              )}
            />
             {errors.password && "Você esqueceu a senha"}
            
            <LoadingButton
              onClick={handleSubmit(handleSignIn)}
              loading={loading}
              variant="contained"
        
            >
              Login
            </LoadingButton>
          </Box>
        </form>
      </Card>
    </Container>
  );
}
