import "./App.css";

import Header from "../../UI components/header/Header.tsx";
import Catalog from "../../pages/Catalog/page/Catalog.tsx"
import Cart from "../../pages/Cart/page/Cart.tsx"
import Template from "../../pages/Template/page/Template.tsx"
import Favorites from "../../pages/Favorites/page/Favorites.tsx";

import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import type Product from "../../inteface anf types/interfaces.ts";

export default function App() {

    const itemsArray = useSelector((state:any) => state.itemsArray);
    const dispatch = useDispatch();

    const productForTemplate = useSelector((state:any) => state.productForTemplate);

    useEffect(() => {
        console.log(productForTemplate);
    }, [productForTemplate]);

    const serverWorkCheck = () => {
        fetch(`http://localhost:1405/api/serverWorkCheck`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    }

    useEffect(() => {
        serverWorkCheck();
    }, [])

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

    return (
        <>
            <div className="appMain">
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route path="/catalog" element={<Catalog/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="/template" element={<Template product={productForTemplate} addProductFunction={addItemFunction}/>}/>
                        <Route path="/favorites" element={<Favorites/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}