import "./cartProductsListMain.css";

import {useDispatch, useSelector} from "react-redux";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faMinus, faTrash, faX} from "@fortawesome/free-solid-svg-icons";

import type Product from "../../../../inteface anf types/interfaces.ts";
import {useEffect} from "react";

export default function CartMain() {

    const sum = useSelector((state:any) => state.sum);
    const itemsArray = useSelector((state:any) => state.itemsArray);
    const isLogin = useSelector((state:any) => state.isLogin);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(itemsArray.length);
    }, [itemsArray]);

    const deleteCart = () => {
        dispatch({type: "DELETE_CART"});
        dispatch({type: "DELETE_SUM"});
    }

    const deleteProductForCart = (product:Product) => {
        dispatch({type: "DECREMENT_SUM", payload: product.price * product.itemCounter});
        dispatch({type: "DELETE_PRODUCT_FOR_CART", payload: product.id});
    }

    const deleteItem = (product:Product) => {
        if (product.itemCounter === 0) {
            dispatch({type: "DELETE_PRODUCT_FOR_CART", payload: product.id});
        } else if (product.itemCounter > 0) {
            dispatch({type: "DECREMENT_SUM", payload: product.price});
            product.itemCounter -= 1;
        }
    }

    if (itemsArray.length === 0) {
        return (
            <div className="empty-cart">
                <h2>Корзина пуста</h2>
                <p>Добавьте товары из каталога</p>
            </div>
        );
    }

    const addProductFunction = (item: Product) => {
        if (itemsArray.some((cartItem: Product) => cartItem.id === item.id)) {
            dispatch({ type: "INCREMENT_PRODUCT_COUNTER", payload: { id: item.id } });;
        } else {
            dispatch({ type: 'ADD_PRODUCT', payload: item });
        }
        dispatch({type: "INCREMENT_SUM", payload: item.price});
    }

    const payCart = () => {
        if (isLogin === false) {
            alert("Чтобы оплатить товары вам нужно войти в аккаунт")
        } else if (isLogin === true) {
            alert("Корзина оплачена");
            dispatch({type: "DELETE_CART"});
            dispatch({type: "DELETE_SUM"});
        }
    }

    return (
        <div className="cart-container">
            <div className="debug-info">
                {JSON.stringify({itemsArray})}
            </div>
            <div className="cart-header">
                <h1>Корзина</h1>
                <div className="cart-total">
                    Итого: {sum.toLocaleString()} ₽
                </div>
                <button
                    className="delete-btn"
                    onClick={() => deleteCart()}
                >
                    <FontAwesomeIcon icon={faX} />
                </button>
            </div>

            <div className="cart-items">
                {itemsArray.map((product: Product, index: number) => (
                    product.itemCounter > 0 && (
                        <div key={index} className="cart-item">
                            <img
                                src={product.img}
                                alt={product.name}
                                className="cart-item-image"
                            />
                            <div className="cart-item-info">
                                <h2 className="cart-item-name">{product.name}</h2>
                                <p className="cart-item-price">{product.price.toLocaleString()} ₽</p>
                            </div>
                            <div className="cart-item-controls">
                                <div className="quantity-control">
                                    <button
                                        className="quantity-btn"
                                        onClick={() => deleteItem(product)}
                                    >
                                        <FontAwesomeIcon icon={faMinus}/>
                                    </button>
                                    <span className="quantity-display">{product.itemCounter}</span>
                                    <button
                                        className="quantity-btn"
                                        onClick={() => addProductFunction(product)}
                                    >
                                        <FontAwesomeIcon icon={faPlus}/>
                                    </button>
                                    <button className="delete-btn" onClick={() => deleteProductForCart(product)}>
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                ))}
                <div className="payCart">
                    <button className="payBtn" onClick={() => payCart()}>
                        Оплатить товары
                    </button>
                </div>
            </div>
        </div>
    );
}
