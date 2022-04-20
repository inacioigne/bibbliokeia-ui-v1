import React from "react";
import { useContext, useState, useEffect, useRef, fragment } from "react";
import {
  Container,
  Card,
  CardHeader,
  Avatar,
  Typography,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  CardContent,
  Box,
  Button,
  Dialog,
  styled,
  DialogTitle,
  Stack,
  Snackbar,
  ButtonGroup,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
} from "@mui/material";
import { MenuBook, MoreVert, Close, ArrowDropDown } from "@mui/icons-material";
import { ItemContext } from "src/admin/contexts/itemContext";

const options = [
  "Excluir Item",
  "Excluir Exemplares"
];


export default function BtnDelete() {
    const { checkboxExemplares, setCheckboxExemplares } = useContext(ItemContext);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openDell, setOpenDell] = useState(false);
  const handleClickDell = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
    if (selectedIndex == 1) {
        setCheckboxExemplares(true)
        console.log("ID: ", selectedIndex)

    }
    
    
  };
  const handleToggleDell = () => {
    setOpenDell((prevOpen) => !prevOpen);
  };
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpenDell(false);
    //console.log("MENU: ", index)
    if (index == 1) {
      setCheckboxExemplares(true)
      
     // console.log("ID: ", selectedIndex)
  } else if (index == 0) {
    setCheckboxExemplares(false)
  }
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenDell(false);
  };

  return (
    <React.Fragment>
    
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button onClick={handleClickDell}>{options[selectedIndex]}</Button>
        <Button
          size="small"
          aria-controls={openDell ? "split-button-menu" : undefined}
          aria-expanded={openDell ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggleDell}
        >
          <ArrowDropDown />
        </Button>
      </ButtonGroup>
      <Popper
        open={openDell}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      // disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
