import {createTheme, Input, TextField} from "@material-ui/core";
import React from "react";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import '../../relational.css';

const useStyles = makeStyles({
    txtInput: {
        display: "flex",
        justifyContent: "left",
        paddingLeft: "5rem",
        paddingRight: "10rem",

        boxSizing: "border-box",
        borderRadius: 0,

        fontFamily: "relational_database_scriptMD",
        textTransform: 'capitalize',
    }
});

export default function RASelectionTxtBox(props) {
    const classes = useStyles()

    return (
        <form noValidate autoComplete="off">
            <Input
                //className={classes.txtInput}
                value={props.displayInput}
                id="RASelectionInput"
                label="RA Selection Input"
                disableUnderline={true}

            />
        </form>
    );
}
