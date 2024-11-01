import { useState } from "react";
import ProductContainer from "./ProductsContainer";
import NavBar from "./NavBar";

export default function GroceriesAppContainer({ products }) {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [productNames, setProductNames] = useState("");  // State to track concatenated product names
    const [cartVisible, setCartVisible] = useState(false);

    const handleCart = (product) => {
        const existingItem = cart.find((cartItem) => cartItem.id === product.id);
        const priceWithoutDollarSign = parseFloat(product.price.replace("$", ""));
        const productTotal = priceWithoutDollarSign * product.quantity;

        if (existingItem) {
            setCart(
                cart.map((cartItem) =>
                    cartItem.id === product.id
                        ? { ...cartItem, quantity: cartItem.quantity + product.quantity }
                        : cartItem
                )
            );
        } else {
            setCart([...cart, { ...product }]);
        }

        setTotal(prevTotal => prevTotal + productTotal);
        setProductNames(productNames + product.productName + " ");  // Concatenate product names
    };

    const incrementItem = (product) => {
        const existingItem = cart.find((cartItem) => cartItem.id === product.id);
        if (existingItem) {
            setCart(
                cart.map((cartItem) =>
                    cartItem.id === product.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                )
            );
            const priceWithoutDollarSign = parseFloat(product.price.replace("$", ""));
            setTotal(prevTotal => prevTotal + priceWithoutDollarSign);
        }
    };

    const decrementItem = (product) => {
        const existingItem = cart.find((cartItem) => cartItem.id === product.id);
        if (existingItem.quantity > 1) {
            setCart(
                cart.map((cartItem) =>
                    cartItem.id === product.id
                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                        : cartItem
                )
            );
            const priceWithoutDollarSign = parseFloat(product.price.replace("$", ""));
            setTotal(prevTotal => prevTotal - priceWithoutDollarSign);
        } else {
            removeItem(product);
        }
    };

    const removeItem = (product) => {
        const existingItem = cart.find((cartItem) => cartItem.id === product.id);
        if (existingItem) {
            const priceWithoutDollarSign = parseFloat(product.price.replace("$", ""));
            const productTotal = priceWithoutDollarSign * existingItem.quantity;
            setCart(cart.filter((cartItem) => cartItem.id !== product.id));
            setTotal(prevTotal => prevTotal - productTotal);
            setProductNames(productNames.replace(new RegExp(`${product.productName} `, 'g'), ""));  // Remove all occurrences of the product name
        }
    };

    const clearCart = () => {
        setCart([]);
        setTotal(0);
        setProductNames("");
    };

    const toggleCartVisibility = () => {
        setCartVisible(!cartVisible);
    };

    return (
        <div>
            <NavBar cart={cart} toggleCartVisibility={toggleCartVisibility} />
            <ProductContainer handleCart={handleCart} products={products} />
            {cartVisible && (
                <div className="CartContainer">
                    <ul>
                        {cart.length === 0 ? (
                            <li>The cart is empty</li>
                        ) : (
                            cart.map((item) => (
                                <li key={item.id}>
                                    {item.productName} - {item.quantity} x {item.price}
                                    <button onClick={() => incrementItem(item)}>+</button>
                                    <button onClick={() => decrementItem(item)}>-</button>
                                    <button onClick={() => removeItem(item)}>Remove</button>
                                </li>
                            ))
                        )}
                    </ul>
                    <h3>Total: ${total.toFixed(2)}</h3>  {/* Display total with $ and two decimal places */}
                    <h4>Products in Cart: {productNames}</h4>  {/* Display concatenated product names */}
                    <button onClick={clearCart}>Clear Cart</button>  {/* Button to clear the cart */}
                </div>
            )}
        </div>
    );
}
