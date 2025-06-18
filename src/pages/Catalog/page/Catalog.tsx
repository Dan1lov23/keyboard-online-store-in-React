import "./catalog.css";

import ItemCart from "../components/item cart/ItemCart.tsx"
import SortHeader from "../components/sort header/sortHeader.tsx"

import {useSelector, useDispatch} from "react-redux";

import {useEffect, useState} from "react";

import {productsArray} from "../../../products/products array/products array.tsx";

import type Product from "../../../inteface anf types/interfaces.ts";

import PageSwitcher from "../../../UI components/page swithers UI components/page switcher/PageSwitcher.tsx";
import NextPageSwitcher from "../../../UI components/page swithers UI components/next page switch/NextPageSwitcher.tsx";
import PrevPageSwitcher from "../../../UI components/page swithers UI components/prev page switcher/PrevPageSwitcher.tsx";

export default function Catalog() {

    const [catalog, setCatalog] = useState<any[]>([]);

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPageLimit = 4;

    const indexOfLastProduct = currentPage * itemsPageLimit;
    const indexOfFirstProduct = indexOfLastProduct - itemsPageLimit;
    const currentProducts = catalog.slice(indexOfFirstProduct, indexOfLastProduct);

    const dispatch = useDispatch();
    const itemsArray = useSelector((state:any) => state.itemsArray);

    const pageCheck = catalog.length / itemsPageLimit;

    const addItemFunction = (item: Product) => {
        if (itemsArray.some((cartItem: Product) => cartItem.id === item.id)) {
            dispatch({ type: "INCREMENT_PRODUCT_COUNTER", payload: { id: item.id } });
            console.log("Товар добавлен");
        } else {
            dispatch({ type: 'ADD_PRODUCT', payload: item });
            console.log("Такой товар уже есть в корзине");
        }
        dispatch({type: "INCREMENT_SUM", payload: item.price});
    }

    useEffect(() => {
        console.log(itemsArray)
        setCatalog(productsArray);
    }, [itemsArray])

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    return (
        <>
            <div className="catalogMain">
                <SortHeader setProductsArray={setCatalog} />
                <div className="productsList">
                    {currentProducts.map((item:Product, index:number) => (
                        <div key={index}>
                            <ItemCart item={item} addItemFunction={() => addItemFunction(item)} />
                        </div>
                    ))}
                </div>
            </div>
            <div style={{textAlign: "center", marginTop: "3%"}}>
                {currentPage === 1 ? (
                    <div>
                        <h2>страница {currentPage}</h2>
                        <NextPageSwitcher nextPageFunction={nextPage} />
                    </div>
                ) : (
                    <div>
                        {currentPage < pageCheck ? (
                            <div>
                                <h2>страница {currentPage}</h2>
                                <PageSwitcher nextPageFunction={nextPage} previousPageFunction={prevPage}/>
                            </div>
                        ) : (
                            <div>
                                <h2>страница {currentPage}</h2>
                                <PrevPageSwitcher previousPageFunction={prevPage}/>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}
