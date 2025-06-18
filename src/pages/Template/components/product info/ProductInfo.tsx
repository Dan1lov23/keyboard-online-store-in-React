import "./productInfo.css";
// import UI components
import BuyButton from "../../../../UI components/buy button/ButButton.tsx";

import {useSelector, useDispatch} from "react-redux";

import {useEffect} from "react";

export default function ProductInfo({product, addProductFunction}:{product:any, addProductFunction: any}) {

    const dispatch = useDispatch();
    const favorites = useSelector((state:any) => state.favorites);

    const addProductToFavorite = (product:any) => {
        const heart = document.getElementById(product.name) as HTMLImageElement;
        if (heart.src === "https://img.icons8.com/?size=100&id=87&format=png") {
            heart.src = "https://img.icons8.com/?size=64&id=qOp2Va50blig&format=png"
            dispatch({type: "ADD_PRODUCT_IN_FAVORITES", payload: product});
        } else {
            heart.src = "https://img.icons8.com/?size=100&id=87&format=png"
            dispatch({type: "DELETE_PRODUCT_IN_FAVORITES", payload: product.id});
        }
        console.log(heart.src)
    }

    const favoriteCheck = (product:any) => {
        if (favorites.includes(product)) {
            const heart = document.getElementById(product.name) as HTMLImageElement;
            heart.src = "https://img.icons8.com/?size=64&id=qOp2Va50blig&format=png"
        }
    }

    useEffect(() => {
        favoriteCheck(product);
    }, [])

    return (
        <>
            <div className="productInfoMain">
                <div className="productName">
                    <h1>{product.name}</h1>
                </div>
                <div className="addFavoritePrice">
                    <h2>{product.price} ₽ <img src="https://img.icons8.com/?size=100&id=87&format=png" id={product.name} onClick={() => addProductToFavorite(product)} className="heartIcon"/></h2>
                    <BuyButton addProductFunction={() => addProductFunction(product)}/>
                </div>
                <div className="characteristicsTitle">
                    <h1>Характеристики</h1>
                </div>
                <div className="productСharacteristics">
                    <div className="characteristicsRow1">
                        <h2>Тип клавиатуры</h2>
                        <p>{product.specificity} клавиатура</p>
                        <p>Тип клавиатуры - {product.type}</p>
                        <h2>Габариты вес</h2>
                        <p>Ширина - {product.width}</p>
                        <p>Высота - {product.height}</p>
                    </div>
                    <div className="characteristicsRow2">
                        {product.switchModel.length > 0 ? (
                            <div>
                                <h2>Переключатели</h2>
                                <p>{product.switchModel}</p>
                            </div>
                        ) : (
                            <p></p>
                        )}
                        <h2>Подключение и интерфейсы</h2>
                        <p> Тип подключения - провод/беспровод</p>
                        <p>(Bluetooth, USB Type-A, радиоканал)</p>
                    </div>
                </div>
            </div>
        </>
    )
}