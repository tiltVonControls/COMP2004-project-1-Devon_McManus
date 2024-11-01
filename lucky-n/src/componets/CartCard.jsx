export default function CartCard(props) {
    return (
        <div>
            <img src={props.image} alt={props.productName} className="img" width = "100px"/>
            <h1>{props.productName}</h1>
            <p>{props.brand}</p>
            <p>{props.quantity}</p>
            <p>${props.price}</p>
        </div>
    )
}