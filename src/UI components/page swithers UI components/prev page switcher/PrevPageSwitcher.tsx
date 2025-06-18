import "../page switcher/pageSwitcher.css"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHandPointLeft} from "@fortawesome/free-solid-svg-icons";

export default function PrevPageSwitcher({previousPageFunction}: {previousPageFunction: () => void}) {
    return (
        <>
            <div>
                <button onClick={() => previousPageFunction()} className="switchButton">
                    <FontAwesomeIcon icon={faHandPointLeft} />
                </button>
            </div>
        </>
    )
}