import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './components/App';
import './index.css';

import Grid from './components/Grid.js';
import Community from './components/Community.js';
import { Auto } from './components/Auto.js';

class Field extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // data,
      match: Array(23).fill(null),
    }
  }

  // process(obj) {
  //   const data = this.data;
  //   for (let i = 0; i< obj.data.length; i++) {
  //     data[i] = obj[i];
  //   }
  // }

  render() {
    return (
      <div className='game-container'>
        <div className='autoContainer'>
          <Auto />
        </div>
        <div className="field-container">
          <div className="game-field">
            <Grid />
          </div>
          <div className="Community-container">
            <Community />
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
