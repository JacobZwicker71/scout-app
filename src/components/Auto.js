import React from 'react';
import '../index.css';

class autoState {
  static state = true;

  set state(state) { this.state = state; }

  get state() { return (this.state); }

  static toggle() {
    this.state = !this.state;
    //console.log(autoState.state)
  }
}

function Button(props) {
  return (
    <button className="auto" onClick={props.onClick}>
      {"Auto"}
      {props.out}
    </button>
  )
}

class Auto extends React.Component {

  renderButton() {
    return(
      <Button
        out = {autoState.state}
        onClick = {() => autoState.toggle()}
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
