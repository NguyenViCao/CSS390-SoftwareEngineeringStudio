import {Button, Input, TextField} from "@material-ui/core";
import React from "react";
import {withStyles} from '@material-ui/core/styles';
import '../../relational.css';
import {useState} from "react";

const useStyles = theme =>({
    btn: {
        alignItems: "center",
        justifyContent: "center",
        height: "44px",
        padding: "0px 25px 0px 25px",
        boxSizing: "border-box",
        border: 0,
        borderRadius: 0,
        background: "#e8e3d3 ",
        color: "#000000",
        transform: "none",
        fontFamily: "relational_database_scriptMD",
        textTransform: "none",

        transition: "background .3s,border-color .3s,color .3s",
        "&:hover": {
            backgroundColor:  "#4b2e83"
        },
    }
});

class RAExpressionInputPad extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            expression: '',
        }

    }

    submitHandler = (e) => {
        e.preventDefault();
        console.log(this.state.expression);
        this.props.handleGettingNewExpression(this.state.expression);
        this.props.handleStatusChangeHidden();
        this.setState({
            expression: '',
        })
        e.target.reset();
    }

    changeHandler = value => {
        this.setState({
            expression: value,
        })
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <form hidden={this.props.changeStatusHidden} autoComplete="off" onSubmit={this.submitHandler}>
                    <TextField
                        id="ExpressionInput"
                        label="Expression"
                        type="text"
                        onChange={e => this.changeHandler(e.target.value)}
                    />
                    <Button
                        type="submit"
                        value="Submit"
                        className={classes.btn}
                    >
                        Submit
                    </Button>
                </form>
            </div>
        )
    }
}

export default withStyles(useStyles)(RAExpressionInputPad)
