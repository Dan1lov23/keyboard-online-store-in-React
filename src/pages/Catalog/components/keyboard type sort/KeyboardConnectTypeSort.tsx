import "./keyboardConnectTypeSort.css"
import { Checkbox } from "@mui/material";
import { productsArray } from "../../../../products/products array/products array.tsx";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import * as React from "react";

export default function KeyboardConnectTypeSort({ setProductsArray }:{setProductsArray:any}) {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const allConnectTypes = ["провод", "безпровод", "провод/безпровод"]

    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    const handleCheckboxChange = (type: string, checked: boolean) => {
        if (checked) {
            setSelectedTypes(prev => [...prev, type]);
        } else {
            setSelectedTypes(prev => prev.filter(b => b !== type));
        }
    };

    useEffect(() => {
        if (selectedTypes.length === 0) {
            setProductsArray(productsArray);
        } else {
            const filtered = productsArray.filter(product =>
                selectedTypes.includes(product.connectionType)
            );
            setProductsArray(filtered);
        }
    }, [selectedTypes]);

    return (
        <div className="brandsSortMain">
            <div className="keyboardTypeSortMain">
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <button className="searchButton">
                        <h4>тип подключения</h4>
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
                    {allConnectTypes.map((item: string, index: number) => (
                        <div className="typeCheck" key={index}>
                            <p>{item}</p>
                            <Checkbox
                                onChange={(e) => handleCheckboxChange(item, e.target.checked)}
                                checked={selectedTypes.includes(item)}
                            />
                        </div>
                    ))}
                </Menu>
            </div>
        </div>
    );
}
