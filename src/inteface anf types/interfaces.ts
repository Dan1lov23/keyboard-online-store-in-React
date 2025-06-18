export default interface Product {
    name: string;
    price: number;
    img: string;
    id: number;
    type: string;
    specificity: string;
    brand: string,
    switchModel: string,
    width: string,
    height: string,
    connectionType: string,
    keyBacklight: string,
    lowProfile: string,
    itemCounter: number,
    iconsArray: [string, string?, string?],
    imgForSlider: [string, string, string, string, string],
}
