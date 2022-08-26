import React from "react";
import {Box,Typography,useTheme} from "@material-ui/core";

function Footer(props) {
    const theme = useTheme();
    return (
        <footer style={{background: theme.palette.primary.main}}>
            <box color={"white"}>
                <Typography>
                    Capstone Project
                </Typography>
            </box>
        </footer>
    );
}
export default Footer;
