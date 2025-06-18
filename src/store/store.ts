import { createStore } from 'redux';

// Определяем интерфейсы для элементов массива и состояния
interface Item {
    id: number;
    itemCounter: number;
    // добавьте другие свойства, если есть
}

interface DefaultState {
    itemsArray: Item[];
    productForTemplate: any; // уточните тип, если есть
    sum: number;
    favorites: Item[];
}

// Начальное состояние с типами
const defaultState: DefaultState = {
    itemsArray: [],
    productForTemplate: {},
    sum: 0,
    favorites: [],
};

// Определяем тип действия
interface Action {
    type:
        | 'ADD_PRODUCT'
        | 'INCREMENT_PRODUCT_COUNTER'
        | 'REMOVE_PRODUCT'
        | 'DELETE_PRODUCT_FOR_CART'
        | 'SET_PRODUCT_FOR_TEMPLATE'
        | 'INCREMENT_SUM'
        | 'DECREMENT_SUM'
        | 'DELETE_SUM'
        | 'ADD_PRODUCT_IN_FAVORITES'
        | 'DELETE_PRODUCT_IN_FAVORITES'
        | 'DELETE_CART';

    payload?: any; // уточните типы для payload в каждом случае ниже
}

// Типизация редьюсера
const reducer = (state: DefaultState = defaultState, action: Action): DefaultState => {
    switch (action.type) {
        case "ADD_PRODUCT":
            return {
                ...state,
                itemsArray: [...state.itemsArray, action.payload],
            };

        case "INCREMENT_PRODUCT_COUNTER": {
            if (
                !action.payload ||
                typeof action.payload !== 'object' ||
                !('id' in action.payload)
            )
                return state;

            const { id } = action.payload as { id: number };

            return {
                ...state,
                itemsArray: state.itemsArray.map(item =>
                    item.id === id
                        ? { ...item, itemCounter: item.itemCounter + 1 }
                        : item
                ),
            };
        }

        case "REMOVE_PRODUCT":
        case "DELETE_PRODUCT_FOR_CART":
            if (typeof action.payload !== 'number') return state;
            return {
                ...state,
                itemsArray: state.itemsArray.filter(item => item.id !== action.payload),
            };

        case "SET_PRODUCT_FOR_TEMPLATE":
            return {
                ...state,
                productForTemplate: action.payload,
            };

        case "INCREMENT_SUM":
            if (typeof action.payload !== 'number') return state;
            return {
                ...state,
                sum: state.sum + action.payload,
            };

        case "DECREMENT_SUM":
            if (typeof action.payload !== 'number') return state;
            return {
                ...state,
                sum: state.sum - action.payload,
            };

        case "DELETE_SUM":
            return {
                ...state,
                sum: 0,
            };

        case "ADD_PRODUCT_IN_FAVORITES":
            return {
                ...state,
                favorites: [...state.favorites, action.payload],
            };

        case "DELETE_PRODUCT_IN_FAVORITES":
            if (typeof action.payload !== 'number') return state;
            return {
                ...state,
                favorites: state.favorites.filter(item => item.id !== action.payload),
            };

        case "DELETE_CART":
            return {
                ...state,
                itemsArray: [],
            };

        default:
            return state;
    }
};

// Создаем хранилище
const store = createStore(reducer);

export default store;