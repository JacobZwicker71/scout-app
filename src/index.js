import React from 'react';
import ReactDOM from 'react-dom/client';

import Grid from './components/Grid.js';
import Community from './components/Community.js';
import { Auto } from './components/Auto.js';
import './index.css';

class Field extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      match: Array(23).fill(null),
      auto: <Auto />,
      grid: <Grid Auto = {this.auto}/>,
      community: <Community Auto = {this.auto}/>
    }
  }

  render() {
    return (
      <div className='game-container'>
        <div className='autoContainer'>
          {this.state.auto}
        </div>
        <div className="field-container">
          <div className="game-field">
            {this.state.grid}
          </div>
          <div className="Community-container">
            {this.state.community}
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

if (module.hot) module.hot.accept()
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Field />);


// (() => {
//   console.log('webpack worked')
// })()
