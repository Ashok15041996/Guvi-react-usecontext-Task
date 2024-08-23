// src/context/CartContext.js
import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
    products: [
        {
            id: 1,
            title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            price: 109.95,
            quantity: 1,
        },
        // Add other products here...
    ],
};

function cartReducer(state, action) {
    switch (action.type) {
        case 'INCREASE_QUANTITY':
            return {
                ...state,
                products: state.products.map(product =>
                    product.id === action.payload ? { ...product, quantity: product.quantity + 1 } : product
                ),
            };
        case 'DECREASE_QUANTITY':
            return {
                ...state,
                products: state.products.map(product =>
                    product.id === action.payload && product.quantity > 1
                        ? { ...product, quantity: product.quantity - 1 }
                        : product
                ),
            };
        case 'REMOVE_ITEM':
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.payload),
            };
        default:
            return state;
    }
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const increaseQuantity = (id) => {
        dispatch({ type: 'INCREASE_QUANTITY', payload: id });
    };

    const decreaseQuantity = (id) => {
        dispatch({ type: 'DECREASE_QUANTITY', payload: id });
    };

    const removeItem = (id) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
    };

    return (
        <CartContext.Provider value={{ state, increaseQuantity, decreaseQuantity, removeItem }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
