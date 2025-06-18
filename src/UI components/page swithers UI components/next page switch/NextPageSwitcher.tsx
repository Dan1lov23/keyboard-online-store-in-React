import "../page switcher/pageSwitcher.css"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHandPointRight} from "@fortawesome/free-solid-svg-icons";

export default function NextPageSwitcher({nextPageFunction}: {nextPageFunction: () => void}) {
    return (
        <>
            <div>
                <button onClick={() => nextPageFunction()} className="switchButton">
                    <FontAwesomeIcon icon={faHandPointRight} />
                </button>
            </div>
        </>
    )
}