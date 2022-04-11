import Box from "@mui/material/Box"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from 'src/admin/contexts/AuthContext';


function ScrollTop(props) {
    const { children, window } = props;

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
      });
    
    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
          '#back-to-top-anchor',
        );
    
        if (anchor) {
          anchor.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
    }  

    return (
        <Zoom in={trigger}>
          <Box
            onClick={handleClick}
            role="presentation"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
          >
            {children}
          </Box>
        </Zoom>
      );
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };



export default function Navbar(props) {
  const { user, signIn } = useContext(AuthContext);
    console.log("NAV: ", user)
  

    return (
        <>
        <CssBaseline />
        <Box sx={{ flexGrow: 1}}>
        <AppBar position="static">
        <Toolbar id="back-to-top-anchor">
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          BiblioKeia
          </Typography>
          <p>{user?.name}</p>
          <Button color="inherit">Login</Button>
        </Toolbar>
        </AppBar>  
        <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
        </ScrollTop>       
        </Box>
        </>
    )  
}