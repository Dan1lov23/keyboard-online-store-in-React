import "./priceSort.css"
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import * as React from 'react';

import { productsArray } from "../../../../products/products array/products array.tsx";

export default function PriceSort({ setProductsArray }: { setProductsArray: any }) {

    const [value, setValue] = React.useState<number>(60000);

    const handleChange = (_event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setValue(newValue);
        }
    };

    const handleChangeCommitted = (
        _event: Event | React.SyntheticEvent,
        newValue: number | number[]
    ) => {
        if (typeof newValue === 'number') {
            const filteredArray = productsArray.filter(product => product.price <= newValue);
            setProductsArray(filteredArray);
        }
    };

    return (
        <div>
            <Box sx={{ width: 300 }}>
                <Slider
                    aria-label="Price range"
                    value={value}
                    onChange={handleChange}
                    onChangeCommitted={handleChangeCommitted}
                    step={1000}
                    marks
                    min={6700}
                    max={60000}
                    valueLabelDisplay="auto"
                />
            </Box>
        </div>
    );
}