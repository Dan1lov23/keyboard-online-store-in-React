import "./butButton.css"

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";

export default function BuyButton({addProductFunction}:{addProductFunction: () => void}) {

    return (
        <>
            <div className="buyButtonMain">
                <button onClick={() => addProductFunction()}>
                    <FontAwesomeIcon icon={faCartShopping}/>
                </button>
            </div>
        </>
    )
}