import React from 'react';
import '../index.css';

class formState {
    static userName = "None";
    static team = "None";
    static startingPos = "Left";
    static matchNum = "1";
    static numberColor = "Red 1"
    static rawData = ""

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
    const handleNumerColorChange = (e) =>{
      formState.numberColor = e.target.value;
      getProcessedData(formState.rawData)
    }
    const getProcessedData = (data) =>{
      for(let i = 0; i < data.length; i++){
        if(data[i].match_number == formState.matchNum && data[i].comp_level == "qm"){
          // console.log(data[i].alliances.blue.team_keys)
          if(formState.numberColor.substring(0,1) == "R"){
            formState.team = data[i].alliances.red.team_keys[formState.numberColor.substring(formState.numberColor.length-1)-1].substring(3)
          }
          else if(formState.numberColor.substring(0,1) == "B"){
            formState.team = data[i].alliances.blue.team_keys[formState.numberColor.substring(formState.numberColor.length-1)-1].substring(3)
          }
          else{console.log("MAJOR ERROR RED ALERT WEEWEOO")}
        }
      }
    }
    const getRawData = () => {

      let url = 'https://www.thebluealliance.com/api/v3/event/2023casf/matches'
      let options = {
          method: 'GET',
          headers:{
              'X-TBA-Auth-Key': "1nf2nAhNOUJrVcryuaWOdOvVkIDfbxydGXZasLZQIiGOLeFzIgphcuPBPCZ59Q7V"
          }
      };
      fetch(url, options)
      .then(res => res.json())
      .then(data => {
        formState.rawData = data;
        getProcessedData(formState.rawData);
      })
    }
    getRawData();
    return(
      <div>
        <div className='formBackground'>
          <div className='formHeader'>
          <div className='teamLogo'>
            <img src="img/teamLogo.svg" width="100"></img>
            </div>
            </div>
            <div className="formBody">
            <label>Match #</label>
            <input type="text" autoComplete='on' placeholder='-1' onChange={(e) => formState.matchNum = e.target.value}></input>  
              <br></br>
              <label>Scouter Name</label>       
              <input type="text" autoComplete='on' placeholder='John Doe' onChange={(e) => formState.userName = e.target.value}></input>  
              <br></br>
              <label>Number Color</label>
              <br></br>
              <select value={value} onChange={handleNumerColorChange}>
                <option>Red 1</option>
                <option>Red 2</option>
                <option>Red 3</option>
                <option>Blue 1</option>
                <option>Blue 2</option>
                <option>Blue 3</option>
              </select>       
              <br></br>
              <label>Starting Position</label>
              <br></br>
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
