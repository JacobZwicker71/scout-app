import React, { useState } from 'react';
import '../index.css';


import { autoState } from './Auto.js';

class Community extends React.Component {
  #message = "";
  constructor(props) {
    super(props);
    this.state = {
      chargeStation: new ChargeStation(),
    }
  }
  get message(){return this.#message;}
  set message(m){this.#message = m;}

  score() {
    const chargeStation = this.state.chargeStation;
    let csDockFail = <img id="img" src="img/failedDock.svg" width="200"/>
    let csDockSuccess= <img id="img" src="img/sucessDock.svg" width="200"/>
    let csEngageFail = <img id="img" src="img/failedEngage.svg" width="200"/>
    let csEngageSucess = <img id="img" src="img/sucessEngage.svg" width="200"/>
    let defaultCharge = <img id="img" src="img/defaultCharge.svg" width="200"/>

    

    if (chargeStation.out == null) {
      chargeStation.out = "-";
      chargeStation.sym = csDockFail;      
      chargeStation.pointsCharge = 0;
    }
    else if (chargeStation.out === "-") {
      chargeStation.out = "+";
      chargeStation.sym = csDockSuccess;
      chargeStation.pointsCharge = 6;
    }
    else if(chargeStation.out === "+"){
      chargeStation.out = "*";
      chargeStation.sym = csEngageFail;
      chargeStation.pointsCharge = 0;
    }
    else if(chargeStation.out === "*"){
      chargeStation.sym = csEngageSucess;
      chargeStation.out = "asfaf";
      chargeStation.pointsCharge = 10
    }
    else {
      chargeStation.out = null;
      chargeStation.sym = defaultCharge;
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
      this.message = msg;
    }
    //Save doesn't actually do anything but log saved message to console!
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
      <button onClick={(e) => {console.log(this.message)}}>Save</button>
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
  #sym = "";
  constructor(out, points) {
    this.#out = out;
    this.#pointsCharge = points;
  }

  get out() { return (this.#out); }
  get sym() {return (this.#sym);}
  get pointsCharge() { return (this.#pointsCharge); }

  set out(out) { this.#out = out; }
  set pointsCharge(points) { this.#pointsCharge = points; }
  set sym(s){this.#sym = s;}
}

function ChargeOut(props) {
  return (
    <button className="chargeStation" onClick={props.onClick}>
      {props.ChargeStation.sym}
     </button>
  )
}

export default Community;