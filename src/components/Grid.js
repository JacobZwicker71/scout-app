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

  link() {
    let curr = this;
    while (curr.nodeUp != null) {
      curr = curr.nodeUp;
      // console.log("going up");
    }
    while (curr.nodeDown != null) {
      if (curr.out == null) { return false; }
      curr = curr.nodeDown;
      // console.log("going down");
    }
    if (curr.out == null) { return false; }
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
  constructor(props) {
    super(props);
    this.state = {
      nodes: Array(27).fill(null),
      miss: false
    };
    
    for (let i = 0; i < this.state.nodes.length; i++) {
      this.state.nodes[i] = new Node(null, null, null, 0, i, false)

      if (i % 9 >= 6) {
        this.state.nodes[i - 6].nodeDown = this.state.nodes[i -3];
        this.state.nodes[i - 3].nodeUp = this.state.nodes[i - 6]
        this.state.nodes[i - 3].nodeDown = this.state.nodes[i];
        this.state.nodes[i].nodeUp = this.state.nodes[i -3];
      }
    }
  }



  score(i) {
    const nodes = this.state.nodes.slice();
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
        if(!this.state.miss){
          if(nodes[i].array.length == 0){
            nodes[i].out = "cone";
            nodes[i].array[missAmount] = Cone;
        }
        else{
          nodes[i].array = null;
        }
      } else {
        nodes[i].array[missAmount] = Cone;
        nodes[i].missAmount++;
      }
      nodes[i].out = nodes[i].array;
    }
    else{
      if(!this.state.miss){
        if(nodes[i].array.length == 0){
          nodes[i].out = "cube";
          nodes[i].array[missAmount] = Cube;
      }
      else{
        nodes[i].array = null;
      }
    } else {
      nodes[i].array[missAmount] = Cube;
      nodes[i].missAmount++;
    }
    nodes[i].out = nodes[i].array;
  }
    }
    
    if (i % 3 === 0) {
      let allMiss = true;
      if(nodes[i].out != null){
      nodes[i].out.forEach(function (item){      
        if(item.props.src != "img/cm.svg" && item.props.src != "img/qm.svg"){
          allMiss = false;
        }
      });
    }

    // if(allMiss){console.log(nodes[i].array)}
    nodes[i].pointsNode = allMiss == true ? 0 : 5;
  }
    else if (i % 3 === 1) {
      let allMiss = true;
      if(nodes[i].out != null){
      nodes[i].out.forEach(function (item){      
        if(item.props.src != "img/cm.svg" && item.props.src != "img/qm.svg"){
          allMiss = false;
        }
      });
    }

    // if(allMiss){console.log(nodes[i].array)}
    nodes[i].pointsNode = allMiss == true ? 0 : 3;
  }
    else {
      let allMiss = true;
      if(nodes[i].out != null){
      nodes[i].out.forEach(function (item){      
        if(item.props.src != "img/cm.svg" && item.props.src != "img/qm.svg"){
          allMiss = false;
        }
      });
    }

    // if(allMiss){console.log(nodes[i].array)}
    nodes[i].pointsNode = allMiss == true ? 0 : 2;}
    
    nodes[i].pointsNode += autoState.state && nodes[i].pointsNode !== 0 ? 1 : 0;
    nodes[i].auto = autoState.state;
    // console.log(nodes[i].pointsNode);
    // console.log(nodes[i].auto);

    this.setState({
      nodes: nodes,
    });

    //console.log(nodes[i].link() ? "true" : false);
    nodes[i].update();

  }


  // process() {
  //   const nodes = this.state.nodes.slice();
  //   for (let i = 0; i < nodes.length; i++){
  //     fs.writeFile('local-cache/test.json', JSON.stringify(nodes[i].data), (err) => {
  //       if (err) { return console.error('error') }
  //     });
  //   }
  // }

  renderNode(i) {
    return(
      <NodeOut
        Node = {this.state.nodes[i]}
        onClick = {() => { this.score(i)
                          //  this.process() 
                         }
                  }
      />
    );
  }


  render() {
    const toggleMiss= () =>{
      this.state.miss = !this.state.miss;
      console.log(this.state.miss);
      const nodes = this.state.nodes.slice();
      for(var i = 0; i < 27; i++){
        nodes[i].num -=1;
      }
    }
    const logScore = () => {
      let nodes = this.state.nodes.slice();
      let sum = 0;
      for(let i = 0; i < 26; i++){
        sum+=nodes[i].pointsNode;
      }
      console.log(sum);
    }
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
        <button className='logScore' onClick={(e) => logScore()}>logScore</button>
      </div>
    );
  }
}

export default Grid;
