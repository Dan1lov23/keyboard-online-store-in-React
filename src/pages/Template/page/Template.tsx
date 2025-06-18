import "./template.css";

import Slider from "../components/slider/Slider.tsx"
import ProductInfo from "../components/product info/ProductInfo.tsx";

export default function Template({product, addProductFunction}:{product:any, addProductFunction:any}) {
    return (
        <>
            <div className="templateMain">
                <Slider product={product}/>
                <ProductInfo product={product} addProductFunction={() => addProductFunction(product)}/>
            </div>
        </>
    )
}
