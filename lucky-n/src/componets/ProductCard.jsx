import { useState } from "react";

export default function ProductCard({ handleCart, ...props }) {
    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => setQuantity(quantity + 1);
    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className="ProductCard">
            <ul>
                <img src={props.image} alt={props.productName} className="img"/>
                <h1>{props.productName}</h1>
                <p>{props.brand}</p>
                <p>{props.price}</p>
                <div className="quantity-control">
                    <button onClick={decrementQuantity}>-</button>
                    <span>{quantity}</span>
                    <button onClick={incrementQuantity}>+</button>
                </div>
                <button onClick={() => handleCart({ ...props, quantity })}>Add to cart</button>
            </ul>
        </div>
    )
}
