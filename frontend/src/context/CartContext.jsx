import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const cart = localStorage.getItem('cartItems');
        if (cart) {
            setCartItems(JSON.parse(cart));
        }
    }, []);

    const addToCart = (food) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.foodId === food._id);
            let newCart;
            if (existing) {
                newCart = prev.map(item =>
                    item.foodId === food._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                newCart = [...prev, { foodId: food._id, name: food.name, price: food.price, image: food.image, quantity: 1 }];
            }
            localStorage.setItem('cartItems', JSON.stringify(newCart));
            return newCart;
        });
    };

    const removeFromCart = (foodId) => {
        setCartItems(prev => {
            const newCart = prev.filter(item => item.foodId !== foodId);
            localStorage.setItem('cartItems', JSON.stringify(newCart));
            return newCart;
        });
    };

    const updateQuantity = (foodId, quantity) => {
        setCartItems(prev => {
            const newCart = prev.map(item =>
                item.foodId === foodId ? { ...item, quantity: quantity } : item
            );
            localStorage.setItem('cartItems', JSON.stringify(newCart));
            return newCart;
        });
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    // Calculate generic totals
    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal }}>
            {children}
        </CartContext.Provider>
    );
};
