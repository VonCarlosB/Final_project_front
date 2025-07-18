export default function Product({product}){
    return(
        <>
            <div className="productView">
                <h2>{product.name}</h2>
                <h4>{product.owner}</h4>
                <p>{product.description}</p>
                <p>{product.price}€</p>
            </div>
        </>
    )
}