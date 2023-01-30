import React from 'react';
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
  }

  get out() { return this.#out; }
  get nodeUp() { return this.#nodeUp; }
  get nodeDown() { return this.#nodeDown; }
  get pointsNode() { return this.#pointsNode; }
  get auto() { return this.#auto; }
  get id() { return this.#id; }
  get color() { return this.#color; }

  set out(out) { this.#out = out; }
  set nodeUp(nodeUp) { this.#nodeUp = nodeUp; }
  set nodeDown(nodeDown) { this.#nodeDown = nodeDown; }
  set pointsNode(points) { this.#pointsNode = points; }
  set auto(auto) { this.#auto = auto; }
  set id(id) {this.#id = id; }
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
      nodes: Array(27).fill(null)
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
    
    if (i % 3 === 2) {
      if (nodes[i].out == null) {
        nodes[i].out = 'x';
      } else {
        nodes[i].out = nodes[i].out === 'x' ? 'o' : null;
      }
    } else {
      if ((i % 9 !== 3) && (i % 9 !== 4)) {
        nodes[i].out = nodes[i].out == null ? 'o' : null;
      } else {
        nodes[i].out = nodes[i].out == null ? 'x' : null;
      }
    }
    
    if (i % 3 === 0) {
      nodes[i].pointsNode = nodes[i].out == null ? 0 : 5;
    }
    else if (i % 3 === 1) {
      nodes[i].pointsNode = nodes[i].out == null ? 0 : 3;
    }
    else {
      nodes[i].pointsNode = nodes[i].out == null ? 0 : 2;
    }
    
    nodes[i].pointsNode += autoState.state && nodes[i].pointsNode !== 0 ? 1 : 0;
    nodes[i].auto = autoState.state;
    console.log(nodes[i].pointsNode);
    console.log(nodes[i].auto);

    this.setState({
      nodes: nodes,
    });

    //console.log(nodes[i].link() ? "true" : false);
    nodes[i].update();

  }

  renderNode(i) {
    return(
      <NodeOut
        Node = {this.state.nodes[i]}
        onClick = {() => this.score(i)}
      />
    );
  }

  render() {
    return (
      <div className="grid-container">
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
      </div>
    );
  }
}

export default Grid;
