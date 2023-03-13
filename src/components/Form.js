import React from 'react';
import '../index.css';

class formState {
    static userName = "None";
    static team = "None";
    static startingPos = "Left";

    get userName(){return userName;}
    get team(){return team;}
    get startingPos(){return startingPos;}

    setUserName(un){
      userName = un;
    }
    set team(t){team = t;}
    set startingPos(sp){startingPos = sp;}

}


class Form extends React.Component {
  static visible = true;
  renderForm() {
    let value;
    const handleChange = (e) => {
      formState.startingPos = e.target.value;
    }


    return(
      <div>
        <div className='formBackground'>
          <div className='formHeader'>
          <div className='teamLogo'>
            <img src="img/teamLogo.svg" width="100"></img>
            </div>
            </div>
            <div className="formBody">
              <label>Scouter Name</label>       
              <input type="text" autoComplete='on' placeholder='John Doe' onChange={(e) => formState.userName = e.target.value}></input>  
              <br></br>
              <label>Team Name</label>       
              <input type="text" autoComplete='off' placeholder='NOT 5419!' onChange={(e) => formState.team = e.target.value}></input>       
              <br></br>
              <label>Starting Position</label>
              <select value={value} onChange={handleChange}>
                <option>Left</option>
                <option>Mid</option>
                <option>Right</option>
              </select>       
              <br></br>
            </div>
          <button onClick={(e) => {Form.visible = false, this.forceUpdate()}}>Ready!</button>
      </div>    
      </div>
      );
  }

  render() {
    return (
      <div className={Form.visible ? "vis" : "hid"}>
        {this.renderForm()
        }
      </div>
      
    );
  }
}

export { formState, Form};
