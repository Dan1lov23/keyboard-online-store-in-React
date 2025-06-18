import "./header.css"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faKeyboard} from "@fortawesome/free-solid-svg-icons"

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";

export default function Header() {
    return (
        <div className="headerMain">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className="logoTitle">
                            MyKeyboards <FontAwesomeIcon icon={faKeyboard} />
                        </Typography>
                        <div className="links">
                            <Link to="/catalog" className="link">
                                каталог
                            </Link>
                            <Link to="/cart" className="link">
                                корзина
                            </Link>
                            <Link to="/favorites" className="link">
                                избранное
                            </Link>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}
