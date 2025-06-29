import "./favoritesList.css";

import {useDispatch, useSelector} from "react-redux";

import ItemCart from "../../../Catalog/components/item cart/ItemCart.tsx"

export default function FavoritesList() {

    const dispatch = useDispatch();
    const favorites = useSelector((state:any) => state.favorites);
    const itemsArray = useSelector((state:any) => state.itemsArray);

    const addItemFunction = (item:any) => {
        if (itemsArray.some((item: any) => item.id === item.id)) {
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
            <div className="favoritesListMain">
                <div className="favoritesPageTitle">
                    <h1>Избранное</h1>
                </div>
                {favorites.length === 0 ? (
                    <div className="clearFavorites">
                        <p>Тут пусто : (</p>
                        <p>Добавьте понравившийся товар</p>
                    </div>
                ) : (
                    <div className="productsList">
                        {favorites.map((item: any) => (
                            <div key={item.id}>
                                <ItemCart item={item} addItemFunction={() => addItemFunction(item)}/>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
