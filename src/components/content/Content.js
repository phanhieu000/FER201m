import { useContext } from "react";
import LeftContent from "./LeftContent"
import RightContent from "./RightContent"

import { MoviesContext } from "../../App"


function Content() {


    return (
        <div className="" style={{paddingTop: '60px'}}>

            {/* <LeftContent /> */}
            <RightContent />

        </div>

    )

}

export default Content