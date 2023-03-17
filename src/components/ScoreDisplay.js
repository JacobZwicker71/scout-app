import React from 'react';
import "../index.css";
import {Grid} from './Grid.js';
import {ChargeStation} from './Community.js'


class ScoreDisplay extends React.Component{
    static gridScore;
    static chargeScore;
    static totalScore = 0;
    updateScore(){
        ScoreDisplay.totalScore = Grid.getScore() + ChargeStation.getScore();
        this.forceUpdate();
    }
    renderButton(){
        setTimeout(() => {
            this.updateScore();
        }, 100);          
        return(
            <div className='scoreDisplay'>
                <p>{ScoreDisplay.totalScore}</p>
            </div>
        )
    }
    render(){
        return(
            <div className="scoreBox">
                {
                    this.renderButton()
                }
            </div>
        )
    }

}
export {ScoreDisplay};