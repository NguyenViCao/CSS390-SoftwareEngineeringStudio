import {Button, Input, TextField} from "@material-ui/core";
import React, {useState} from "react";
import {makeStyles, withStyles} from '@material-ui/core/styles'
import ReactDOM from 'react-dom';


export default function SQLTxtBox() {

    const [sqlvalue, setSQLvalue] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()

        if (sqlvalue) {
            console.log(sqlvalue)
        }
    }


    return (
        <form noValidate autoComplete="off" onSubmit={submitHandler}>
            <Input
                id="SQLInput"
                label="SQL Input"
                type="text"
                onChange={(e) => setSQLvalue(e.target.value)}
            />
            <Button type="submit" value="Submit">Submit</Button>
        </form>
        )

}

