import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import {allProductsForSearch} from "../../../../products/products array/products array.tsx"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

import {useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';

import {productsArray} from "../../../../products/products array/products array.tsx";

import "./searchInput.css"

export default function SearchInput() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const allProducts = allProductsForSearch();

    const findProduct = () => {
        const input = document.getElementById("searchInput") as HTMLInputElement;
        const productName = input.value;
        let product = {};
        for (let a = 0; a < productsArray.length; a++) {
            if (productName === productsArray[a].name) {
                product = productsArray[a];
            }
        }
        dispatch({type: "SET_PRODUCT_FOR_TEMPLATE", payload: product});
        navigate('/template');
    }

    return (
        <div className="searchInputMain">
            <Autocomplete
                disablePortal
                options={allProducts}
                sx={{ width: 240 }}
                id="searchInput"
                renderInput={(params) => <TextField {...params} label="найти товар" />}
            />
            <button onClick={findProduct} className="searchButton">
                <h3><FontAwesomeIcon icon={faMagnifyingGlass} /></h3>
            </button>
        </div>
    );
}