import React from 'react';
import types from '../types/types';

export default function taskReducer( state = [], action = {}) {
    
    

    switch ( action.type ) {
        
        case types.add :
            console.log(action.payload);
            break;

        case types.getTasks :
            return [...action.payload];

        case types.delete :
            break;

        default:
            return state;
    }

}
