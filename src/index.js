import React from 'react';
import ReactDOM from 'react-dom/client';

import {Grid} from './components/Grid.js';
import Community from './components/Community.js';
import { Auto } from './components/Auto.js';
import {Form} from './components/Form.js'
import './index.css';

class Field extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      match: Array(23).fill(null),
    }
  }

  render() {
    return (
      <div className='game-container'>
        <div className = 'form-container'>
          <Form/>
        </div>
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
