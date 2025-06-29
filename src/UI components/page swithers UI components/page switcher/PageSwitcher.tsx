import "./pageSwitcher.css"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faArrowLeft} from "@fortawesome/free-solid-svg-icons";

export default function PageSwitcher({nextPageFunction, previousPageFunction}:{nextPageFunction: () => void, previousPageFunction: () => void}) {
    return (
        <>
            <div>
                <button onClick={() => previousPageFunction()} className="switchButton">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button onClick={() => nextPageFunction()} className="switchButton">
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </>
    )
}