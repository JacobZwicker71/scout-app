import React, { useState } from 'react';
import '../index.css';


import { autoState } from './Auto.js';

class Community extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chargeStation: new ChargeStation(),
    }
  }

  score() {
    const chargeStation = this.state.chargeStation;

    if (chargeStation.out == null) {
      chargeStation.out = "-";
      chargeStation.pointsCharge = 6;
    }
    else if (chargeStation.out === "-") {
      chargeStation.out = "+";
      chargeStation.pointsCharge = 10;
    }
    else {
      chargeStation.out = null;
      chargeStation.pointsCharge = 0;
    }

    chargeStation.pointsCharge += autoState.state && chargeStation.pointsCharge !== 0 ? 2 : 0;
    console.log(chargeStation.pointsCharge);

    this.setState({
      chargeStation: chargeStation,
    });
  }

  renderCharge() {
    return(
      <ChargeOut
        ChargeStation={this.state.chargeStation}
        onClick={() => this.score()}
      />
    );
  }
    renderComments(){
      let msg;
      const submit = (e) =>{
        e.preventDefault();
      }
      const setMessage = (m) =>{
        msg = m;
      }
      //Button is temp for testing :) || assigns inputted text to message var
      return(
        <form onSubmit={submit}>
        <legend><b>Defense Comments</b></legend> 
        <textarea type="text" 
        required 
        value={msg}
        onChange={(e) => setMessage(e.target.value)}
        rows="15"
        cols="25"
        />
        <br></br>
        <button onClick={(e) => {console.log(msg)}}>Save</button>
        </form>
      )
    }
    



  render() {
    return(
      <div className="Community">
        {
        this.renderCharge()
        }
        {
        this.renderComments()
        }

      </div>
    );
  }
}
class ChargeStation {
  #out = null;
  #pointsCharge = 0;
  constructor(out, points) {
    this.#out = out;
    this.#pointsCharge = points;
  }

  get out() { return (this.#out); }
  get pointsCharge() { return (this.#pointsCharge); }

  set out(out) { this.#out = out; }
  set pointsCharge(points) { this.#pointsCharge = points; }
}

function ChargeOut(props) {
  return (
    <button className="chargeStation" onClick={props.onClick}>
      {props.ChargeStation.out}
    </button>
  )
}

export default Community;