import React, {Component, useRef} from "react";
import {Route} from "react-router-dom";
import {Switch} from "@material-ui/core";
import '../relational.css';
import {RelationalASTTypes, RelationalDefinitions, RelationalSymbols} from "../RelationalDefinitions";
import RATree from "./RAAST/RATree";
import RelationalExpression from "../RelationalExpression";
import Keypad from "./Keypad/KeypadComponent";
import RAExpressionInputPad from "./Keypad/RAExpressionInputPad";

export default class RAComplete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayInput: "",
            operatorInUse: null,
            selectionValue: "",
            RAST: new RATree(),
            currNode: null,
            jsonRA: "",
            hideRAExpression: 'hidden',
            newExpression: '',
        }

    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleClick);
    }

    componentWillUnmount() {
        document.addEventListener("keydown", this.handleClick);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.currNode !== prevState.currNode) {
            this.handleSetCurrentNode();
            console.log("this.state.currNode");
        }
    }

    handleClick = (value,id) => {

    };

    handleDisablingRAPadButtons = () => {
        let node = this.state.RAST.getLastAddedNode();

        if (RelationalDefinitions.isUnary(node)) {

        }
        else {

        }
    }

    handleQuickPrint = value => {
        const newInput = this.state.displayInput;
        let display;

        if (this.state.displayInput !== undefined) {
            display = `${value}${newInput}(${(this.selectionValue)})`;
        }

        this.setState({
            displayInput: display
        })
    }

    handleSetCurrentNode = value => {
        let node;
        if (value) {
            node = value;
        }
        else {
            node = this.state.RAST.getLastAddedNode();
        }
        this.setState({
            currNode: node,
        })
        this.handleDisablingRAPadButtons();
    }

    handleAddToRATree = (value) => {
        console.log("entered into handleAddToRATree")
        this.state.RAST.add(value);
        console.log("Done");
        this.handleSetCurrentNode();
        console.log("This is the current node: ", this.state.currNode);
        this.handlePrint();
    }

    handleSelection = value => {
        let RANode = new Object();
        RANode.type = RelationalASTTypes.restrict;
        RANode.symbol = RelationalSymbols.restrict;
        RANode.id = -1;
        this.handleAddToRATree(RANode);

    };

    handleProject = value => {
        let RANode = new Object();
        RANode.type = RelationalASTTypes.project;
        RANode.symbol = RelationalSymbols.project;
        RANode.id = -1;
        this.handleAddToRATree(RANode);
    };

    handleAggregate = value => {
        let RANode = new Object();
        RANode.type = RelationalASTTypes.aggregate;
        RANode.symbol = RelationalSymbols.aggregate;
        RANode.id = -1;
        this.handleAddToRATree(RANode);
    };
    handleCartesian = value => {
        let RANode = new Object();
        RANode.type = RelationalASTTypes.cartesian_product;
        RANode.symbol = RelationalSymbols.cartesian_product;
        RANode.id = -1;
        this.handleAddToRATree(RANode);
    };

    handleInnerJoin = value => {
        let RANode = new Object();
        RANode.type = RelationalASTTypes.theta_join;
        RANode.symbol = RelationalSymbols.theta_join;
        RANode.id = -1;
        this.handleAddToRATree(RANode);
    };

    handleLeftOuterJoin = value => {
        let RANode = new Object();
        RANode.type = RelationalASTTypes.outer_join_left;
        RANode.symbol = RelationalSymbols.outer_join_left;
        RANode.id = -1;
        this.handleAddToRATree(RANode);
    };

    handleRightOuterJoin = value => {
        let RANode = new Object();
        RANode.type = RelationalASTTypes.outer_join_right;
        RANode.symbol = RelationalSymbols.outer_join_right;
        RANode.id = -1;
        this.handleAddToRATree(RANode);
    };

    handleFullOuterJoin = value => {
        let RANode = new Object();
        RANode.type = RelationalASTTypes.outer_join_full;
        RANode.symbol = RelationalSymbols.outer_join_full;
        RANode.id = -1;
        this.handleAddToRATree(RANode);
    };

    handleSemiJoinLeft = value => {
        let RANode = new Object();
        RANode.type = RelationalASTTypes.semi_join_left;
        RANode.symbol = RelationalSymbols.semi_join_left;
        RANode.id = -1;
        this.handleAddToRATree(RANode);
    };

    handleSemiJoinRight = value => {
        let RANode = new Object();
        RANode.type = RelationalASTTypes.semi_join_right;
        RANode.symbol = RelationalSymbols.semi_join_right;
        RANode.id = -1;
        this.handleAddToRATree(RANode);
    };

    handleDivision = value => {
        let RANode = new Object();
        RANode.type = RelationalASTTypes.division;
        RANode.symbol = RelationalSymbols.division;
        RANode.id = -1;
        this.handleAddToRATree(RANode);
    };
    handleUnion= value => {
        let RANode = new Object();
        RANode.type = RelationalASTTypes.union;
        RANode.symbol = RelationalSymbols.union;
        RANode.id = -1;
        this.handleAddToRATree(RANode);
    };

    handleIntersection = value => {
        let RANode = new Object();
        RANode.type = RelationalASTTypes.intersection;
        RANode.symbol = RelationalSymbols.intersection;
        RANode.id = -1;
        this.handleAddToRATree(RANode);
    };

    handleDifference = value => {
        let RANode = new Object();
        RANode.type = RelationalASTTypes.difference;
        RANode.symbol = RelationalSymbols.difference;
        RANode.id = -1;
        this.handleAddToRATree(RANode);
    };

    handleClear = () => {
        delete this.state.RAST;
        this.setState({
            displayInput: "",
            jsonRA: null,
            operatorInUse: null,
            RAST: new RATree(),
            currNode: "",
            hideRAExpression: 'hidden',
            newExpression: '',
        });
    };

    //used for testing the tree
    handlePrint = () => {
        let root = this.state.RAST.getRootNode();
        console.log(root);
        console.log(this.state.RAST.getNumberOfNodes());

        this.setState({
            jsonRA: root,
        });

    };

    handleChangeExpression = () => {
        console.log(this.state.newExpression);
        let node = this.state.currNode;
        node.newExpression = this.state.newExpression;
        console.log("handle ChangeExpression");
        if (node === null) {
            return;
        }
        else {
            console.log("The value is: ", node);
            let root = this.state.RAST.getRootNode();
            this.state.RAST.updateNodeExpression(root, node.id, node.newExpression);

            this.handlePrint();
        }
    }

    disableHideExpressionPad = value => {
        this.setState({
            hideRAExpression: '',
            currNode: value,
        })
    }

    handleStatusChangeHidden = () => {
        if (this.state.hideRAExpression === '') {
            this.setState({
                hideRAExpression: 'hidden',
            })
        }
        else {
            this.setState({
                hideRAExpression: '',
            })
        }
    }

    handleGettingNewExpression = value => {
        console.log(value);
        this.setState({
            newExpression: value,
        },() => {this.handleChangeExpression()});

    }

    render() {
        return (
            <div>
                <RelationalExpression
                    ast={this.state.jsonRA}
                    handleChangeExpression={this.handleChangeExpression}
                    disableHideExpressionPad={this.disableHideExpressionPad}
                />
                <RAExpressionInputPad
                    changeStatusHidden={this.state.hideRAExpression}
                    handleStatusChangeHidden={this.handleStatusChangeHidden}
                    handleGettingNewExpression={this.handleGettingNewExpression}
                />
                <Keypad
                    displayInput={this.state.displayInput}
                    handleClick={this.handleClick}
                    handleBackSpace={this.handleBackSpace}
                    handleClear={this.handleClear}
                    handleQuickPrint={this.handleQuickPrint}
                    handleSelection={this.handleSelection}
                    handleProject={this.handleProject}
                    handleAggregate={this.handleAggregate}
                    handleCartesian={this.handleCartesian}
                    handleInnerJoin={this.handleInnerJoin}
                    handleLeftOuterJoin={this.handleLeftOuterJoin}
                    handleRightOuterJoin={this.handleRightOuterJoin}
                    handleFullOuterJoin={this.handleFullOuterJoin}
                    handleSemiJoinRight={this.handleSemiJoinRight}
                    handleSemiJoinLeft={this.handleSemiJoinLeft}
                    handleDivision={this.handleDivision}
                    handleUnion={this.handleUnion}
                    handleIntersection={this.handleIntersection}
                    handleDifference={this.handleDifference}
                    handlePrint={this.handlePrint}
                />
            </div>
        );
    }
}
