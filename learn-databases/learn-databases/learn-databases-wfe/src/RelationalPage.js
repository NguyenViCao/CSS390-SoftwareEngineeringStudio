import React from "react";
import {Box, Typography} from "@material-ui/core";
import SQLTxtBox from "./components/Display/SQLTxtBox";
import RAComplete from "./components/RAComplete";
import RelationalExpression from "./RelationalExpression"
import ast from "./relational-expression-test";

export default class RelationalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {schemas: null, RAValue: ""};
    }

    componentDidMount() {
        console.log('mounting schema');
        fetch('/api/v1/schema')
            .then(res => res.json())
            .then((data) => {
                this.setState({ schemas: data })
            })
            .catch(console.log)
    }


    render() {
        document.title = "Learn Database";
        return (
            <Box>
                <Typography>Relational Algebra</Typography>
                <RelationalExpression ast={ast}/>
                <RAComplete/>
            </Box>

        );
    }
}

