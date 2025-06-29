import { createStore } from 'redux';

interface Item {
    id: number;
    itemCounter: number;
}

interface DefaultState {
    itemsArray: Item[];
    productForTemplate: any;
    sum: number;
    favorites: Item[];
    isLogin: boolean;
}

const defaultState:DefaultState = {
    itemsArray: [],
    productForTemplate: {},
    sum: 0,
    favorites: [],
    isLogin: false,
};

interface Action {
    type:
        | 'ADD_PRODUCT'
        | 'INCREMENT_PRODUCT_COUNTER'
        | 'REMOVE_PRODUCT'
        | 'DELETE_PRODUCT_FOR_CART'
        | 'SET_PRODUCT_FOR_TEMPLATE'
        | 'SET_SUM'
        | 'INCREMENT_SUM'
        | 'DECREMENT_SUM'
        | 'DELETE_SUM'
        | 'ADD_PRODUCT_IN_FAVORITES'
        | 'DELETE_PRODUCT_IN_FAVORITES'
        | 'DELETE_CART'
        | 'GET_CART_FROM_SERVER'
        | 'GET_CART_SUM_FROM_SERVER'
        | 'SET_CART'
        | 'IS_LOGIN'
        | 'SET_FAVORITES'
    ;

    payload?: any;
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

        case "SET_SUM": {
            return {
                ...state,
                sum: action.payload,
            }
        }

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

        case "SET_FAVORITES":
            return {
                ...state,
                favorites: action.payload,

            }

        case "GET_CART_SUM_FROM_SERVER":
            return {
                ...state,
                sum: action.payload,
            }

        case "SET_CART":
            return {
                ...state,
                itemsArray: action.payload,
            }
        case "DELETE_CART":
            return {
                ...state,
                itemsArray: [],
            };

        case 'IS_LOGIN':
            return {
               ...state,
               isLogin: action.payload,
            }


        default:
            return state;
    }
};

// Создаем хранилище
const store = createStore(reducer);

export default store;
