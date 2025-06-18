import "./sortHeader.css";

import {productsArray} from "../../../../products/products array/products array.tsx";

import SearchInput from "../search input/SearchInput.tsx";
import KeyboardConnectTypeSort from "../keyboard type sort/KeyboardConnectTypeSort.tsx";
import KeyboardType from "../keyboard type/KeyboardTypeSort.tsx";
import MainSortButton from "../main sort button/MainSortButton.tsx"
import BrandsSort from "../brands sort/BrandsSort.tsx";
import KeyBacklightSort from "../ key backlight sort/KeyBacklightSort.tsx";
import PriceSort from "../price sort/PriceSort.tsx";

export default function SortHeader({setProductsArray}:{setProductsArray:any}) {

    const highPriceSort = () => {
        const sortedArray = [...productsArray].sort((a, b) => b.price - a.price);
        setProductsArray(sortedArray);
    }

    const lowPriceSort = () => {
        const sortedArray = [...productsArray].sort((a, b) => a.price - b.price);
        setProductsArray(sortedArray);
    }

    return (
        <>
            <div className="sortHeaderMain">
                <div className="main">
                    <SearchInput/>
                    <h2>По цене</h2>
                    <MainSortButton heightPriceSort={highPriceSort} lowPriceSort={lowPriceSort} />
                    <PriceSort setProductsArray={setProductsArray} />
                    <h2>Производители</h2>
                    <BrandsSort setProductsArray={setProductsArray}/>
                    <h2>Тип клавиатуры</h2>
                    <KeyboardType setProductsArray={setProductsArray}/>
                    <h2>Тип подключения</h2>
                    <KeyboardConnectTypeSort setProductsArray={setProductsArray}/>
                    <h2>Подсветка</h2>
                    <KeyBacklightSort setProductsArray={setProductsArray}/>
                </div>
            </div>
        </>
    )
}
