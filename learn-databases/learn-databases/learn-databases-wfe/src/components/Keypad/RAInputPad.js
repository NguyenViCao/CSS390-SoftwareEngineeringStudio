import {Button, Input, TextField} from "@material-ui/core";
import React, {useState} from "react";
import {makeStyles, withStyles} from '@material-ui/core/styles'
import ReactDOM from 'react-dom';


export default function RAInputPad() {

    const [RAValue, setRAValue] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()

        if (RAValue) {
            console.log(RAValue)
        }
    }


    return (
        <form noValidate autoComplete="off" onSubmit={submitHandler}>
            <Input
                id="RAInput"
                label="RA Input"
                type="text"
                onChange={(e) => setRAValue(e.target.value)}
            />
            <Button type="submit" value="Submit">Submit</Button>
        </form>
    )

}
