import React from "react";

export default class RANode extends React.Component{
    constructor(props, value, id, left = null, right = null) {
        super(props)
        this.value = value;
        this.id = id;
        this.left = left;
        this.right = right;
    }
}
