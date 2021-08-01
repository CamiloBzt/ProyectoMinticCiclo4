
import React from 'react'
import types from '../types/types';

export default function userReducer( state = {}, action = {}) {

    switch ( action.type ) {
        
        case types.getUser:
            return {
                   ...action.payload,
                   //tasks: [ ...action.payload.tareas ]
                }
            break;

        case types.update:
            return {
                ...action.payload,
                tasks: [ ...action.payload.tasks ]
             };
             break;
        
        case types.logout:
            return {
                auth: false
            }
            break;
        
        default:
            return state;

    }

}