import { properties } from 'filer/src/webpack-plugin/schema';
import React from 'react';
import '../index.css';

// class autoState {
//   static state = true;

//   set state(state) { this.state = state; }

//   get state() { return (this.state); }

//   static toggle() {
//     this.state = !this.state;
//     //console.log(autoState.state)
//   }
// }

function Button(props) {
  return (
    <button className={(props.color) ? "autoOn" : 'autoOff'} onClick={props.onClick}>
      {"Auto"}
    </button>
  )
}

class Auto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auto: props.auto
    };
  }

  temp() {
    console.log("e");
    return this.state.auto;
  }

  toggle() {
    const auto = !this.state.auto;
    this.setState({
      auto: auto,
    });
    console.log(this.state.auto)
  }

  renderButton() {
    return(
      <Button
        color = {this.state.auto}
        onClick = {() => this.toggle()}
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

export { Auto };
