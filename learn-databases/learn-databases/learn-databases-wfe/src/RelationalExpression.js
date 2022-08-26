import React from "react";
import './relational.css';
import {RelationalASTTypes,RelationalSymbols,RelationalDefinitions} from "./RelationalDefinitions";

const unary_operators = [
    RelationalASTTypes.aggregate,
    RelationalASTTypes.project,
    RelationalASTTypes.restrict
];
/*
const set_operators = [
    RelationalASTTypes.difference,
    RelationalASTTypes.intersection,
    RelationalASTTypes.union
];
*/
const join_operators = [
    RelationalASTTypes.outer_join_full,
    RelationalASTTypes.outer_join_left,
    RelationalASTTypes.outer_join_right,
    RelationalASTTypes.semi_join_left,
    RelationalASTTypes.semi_join_right,
    RelationalASTTypes.theta_join
];

export default class RelationalExpress extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentNode: null,
            relationalExpression: "relational_expression",
            currRelationalExpression: "curr_relational_expression",
        }
    }

    printAST = ast => {
        return (
            <div>{this.printASTNode(ast)}</div>
        );
    }

    handleClick = value => {
        console.log(value);
    }

    handleExpressionClick = value => {
        this.props.disableHideExpressionPad(value);
    }

    printASTNode = ast => {
        if (ast != null) {
            console.log(ast);
            if (ast.type === RelationalASTTypes.entity) {
                return (<i> {ast.value} </i>);
            } else if (RelationalDefinitions.isUnary(ast)) {
                console.log("Is a unary");
                return (<span>(&nbsp;
                    <span className={this.state.relationalExpression} onClick={() => this.handleClick(ast.type)}>{RelationalSymbols[ast.type]}&nbsp;</span>
                    <sub className={this.state.relationalExpression} onDoubleClick={() => this.handleExpressionClick(ast)}>{ast.expression}</sub>
                    &nbsp;{this.printASTNode(ast.right)}&nbsp;
                    )</span>);
            } else if (RelationalDefinitions.isJoin(ast)) {
                console.log("Is a join");
                return (<span>(
                    <span className={this.state.relationalExpression} >&nbsp;{this.printASTNode(ast.left)}</span>
                    <span className={this.state.relationalExpression} onClick={() => this.handleClick(ast.type)}>&nbsp;{RelationalSymbols[ast.type]}</span>
                    <sub className={this.state.relationalExpression} onDoubleClick={() => this.handleExpressionClick(ast)}>
                        {(ast.hasOwnProperty('expression')) ? (<sub className="relational_expression">&nbsp;{ast.expression}</sub>) : ''}
                    </sub>
                    <span className={this.state.relationalExpression} >&nbsp;{this.printASTNode(ast.right)}&nbsp;</span>
                    )</span>);

            } else {
                return (<span className={this.state.relationalExpression}>(
                    &nbsp;{this.printASTNode(ast.left)}
                    &nbsp;{RelationalSymbols[ast.type]}
                    &nbsp;{this.printASTNode(ast.right)}&nbsp;
                    )</span>);
            }
        }
    }

    render() {
        return (
            <div>
                {this.printAST(this.props.ast)}
            </div>
        );
    }
}
