import React from 'react';

// import fs from 'fs';
// import * as fs from  'fs';
// const fs = require('../../node_modules/fs/');
// import path from 'path';
// import * as path from 'path';
// const path = require('path');

import '../index.css';
import { autoState } from './Auto.js';

class Node {
  #out = null;

  #nodeUp = null;
  #nodeDown = null;

  #pointsNode = 0;

  #auto = false;

  #id = 0;

  #color = false;

  #number = 0;

  #array = null;

  #missAmount = 0;

  constructor(out, nodeUp, nodeDown, points, id) {
    // let data = {
    //   out: out,
    //   pointsNode: points,

    //   nodeUp: nodeUp,
    //   nodeDown: nodeDown,

    //   id: id
    // }

    this.#out = out;
    this.nodeUp = nodeUp;
    this.#nodeDown = nodeDown;
    this.#pointsNode = points;
    this.#id = id;
    this.#number = 0;
    this.#array = [];
    this.#missAmount = 0;
  }
  get out() { return this.#out; }
  get nodeUp() { return this.#nodeUp; }
  get nodeDown() { return this.#nodeDown; }
  get pointsNode() { return this.#pointsNode; }
  get auto() { return this.#auto; }
  get id() { return this.#id; }
  get num(){return this.#number}
  get array(){return this.#array;}
  get color() { return this.#color; }
  get missAmount() {return this.#missAmount;}

  set out(out) { this.#out = out; }
  set nodeUp(nodeUp) { this.#nodeUp = nodeUp; }
  set nodeDown(nodeDown) { this.#nodeDown = nodeDown; }
  set pointsNode(points) { this.#pointsNode = points; }
  set auto(auto) { this.#auto = auto; }
  set id(id) {this.#id = id; }
  set num(num) {this.#number = num;}
  set array(arr){this.#array = arr;}
  set missAmount(mA){this.#missAmount = mA;}
  set color(color) { this.#color = color; }
  static coneHighMake = 0;
  static coneHighMiss = 0;
  static coneMidMake = 0;
  static coneMidMiss = 0;
  static coneLowMake = 0;
  static coneLowMiss = 0;
  static cubeHighMake = 0;
  static cubeHighMiss = 0;
  static cubeMidMake = 0;
  static cubeMidMiss = 0;
  static cubeLowMake = 0;
  static cubeLowMiss = 0;
  static autoconeHighMake = 0;
  static autoconeHighMiss = 0;
  static autoconeMidMake = 0;
  static autoconeMidMiss = 0;
  static autoconeLowMake = 0;
  static autoconeLowMiss = 0;
  static autocubeHighMake = 0;
  static autocubeHighMiss = 0;
  static autocubeMidMake = 0;
  static autocubeMidMiss = 0;
  static autocubeLowMake = 0;
  static autocubeLowMiss = 0;
  static coneLowAccidental = 0;
  static cubeLowAccidental = 0;
  static autoconeLowAccidental = 0;
  static autocubeLowAccidental = 0;
  allMiss(node){
    let allMiss = true;
    if(node != undefined){
      if(node.array != null){
      node.array.forEach(function (item){      
        if(item.props.src != "img/cm.svg" && item.props.src != "img/qm.svg"){
          allMiss = false;
        }
      });
    }    
  }
    ;
  return allMiss;
}
    
  
  link() {
    let curr = this;
    if(curr.allMiss(curr)){
      return false;
    }
    while(curr.nodeDown != null){
      curr = curr.nodeDown;
      if(curr.allMiss(curr)){
        return false;
      }
    }
    while(curr.nodeUp != null){
      curr = curr.nodeUp;
      if(curr.allMiss(curr)){
        return false;
      }
    }
    return true;
  }

  update() {
    let curr = this;
    while (curr.nodeUp != null) {
      curr = curr.nodeUp;
    }
    while (curr.nodeDown != null) {
      curr.color = this.link();
      curr = curr.nodeDown;
    }
    curr.color = this.link();
  }
}
  
function NodeOut(props) {
  return (
    <button className={(props.Node.color === true) ? "node-link" : 'node'} onClick={props.onClick}>
      {props.Node.out}
    </button>
  );
}

class Grid extends React.Component {
  static nodes = Array(27).fill(null);

  constructor(props) {
    super(props);
    this.state = {
      miss: false
    };
    
    for (let i = 0; i < Grid.nodes.length; i++) {
      Grid.nodes[i] = new Node(null, null, null, 0, i, false)

      if (i % 9 >= 6) {
        Grid.nodes[i - 6].nodeDown = Grid.nodes[i -3];
        Grid.nodes[i - 3].nodeUp = Grid.nodes[i - 6]
        Grid.nodes[i - 3].nodeDown = Grid.nodes[i];
        Grid.nodes[i].nodeUp = Grid.nodes[i -3];
      }
    }
  }



  
  
  score(i) {
    const nodes = Grid.nodes.slice();
    if(nodes[i].num < 0){nodes[i].num = 0}
    if(nodes[i].array == null){nodes[i].array = []}
    let Cone = <img id="img" src="img/c.svg" width="25"/>
    let Cube = <img id="img" src="img/q.svg" width="25"/>
    let missAmount = nodes[i].missAmount;
    if(this.state.miss){
      Cone = <img id="img" src="img/cm.svg" width="25"/>
      Cube = <img id="img" src="img/qm.svg" width="25"/>
    }
    if (i % 3 === 2) {
      if (nodes[i].num == 0) {
        if(!this.state.miss){
          nodes[i].array[missAmount] = Cone;
          nodes[i].num = 1;
      } else {
        nodes[i].array[missAmount] = Cone;
        nodes[i].missAmount++;
      }
    }
   else if(nodes[i].num == 1) {
    if(!this.state.miss){
      nodes[i].array[missAmount] = Cube;
      nodes[i].num = 2;
  } else {
    nodes[i].array[missAmount] = Cube;
    nodes[i].missAmount++;
  }
  } else{
    nodes[i].array = null;
    nodes[i].out = null;
    nodes[i].num = 0;
  }

      nodes[i].out = nodes[i].array;
}
//START
else {
      if ((i % 9 !== 3) && (i % 9 !== 4)) {
        if (nodes[i].num == 0) {
          if(!this.state.miss){
            nodes[i].array[missAmount] = Cone;
            nodes[i].num = 1;
        } else {
          nodes[i].array[missAmount] = Cone;
          nodes[i].missAmount++;
        }
      } else{
      nodes[i].array = null;
      nodes[i].out = null;
      nodes[i].num = 0;
    }
  
        nodes[i].out = nodes[i].array;
  }
    else{
      if (nodes[i].num == 0) {
        if(!this.state.miss){
          nodes[i].array[missAmount] = Cube;
          nodes[i].num = 1;
      } else {
        nodes[i].array[missAmount] = Cube;
        nodes[i].missAmount++;
      }
    } else{
    nodes[i].array = null;
    nodes[i].out = null;
    nodes[i].num = 0;
  }
  
  nodes[i].out = nodes[i].array;
  }
    }
    
    if (i % 3 === 0) {
    nodes[i].pointsNode = nodes[i].allMiss(nodes[i]) == true ? 0 : 5;
  }
    else if (i % 3 === 1) {
      nodes[i].pointsNode = nodes[i].allMiss(nodes[i]) == true ? 0 : 3;
    }
    else {
      nodes[i].pointsNode = nodes[i].allMiss(nodes[i]) == true ? 0 : 2;
  }
    
    nodes[i].pointsNode += autoState.state && nodes[i].pointsNode !== 0 ? 1 : 0;
    nodes[i].auto = autoState.state;
    // console.log(nodes[i].pointsNode);
    // console.log(nodes[i].auto);

    this.setState({
      nodes: nodes,
    });

    //console.log(nodes[i].link() ? "true" : false);
    nodes[i].update();
    this.setStatics(nodes[i].auto);
    
  }
  setStatics(auto){
    this.resetStatics();
    let nodes = Grid.nodes;
    for(let i = 0; i < 27; i++){
      if(i % 3 == 0){
        let array = nodes[i].array;
        if(array != null){
        array.forEach(element => {
          if(element.props.src == "img/c.svg"){
            if(auto){
              Node.autoconeHighMake++;
            }
            else{
              Node.coneHighMake++;
            }
          }
          if(element.props.src == "img/cm.svg"){
            if(auto){
              Node.autoconeHighMiss++;
            }
            else{
              Node.coneHighMiss++;
            }
          }
          if(element.props.src == "img/q.svg"){
            if(auto){
              Node.autocubeHighMake++;
            }
            else{
              Node.autocubeHighMake++;
            }
          }
          if(element.props.src == "img/qm.svg"){
            if(auto){
              Node.autocubeHighMiss++;
            }
            else{
              Node.cubeHighMiss++;
            }
          }
        }
        );
      }
    }
    if(i % 3 == 1){
      let array = nodes[i].array;
        if(array != null){
        array.forEach(element => {
          if(element.props.src == "img/c.svg"){
            if(auto){
              Node.autoconeMidMake++;
            }
            else{
              Node.coneMidMake++;
            }
          }
          if(element.props.src == "img/cm.svg"){
            if(auto){
              Node.autoconeMidMiss++;
            }
            else{
              Node.coneMidMiss++;
            }
          }
          if(element.props.src == "img/q.svg"){
            if(auto){
              Node.autocubeMidMake++;
            }
            else{
              Node.autocubeMidMake++;
            }
          }
          if(element.props.src == "img/qm.svg"){
            if(auto){
              Node.autocubeMidMiss++;
            }
            else{
              Node.cubeMidMiss++;
            }
          }
        }
      )}
    }
    if(i % 3 ==2){
      let array = nodes[i].array;
      if(array != null){
      array.forEach(element => {
        if(element.props.src == "img/c.svg"){
          if(auto){
            Node.autoconeLowMake++;
          }
          else{
            Node.coneLowMake++;
          }
        }
        if(element.props.src == "img/cm.svg"){
          if(auto){
            Node.autoconeLowMiss++;
          }
          else{
            Node.coneLowMiss++;
          }
        }
        if(element.props.src == "img/q.svg"){
          if(auto){
            Node.autocubeLowMake++;
          }
          else{
            Node.autocubeLowMake++;
          }
        }
        if(element.props.src == "img/qm.svg"){
          if(auto){
            Node.autocubeLowMiss++;
          }
          else{
            Node.cubeLowMiss++;
          }
        }
      }
    )}
    }
    }
  }
  resetStatics(){
    Node.coneHighMake = 0;
    Node.coneHighMiss = 0;
    Node.coneMidMake = 0;
    Node.coneMidMiss = 0;
    Node.coneLowMake = 0;
    Node.coneLowMiss = 0;
    Node.cubeHighMake = 0;
    Node.cubeHighMiss = 0;
    Node.cubeMidMake = 0;
    Node.cubeMidMiss = 0;
    Node.cubeLowMake = 0;
    Node.cubeLowMiss = 0;
    Node.autoconeHighMake = 0;
    Node.autoconeHighMiss = 0;
    Node.autoconeMidMake = 0;
    Node.autoconeMidMiss = 0;
    Node.autoconeLowMake = 0;
    Node.autoconeLowMiss = 0;
    Node.autocubeHighMake = 0;
    Node.autocubeHighMiss = 0;
    Node.autocubeMidMake = 0;
    Node.autocubeMidMiss = 0;
    Node.autocubeLowMake = 0;
    Node.autocubeLowMiss = 0;
    Node.coneLowAccidental = 0;
    Node.cubeLowAccidental = 0;
    Node.autoconeLowAccidental = 0;
    Node.autocubeLowAccidental = 0;
  }

  // process() {
  //   const nodes = Grid.nodes.slice();
  //   for (let i = 0; i < nodes.length; i++){
  //     fs.writeFile('local-cache/test.json', JSON.stringify(nodes[i].data), (err) => {
  //       if (err) { return console.error('error') }
  //     });
  //   }
  // }



  renderNode(i) {
    return(
      <NodeOut
        Node = {Grid.nodes[i]}
        onClick = {() => { this.score(i)
                          //  this.process() 
                         }
                  }
      />
    );
  }
  static getScore(){
     let nodes = Grid.nodes.slice();
      let sum = 0;
      for(let i = 0; i < 27; i++){
        sum+=nodes[i].pointsNode;
      }
      return sum;
  }
  render() {
    const toggleMiss= () =>{
      this.state.miss = !this.state.miss;
      console.log(this.state.miss);
      const nodes = Grid.nodes.slice();
      for(var i = 0; i < 27; i++){
        nodes[i].num -=1;
      }
    }
    // const logScore = () => {
    //   let nodes = Grid.nodes.slice();
    //   let sum = 0;
    //   for(let i = 0; i < 27; i++){
    //     sum+=nodes[i].pointsNode;
    //   }
    //   console.log(sum);
    // }
    return (
      <div className="grid-container">
      <button className='toggleMiss' onClick={(e) => toggleMiss()}>Toggle Miss</button>
      {/* outer 1 */}
        <div className="node-container">
          <div className="node-row">
            {this.renderNode(0)}
            {this.renderNode(1)}
            {this.renderNode(2)}
          </div>
          <div className="node-row">
            {this.renderNode(3)}
            {this.renderNode(4)}
            {this.renderNode(5)}
          </div>
          <div className="node-row">
            {this.renderNode(6)}
            {this.renderNode(7)}
            {this.renderNode(8)}
          </div>
        </div>

      {/* coopertition */}
        <div className="node-container">
          <div className="node-row">
            {this.renderNode(9)}
            {this.renderNode(10)}
            {this.renderNode(11)}
          </div>
          <div className="node-row">
            {this.renderNode(12)}
            {this.renderNode(13)}
            {this.renderNode(14)}
          </div>
          <div className="node-row">
            {this.renderNode(15)}
            {this.renderNode(16)}
            {this.renderNode(17)}
          </div>
        </div>

        {/* outer 2 */}
        <div className="node-container">
          <div className="node-row">
            {this.renderNode(18)}
            {this.renderNode(19)}
            {this.renderNode(20)}
          </div>
          <div className="node-row">
            {this.renderNode(21)}
            {this.renderNode(22)}
            {this.renderNode(23)}
          </div>
          <div className="node-row">
            {this.renderNode(24)}
            {this.renderNode(25)}
            {this.renderNode(26)}
          </div>
        </div>
        {/* <button className='logScore' onClick={(e) => logScore()}>logScore</button> */}
      </div>
    );
  }
}

export {Grid, Node};
