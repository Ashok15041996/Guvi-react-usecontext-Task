// src/components/Cart.js
import React from 'react';
import { useCart } from '../context/CartContext';

function Cart() {
    const { state, increaseQuantity, decreaseQuantity, removeItem } = useCart();

    const totalAmount = state.products.reduce((acc, product) => acc + product.price * product.quantity, 0);
    const totalQuantity = state.products.reduce((acc, product) => acc + product.quantity, 0);

    return (
        <div>
            <h2>Shopping Cart</h2>
            <div>
                {state.products.map(product => (
                    <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <div>
                            <h3>{product.title}</h3>
                            <p>Price: ${product.price}</p>
                            <p>Quantity: {product.quantity}</p>
                            <button onClick={() => increaseQuantity(product.id)}>+</button>
                            <button onClick={() => decreaseQuantity(product.id)}>-</button>
                        </div>
                        <div>
                            <button onClick={() => removeItem(product.id)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <h3>Total Quantity: {totalQuantity}</h3>
                <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
            </div>
        </div>
    );
}

export default Cart;
