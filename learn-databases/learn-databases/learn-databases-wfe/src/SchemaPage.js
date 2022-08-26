import React from "react";
import {Box, Typography} from "@material-ui/core";

export default class SchemaPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {schemas: null};
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
        console.log("render");
        console.log(JSON.stringify(this.state.schemas));
        const items = (this.state.schemas != null) ?
            this.state.schemas.map((value, i) => {
                return <li key={i}>{value.schema_name}</li>
            }) : "";
        document.title = "Learn Database";
         return (
            <Box>
                <Typography>Available Schemas</Typography>
                <ul>
                {items}
                </ul>
            </Box>

        );
    }
}
