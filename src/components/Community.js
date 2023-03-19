import React, { useState } from 'react';
import '../index.css';


import { autoState } from './Auto.js';
import { formState } from './Form.js';
import {Node} from './Grid.js';
class Community extends React.Component {
  #defenseMessage = "";
  #generalMessage = "";
  #drivingMessage = "";
  constructor(props) {
    super(props);
    this.state = {
      chargeStationAuto: new ChargeStation(),
      chargeStation: new ChargeStation(),
    }
  }
  get defenseMessage(){return this.#defenseMessage;}
  set defenseMessage(m){this.#defenseMessage = m;}
  get generalMessage(){return this.#generalMessage;}
  set generalMessage(m){this.#generalMessage = m;}
  get drivingMessage(){return this.#drivingMessage;}
  set drivingMessage(m){this.#drivingMessage = m;}

  score(auto) {
    let chargeStation = this.state.chargeStation;
    if(auto){
      chargeStation = this.state.chargeStationAuto;
    }
    else{
      chargeStation = this.state.chargeStation;
    }
    let csDockFail = <img id="img" src="img/failedDock.svg" width="200"/>
    let csDockSuccess= <img id="img" src="img/sucessDock.svg" width="200"/>
    let csEngageFail = <img id="img" src="img/failedEngage.svg" width="200"/>
    let csEngageSucess = <img id="img" src="img/sucessEngage.svg" width="200"/>
    let defaultCharge = <img id="img" src="img/defaultCharge.svg" width="200"/>
    let automobility = "AUTOMOBILITY";
    let endgamepark = "PARK";
    
    if(chargeStation.out == null){
      chargeStation.out = "^";
      if(auto){
        chargeStation.sym = automobility;
        chargeStation.pointsChargeAuto = 1;
      }
      else{
        chargeStation.sym = endgamepark;
        chargeStation.pointsCharge =2;
      }
    }
    else if (chargeStation.out == "^") {
      chargeStation.out = "-";
      chargeStation.sym = csDockFail;     
      if(auto){
        chargeStation.pointsChargeAuto = 0;

      } 
      else{
      chargeStation.pointsCharge = 0;
      }
    }
    else if (chargeStation.out === "-") {
      chargeStation.out = "+";
      chargeStation.sym = csDockSuccess;
      if(auto){
        chargeStation.pointsChargeAuto = 6;

      } 
      else{
      chargeStation.pointsCharge = 6;
      }    }
    else if(chargeStation.out === "+"){
      chargeStation.out = "*";
      chargeStation.sym = csEngageFail;
      if(auto){
        chargeStation.pointsChargeAuto = 0;

      } 
      else{
      chargeStation.pointsCharge = 0;
      }    }
    else if(chargeStation.out === "*"){
      chargeStation.sym = csEngageSucess;
      chargeStation.out = "asfaf";
      if(auto){
        chargeStation.pointsChargeAuto = 10;

      } 
      else{
      chargeStation.pointsCharge = 10;
      }    }
    else {
      chargeStation.out = null;
      chargeStation.sym = defaultCharge;
      if(auto){
        chargeStation.pointsChargeAuto = 0;

      } 
      else{
      chargeStation.pointsCharge = 0;
      }    }
      if(auto && chargeStation.pointsChargeAuto != 0){
        chargeStation.pointsChargeAuto+=2;
      }


    if(auto){
      this.setState({
        chargeStationAuto: chargeStation,
      });
    }
    else{
    this.setState({
      chargeStation: chargeStation,
    });
  }
  }

  renderCharge(auto) {
    let chargeStation = this.state.chargeStation;
    if(auto){
      chargeStation = this.state.chargeStationAuto;
    }
    else{
      chargeStation = this.state.chargeStation;
    }
    return(
      <ChargeOut
        ChargeStation={chargeStation}
        auto={auto}
        onClick={() => this.score(auto)}
      />
    );
  }
  renderSubmission(){
    function Submit(aMob, ePos) {
      let teamNum = formState.team;
      let scouterName = formState.userName;
      let startingPos = formState.startingPos
      let matchNum = formState.matchNum;
      let autoMob;
      let endgamePos;
      if(aMob.out == null){
        autoMob = "None";
      }
      else if(aMob.out == "^"){autoMob = "mob"}
      else if(aMob.out == "+"){autoMob = "dock"}
      else if(aMob.out == "asfaf"){autoMob = "engage"}

      if(ePos.out == null){
        endgamePos = "None";
      }
      else if(ePos.out == "^"){endgamePos = "park"}
      else if(ePos.out == "+"){endgamePos = "dock"}
      else if(ePos.out == "asfaf"){endgamePos = "engage"}


      let CHMake = Node.coneHighMake;
      let CHMiss = Node.coneHighMiss;
      let CMMake = Node.coneMidMake;
      let CMMiss = Node.coneMidMiss;
      let CLMake = Node.coneLowMake;
      let CLMiss = Node.coneLowMiss;
      let QHMake = Node.cubeHighMake
      let QHMiss = Node.cubeHighMiss
      let QMMake = Node.cubeMidMake 
      let QMMiss  = Node.cubeMidMiss
      let QLMake = Node.cubeLowMake; 
      let QLMiss = Node.cubeLowMiss;

      let autoCHMake = Node.autoconeHighMake;
      let autoCHMiss = Node.autoconeHighMiss;
      let autoCMMake = Node.autoconeMidMake;
      let autoCMMiss = Node.autoconeMidMiss;
      let autoCLMake = Node.autoconeLowMake;
      let autoCLMiss = Node.autoconeLowMiss;
      let autoQHMake = Node.autocubeHighMake
      let autoQHMiss = Node.autocubeHighMiss
      let autoQMMake = Node.autocubeMidMake 
      let autoQMMiss  = Node.autocubeMidMiss 
      let autoQLMake=   Node.autocubeLowMake 
      let autoQLMiss=   Node.autocubeLowMiss 

      let CLAccidental = Node.coneLowAccidental;
      let QLAccidental = Node.cubeLowAccidental;
      let autoCLAccidental = Node.autoconeLowAccidental;
      let autoQLAccidental = Node.autocubeLowAccidental;
      let string = teamNum + "," + matchNum + "," + scouterName + 
      "," + startingPos+","+autoMob +"," +autoCHMake + "," + autoCHMiss + 
      "," + autoCMMake + "," + autoCMMiss + "," + autoCLMake + "," + autoCLMiss + "," + autoCLAccidental +
      "," + autoQHMake + "," + autoQHMiss + "," + autoQMMake + "," + autoQMMiss +
      "," + autoQLMake + "," + autoQLMiss + "," + autoQLAccidental + "," + CHMake + "," + CHMiss +
      "," + CMMake + "," + CMMiss + "," + CLMake + "," + CLMiss + "," + CLAccidental
      + "," +  QHMake + ","+ QHMiss+ "," + QMMake + "," + QMMiss + "," + QLMake + "," + QLMiss + "," + QLAccidental + "," + endgamePos;
          fetch(
        "https://script.google.com/macros/s/AKfycbxOMdBcJ2pQ02xaIo9AFP8vO0JiBxGUvYJjRhwlx2kquNe7HdGVR-ZNPO397qvQpIl-/exec",
        {
          method: "POST",
          body: string
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return (
      <div className="App">
        <div>
        <button onClick={(e) => {Submit(this.state.chargeStationAuto,this.state.chargeStation)}}>Submit</button>
        </div>
      </div>
    );
  }


  renderComments(){
    let dmsg;
    let gmsg;
    let drmsg;
    const submit = (e) =>{
      e.preventDefault();
    }
    const setMessage = (m) =>{
      dmsg = m;
      this.defenseMessage = dmsg;
    }
    const setGMessage = (m) =>{
      gmsg = m;
      this.generalMessage = gmsg;
    }
    const setDMessage = (m) =>{
      drmsg = m;
      this.drivingMessage = drmsg;
    }
    //Save doesn't actually do anything but log saved message to console!
    return(
      <div className='commentSection'>
      <form onSubmit={submit}>
      <legend><b>Defense Comments</b></legend> 
      <textarea type="text" 
      required 
      value={dmsg}
      onChange={(e) => setMessage(e.target.value)}
      rows="15"
      cols="25"
      />
      <br></br>
      <button onClick={(e) => {console.log(this.defenseMessage)}}>Save</button>
      </form>
      <br></br>

      <form onSubmit={submit}>
      <legend><b>General/Offense Comments</b></legend> 
      <textarea type="text" 
      required 
      value={gmsg}
      onChange={(e) => setGMessage(e.target.value)}
      rows="15"
      cols="25"
      />
      <br></br>
      <button onClick={(e) => {console.log(this.generalMessage)}}>Save</button>
      </form>
      <br></br>

      <form onSubmit={submit}>
      <legend><b>Driving Comments</b></legend> 
      <textarea type="text" 
      required 
      value={gmsg}
      onChange={(e) => setDMessage(e.target.value)}
      rows="15"
      cols="25"
      />
      <br></br>
      <button onClick={(e) => {console.log(this.drivingMessage)}}>Save</button>
      </form>
      <br></br>

  
      </div>
    )
  }
    


  render() {
    return(
      <div className="Community">
        {
        this.renderCharge(true)
        }
        {
          this.renderCharge(false)
        }
        {
        this.renderComments()
        }
        {
          this.renderSubmission()
        }

      </div>
    );
  }
}
class ChargeStation {
  static pointsCharge = 0;
  static pointsChargeAuto = 0;
  #out = null;
  #sym = <img id="img" src="img/defaultCharge.svg" width="200"/>;
  constructor(out, points) {
    this.#out = out;
  }
  static getScore(){
    return ChargeStation.pointsCharge + ChargeStation.pointsChargeAuto;
  }

  get out() { return (this.#out); }
  get sym() {return (this.#sym);}
  get pointsCharge() { return (ChargeStation.pointsCharge); }
  get pointsChargeAuto() { return (ChargeStation.pointsChargeAuto); }


  set out(out) { this.#out = out; }
  set pointsCharge(points) { ChargeStation.pointsCharge = points;}
  set pointsChargeAuto(points) { ChargeStation.pointsChargeAuto = points; }

  set sym(s){this.#sym = s;}
}

function ChargeOut(props) {
  return (
    <div className="chargeStation-box">
      <legend>
        {props.auto ? "Auto" : "Tele-Op"}
      </legend>
    <button className="chargeStation" onClick={props.onClick}>
      {props.ChargeStation.sym}
     </button>
     </div>
     
  )
}

export {Community, ChargeStation};