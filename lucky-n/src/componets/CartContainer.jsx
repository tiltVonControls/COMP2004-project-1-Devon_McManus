import CartCard from "./CartCard"

export default function ProductContainer({ handleCart }) {
    return (
        <div>
            {products.map((item) => (
                <CartCard
                    key={item.id}
                    {...item}
                    handleCart={handleCart}
                />
            ))}
        </div>
    );
}
