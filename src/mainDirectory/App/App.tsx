import "./App.css";

import Header from "../../UI components/header/Header.tsx";
import Catalog from "../../pages/Catalog/page/Catalog.tsx"
import Cart from "../../pages/Cart/page/Cart.tsx"
import Template from "../../pages/Template/page/Template.tsx"
import Favorites from "../../pages/Favorites/page/Favorites.tsx";
import Login from "../../pages/Login/page/Login.tsx"
import Register from "../../pages/Register/page/Register.tsx"
import Home from "../../pages/Home/page/Home.tsx"
import User from "../../pages/User/page/User.tsx";

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


    useEffect(() => {
        console.log("itemsArray", itemsArray);
        dispatch({type: "IS_LOGIN", payload: false});
    }, []);


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
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/registration" element={<Register/>}/>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/user" element={<User/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}
