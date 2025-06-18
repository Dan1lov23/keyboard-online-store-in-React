import "./pageSwitcher.css"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHandPointRight, faHandPointLeft} from "@fortawesome/free-solid-svg-icons";

export default function PageSwitcher({nextPageFunction, previousPageFunction}:{nextPageFunction: () => void, previousPageFunction: () => void}) {
    return (
        <>
            <div>
                <button onClick={() => previousPageFunction()} className="switchButton">
                    <FontAwesomeIcon icon={faHandPointLeft} />
                </button>
                <button onClick={() => nextPageFunction()} className="switchButton">
                    <FontAwesomeIcon icon={faHandPointRight} />
                </button>
            </div>
        </>
    )
}