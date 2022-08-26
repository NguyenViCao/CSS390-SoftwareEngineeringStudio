import React from "react";
import RATxtBox from "./RATxtBox";

export default function Display(props) {
    return (
        <div>
            <RATxtBox displayInput={props.displayInput} />
        </div>
    );
}
