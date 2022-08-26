import React, {Component} from "react";
import {RelationalASTTypes,RelationalSymbols,RelationalDefinitions} from "../../RelationalDefinitions";

/* RANode - Root Abstract Class */
export default class RANode extends Component{
    constructor(nodeType, nodeSymbol) {
        super(nodeType, nodeSymbol);
        this.type = nodeType;
        this.parent = null;
        this.symbol = nodeSymbol;
        this.id = null;

        //TEMP
        this.left = null;
        this.right = null;
    }
}

/* RAEntityNode - Leaf Node - Entity / Table */
export class RAEntityNode extends RANode {
    constructor(entityName) {
        super(RelationalASTTypes.entity);
        this.value = entityName;

        //TEMP
        this.left = null;
        this.right = null;
    }
}

/* Operator Structural Classes */
export class RAUnaryNode extends RANode {
    constructor(nodeType, nodeSymbol) {
        super(nodeType, nodeSymbol);
        this.type = nodeType;
        this.right = null;
        this.expression = null;
        this.symbol = nodeSymbol;

        //TEMP
        this.left = null;
    }
}
export class RAAggregateNode extends RAUnaryNode {
    constructor() {
        super(RelationalASTTypes.aggregate);
        this.grouping = null;

        //TEMP
        this.right = null;
        this.left = null;
    }
}

export class RABinaryNode extends RANode {
    constructor(nodeType) {
        super(nodeType);
        this.left = null;
        this.right = null;
    }
}

export class RAJoinNode extends RABinaryNode {
    constructor(nodeType, nodeSymbol) {
        super(nodeType, nodeSymbol);
        this.expression = null;
        this.type = nodeType;
        this.symbol = nodeSymbol;
        //TEMP
        this.left = null;
        this.right = null;
    }
}
