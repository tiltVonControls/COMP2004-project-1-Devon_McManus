export default function NavBar({ cart, toggleCartVisibility }) {
    return (
        <div className="NavBar">
            <div className="NavTitle">
                <h1>THE STORE OF SHOPPING</h1>
            </div>
            <div className="NavCart">
                <img 
                    src={cart.length > 0 ? "src/assets/cart-full.png" : "src/assets/cart-empty.png"} 
                    alt="Cart"
                    onClick={toggleCartVisibility}
                    width = "50px"
                />
                <span>{cart.length}</span>
            </div>
        </div>
    )
}
