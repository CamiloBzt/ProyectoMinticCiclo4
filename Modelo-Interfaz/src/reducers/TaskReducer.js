import React from 'react';


const taskOptions = {

    add() {
        
    }

};


export default function TaskReducer( state = [], action = {}) {
    
    taskOptions[action.type]();

}
