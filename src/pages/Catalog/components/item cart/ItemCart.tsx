import "./itemCart.css";

import {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";

import {Link} from "react-router-dom";

// import UI components
import BuyButton from "../../../../UI components/buy button/ButButton.tsx";
import brandsLogoModule from "../../../../brands imgs module/brands module/BrandsLogoModule.ts";

export default function ItemCart({ item, addItemFunction }: { item: any, addItemFunction: () => void }) {

    const favorites = useSelector((state:any) => state.favorites);
    const dispatch = useDispatch();

    const setProductForTemplate = (product:any) => {
        dispatch({type: "SET_PRODUCT_FOR_TEMPLATE", payload: product});
    }

    const addProductToFavorite = (item:any) => {
        if (!favorites.includes(item)) {
            dispatch({type: "ADD_PRODUCT_IN_FAVORITES", payload: item});
        } else {
            dispatch({type: "DELETE_PRODUCT_IN_FAVORITES", payload: item.id});
        }
    }

    const isFavorite = favorites.some((fav:any) => fav.id === item.id);

    useEffect(() => {
        console.log(favorites);
        fetch(`http://localhost:1405/api/getFavorites`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(favorites),
        })
    }, [favorites]);

    return (
        <>
            <div className="itemCartMain">
                <div className="itemCartImg">
                    <Link to="/template" onClick={() => setProductForTemplate(item)}>
                        <img src={item.img}/>
                    </Link>
                </div>
                <div className="nameIconsPriceButtons">
                    <div className="name">
                        <h1>{item.name} <img src={brandsLogoModule(item.brand)} className="logoImg"/> <img
                            src={isFavorite ? "https://img.icons8.com/?size=64&id=qOp2Va50blig&format=png" : "https://img.icons8.com/?size=100&id=87&format=png"}
                            onClick={() => addProductToFavorite(item)}
                            id={`favorite-${item.id}`}
                        /></h1>
                    </div>
                    <div className="itemCartAndIcons">
                        {item.iconsArray.map((iconSrc: string, index: number) => (
                            <div key={index} className="icons">
                                <img src={iconSrc} className="iconImg"/>
                            </div>
                        ))}
                    </div>
                    <div className="priceAndAddButton">
                        <h1>{item.price} ₽</h1>
                        <BuyButton addProductFunction={addItemFunction}/>
                    </div>
                </div>
            </div>
        </>
    );
}
