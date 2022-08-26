import React from "react";
import Display from "./Display/DisplayComponent";
import Keypad from "./Keypad/KeypadComponent";

export default function RAMain(props) {

    return (
        <div className="RATextBox">
            <Display
                displayInput={props.displayInput}
            />

            <Keypad
                handleClick={props.handleClick}
                handleBackSpace={props.handleBackSpace}
                handleClear={props.handleClear}
                handleSelection={props.handleSelection}
            />

        </div>
    );
}
