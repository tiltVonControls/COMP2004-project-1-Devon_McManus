import ProductCard from "./ProductCard";
import products from "../data/products";

export default function ProductContainer({ handleCart }) {
    return (
        <div className="ProductsContainer">
            {products.map((item) => (
                <ProductCard
                    key={item.id}
                    {...item}
                    handleCart={handleCart}
                />
            ))}
        </div>
    );
}
