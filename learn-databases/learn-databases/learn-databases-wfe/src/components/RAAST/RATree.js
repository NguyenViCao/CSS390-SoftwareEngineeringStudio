import React, {Component} from "react";
import RANode, {RAJoinNode, RAUnaryNode} from "./RAAST.js";
import {RelationalASTTypes,RelationalSymbols,RelationalDefinitions} from "../../RelationalDefinitions";

export default class RATree extends Component {

    constructor(props) {
        super(props);
        this.root = null;

        this.state = {
            numberOfNodes: 0,
            lastAddedNode: null,
        }
    }

    incrementCount() {
        this.state.numberOfNodes += 1;
    }

    add(value) {
        console.log("entered with a value of")
        console.log(value.type)
        //Getting the root node
        const node = this.root;
        let newNode;

        if (value === RelationalASTTypes.entity) {
            console.log("The value is an entity");
        }
        //Checking is the value is unary
        else if (RelationalDefinitions.isUnary(value)) {
            console.log("The value is unary");
            //Adding the count of nodes in the tree
            this.incrementCount();
            //Creating a new unary node
            newNode = new RAUnaryNode(value.type, value.symbol);
            newNode.expression = "TEMP";
            newNode.id = this.state.numberOfNodes;

            //if the root is empty, assign the new node to the root
            //else call addNode passing the root and the new node into it
            if (node === null) {
                this.root = newNode;
                console.log("Created new node");
                this.state.lastAddedNode = newNode;
                return;
            }
            else {
                this.addNode(node, newNode);
            }
        }
        //Checking is the value is join
        else if (RelationalDefinitions.isJoin(value)) {
            console.log("The value is a join");
            //Adding to the count of nodes in the tree
            this.incrementCount();

            //Creating a new join node
            newNode = new RAJoinNode(value.type, value.symbol);
            newNode.expression = "TEMP";
            newNode.id = this.state.numberOfNodes;


            //if the root is empty, assign the new node to the root
            //else call addNode passing the root and the new node into it
            if (node === null) {
                this.root = newNode;
                console.log("Created new node");
                this.state.lastAddedNode = newNode;
                return;
            }
            else {
                this.addNode(node, newNode);
            }
        }
        //NEED TO TAKE INTO ACCOUNT THE OTHER TYPES OF NODES
        else {
            console.log("Didn't fall into any type");
        }

    }

    //addNode function that takes in two values the node - should be the root of a tree
    //newNode - should be the new node that needs to be added into the tree
    addNode(node, newNode) {
        console.log("addNode called");
        console.log(newNode.type)
        if (RelationalDefinitions.isUnary(newNode)) {
            if (node.left === null) {
                console.log("Added a unary node");
                node.left = newNode;
                this.state.lastAddedNode = newNode;
            }
            else {
                this.addNode(node.left, newNode);
            }
        }
        else if (RelationalDefinitions.isJoin(newNode)) {
            if (node.right === null) {
                console.log("Added a join node");
                node.right = newNode;
                this.state.lastAddedNode = newNode;
            }
            else {
                this.addNode(node.right, newNode);
            }
        }
    }

    getRootNode() {
        return this.root;
    }

    getNumberOfNodes() {
        return this.state.numberOfNodes;
    }

    getLastAddedNode() {
        return this.state.lastAddedNode;
    }

    updateNodeExpression(node, id, value) {
        if (node.id === id) {
            node.expression = value;
        }
        else if (node != null) {
            node.left && this.updateNodeExpression(node.left, id, value);
            node.right && this.updateNodeExpression(node.right, id, value);
        }
    }

    /* THIS CODE IS NO LONGER NEEDED
    inorder(node) {
        console.log("inorder function called function");
        let treeArray = new Array();
        if (node !== null) {
            console.log("Calling the inorderHelper function");
            this.inorderHelper(node, treeArray);
        }
        return treeArray;
    }

    inorderHelper(node, treeArray) {
        if (node !== null) {
            console.log("Pushing onto the array");
            //console.log(node);
            treeArray.push(node);
            node.left && this.inorderHelper(node.left, treeArray);
            node.right && this.inorderHelper(node.right, treeArray);
        }
    }
    */
}
