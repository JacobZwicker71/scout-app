import React from 'react';
import '../index.css';

class autoState {
  static state = true;

  set state(state) { this.state = state; }

  get state() { return (this.state); }

  static toggle() {
    this.state = !this.state;
    console.log(this.state)
    //console.log(autoState.state)
  }
}

function Button(props) {
  return (
    <button className={autoState.state ? "autoOn" : "autoOff"} onClick={props.onClick}>
      {"Auto " + (autoState.state ? "On" : "Off")}
      {props.out}
    </button>
  )
}

class Auto extends React.Component {

  renderButton() {
    return(
      <Button
        out = {autoState.state}
        onClick = {() => {autoState.toggle(),this.forceUpdate()}}
      />
    );
  }

  render() {
    return (
      <div className="autoButton">
        {this.renderButton()}
      </div>
    );
  }
}

export { autoState, Auto };
