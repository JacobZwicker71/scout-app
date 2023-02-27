import React from 'react';
import '../index.css';
import { ScoreState, Grid} from './Grid'

class leftState {
  static state = true;

  set state(state) { this.state = state; }

  get state() { return (this.state); }

  static toggle() {
    this.state = !this.state;
    //console.log(leftState.state)
  }
}

function Button(props) {
  return (
    <button className="left" onClick={props.onClick}>
      {"LeftC"}
      {props.out}
    </button>
  )
}

class LeftC extends React.Component {

  renderButton() {
    return(
      <Button
        out = {leftState.state}
        onClick = {() => {leftState.toggle()
        ScoreState.score = -1
        //Grid.
      }}
      />
    );
  }

  render() {
    return (
      <div className="leftButton">
        {this.renderButton()}
      </div>
    );
  }
}

export { leftState, LeftC };
