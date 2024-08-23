// src/App.js
import React from 'react';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';

function App() {
    return (
        <CartProvider>
            <Cart />
        </CartProvider>
    );
}

export default App;
