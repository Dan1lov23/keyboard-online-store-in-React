import "./brandsSort.css"
import { allProductsBrands } from "../../../../products/products array/products array.tsx";
import { Checkbox } from "@mui/material";
import { productsArray } from "../../../../products/products array/products array.tsx";
import { useState, useEffect } from "react";

export default function BrandsSort({ setProductsArray }:{setProductsArray:any}) {
    const allBrands = allProductsBrands();

    // Храним выбранные бренды в состоянии
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

    // Обработчик изменения чекбокса
    const handleCheckboxChange = (brand: string, checked: boolean) => {
        if (checked) {
            setSelectedBrands(prev => [...prev, brand]);
        } else {
            setSelectedBrands(prev => prev.filter(b => b !== brand));
        }
    };

    // Эффект для фильтрации товаров при изменении выбранных брендов
    useEffect(() => {
        if (selectedBrands.length === 0) {
            // Если ничего не выбрано — показываем все товары
            setProductsArray(productsArray);
        } else {
            const filtered = productsArray.filter(product =>
                selectedBrands.includes(product.brand)
            );
            setProductsArray(filtered);
        }
    }, [selectedBrands]);

    return (
        <div className="brandsSortMain">
            {allBrands.map((item: string, index: number) => (
                <div className="brand" key={index}>
                    <p>{item}</p>
                    <Checkbox
                        onChange={(e) => handleCheckboxChange(item, e.target.checked)}
                        checked={selectedBrands.includes(item)}
                    />
                </div>
            ))}
        </div>
    );
}
