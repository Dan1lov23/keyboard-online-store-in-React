import "./slider.css";

import {useState} from "react";

import type Product from "../../../../inteface anf types/interfaces.ts"

export default function Slider({product}:{product:Product}) {

    const [activeImg, setActiveImg] = useState(product.imgForSlider[0]);

    const activeImgFunction = (imgSrc:string) => {
        setActiveImg(imgSrc);
    }

    const nextSliderImg = (imgArray:[string, string, string, string, string] ) => {
        for (let a = 0; a <= imgArray.length; a++) {
            if (activeImg === imgArray[imgArray.length - 1]) {
                setActiveImg(imgArray[0]);
            }
            if (imgArray[a] === activeImg) {
                setActiveImg(imgArray[a + 1]);
            }
        }
        console.log(imgArray[imgArray.length - 1]);
    }

    return (
        <>
            <div className="sliderMain">
                <div className="imgCarousel">
                    {product.imgForSlider.map((img: string, index: number) => (
                        <div key={index} onClick={() => activeImgFunction(img)}>
                            <img src={img}/>
                        </div>
                    ))}
                </div>
                <div className="mainImg">
                    <img src={activeImg} onClick={() => nextSliderImg(product.imgForSlider)}/>
                </div>
            </div>
        </>
    )
}
