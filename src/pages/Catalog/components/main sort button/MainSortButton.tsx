import "./mainSortButton.css";

import * as React from 'react';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function MainSortButton({heightPriceSort, lowPriceSort}:{heightPriceSort: () => void, lowPriceSort: () => void}) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="mainSortButtonMain">
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <button className="searchButton">
                    <h4>сортировка по цене</h4>
                </button>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={lowPriceSort} className="sortButton">По цене ↑</MenuItem>
                <MenuItem onClick={heightPriceSort} className="sortButton">По цене ↓</MenuItem>
            </Menu>
        </div>
    );
}
