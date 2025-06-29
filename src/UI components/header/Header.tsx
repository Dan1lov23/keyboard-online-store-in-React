import "./header.css"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faKeyboard, faHome, faHeart, faCartShopping, faUser} from "@fortawesome/free-solid-svg-icons"

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";

import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import * as React from "react";

import {useDispatch} from "react-redux";

export default function Header() {

    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const logoutFunction = () => {
        dispatch({type: "IS_LOGIN", payload: false});
        localStorage.setItem("token", "");
        localStorage.setItem("role", "");
        localStorage.setItem("username", "");
        alert("Вы вышли из аккаунта");
    }

    return (
        <div className="headerMain">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className="logoTitle">
                            MyKeyboards <FontAwesomeIcon icon={faKeyboard} />
                        </Typography>
                        <div className="links">
                            <Link to="/home" className="link">
                                <FontAwesomeIcon icon={faHome} />
                            </Link>
                            <Link to="/catalog" className="link">
                                <FontAwesomeIcon icon={faKeyboard} />
                            </Link>
                            <Link to="/cart" className="link">
                                <FontAwesomeIcon icon={faCartShopping} />
                            </Link>
                            <Link to="/favorites" className="link">
                                <FontAwesomeIcon icon={faHeart} />
                            </Link>
                            <Button aria-describedby={id} variant="contained" onClick={handleClick} className="link" style={{width:'1px'}}>
                                <FontAwesomeIcon icon={faUser} />
                            </Button>
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            >
                                <Typography sx={{ p: 2 }}>
                                    <div className="userMenu" style={{display: 'grid'}}>
                                        <div onClick={() => logoutFunction()} className="logout">
                                            <button style={{width: "80px", height: "30px",backgroundColor: "#e74c3c", border: "none", borderRadius: "10px", color: "white", cursor: "pointer"}} onClick={logoutFunction}>
                                                Logout
                                            </button>
                                        </div>
                                        <Link to="/user">
                                            <p>Profile</p>
                                        </Link>
                                        <Link to="/login">
                                            <p>Login</p>
                                        </Link>
                                        <Link to="/registration">
                                            <p>Registration</p>
                                        </Link>
                                    </div>
                                </Typography>
                            </Popover>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}
