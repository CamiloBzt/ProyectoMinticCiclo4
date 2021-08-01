import { FormControlLabel } from '@material-ui/core';
import React, { useState } from 'react';
import { addTaskFetch, getTasksFetch, editTaskFetch } from '../helpers/tasksFetch';
import { loginFetch } from '../helpers/userFetch';
import types from '../types/types';

export const useForm2 = ( initialState = {}, dispatchTask, handleClose, dispatchUser, history  ) => {

    const [formValues, setformValues] = useState( initialState );
    
    const handleInputChange = ( { target }) => {
        setformValues({
            ...formValues,
            [ target.name ]: target.value
        });
    };

    const handleSubmitLogin = ( ev ) => {

        ev.preventDefault();

        loginFetch( formValues )
            .then( data => {
            
                if (data.error) {
                      return;  
                }

                const { name, pais, tareas, _id } = data.user;

                const action = {
                    type: types.getUser,
                    payload:   {
                        auth: data.auth,
                        name,
                        pais,
                        tareas,
                        _id
                    }
                }; 


                
                dispatchUser( action );  

               /*  dispatchTask({
                    type: types.getTasks,
                    payload: tareas
                }); */
              

                history.push('/TaskControl');
            })
          //  .catch( err => //console.error( err ));

    };

    const handleSubmit = (ev, formState, userId) => {

        ev.preventDefault();
        addTaskFetch( formState, userId )
            .then( user => getTasksFetch( user.task['_id'] ) )
            .then( data => {


             const tasks =  data?.tareas.map(task => {
                    return {
                        ...task,
                        priority: {
                            scale: task.priority,
                           get text() {
                                switch (task.priority) {
                                    case '1': return  'LOW'
                                    case '2': return 'MEDIUM'
                                    case '3': return 'HIGH'
                                    default: return 'LOW'
                                }
                            },
                            get cssClass() {
                                switch (task.priority) {
                                    case '1': return  'success'
                                    case '2': return 'warning'
                                    case '3': return 'danger'
                                    default: return 'success'
                                }
                            }
                        }
                    }
                });

                const action = {
                    type: types.getTasks,
                    payload: tasks
                };

            /*     const action = {
                    type: types.getTasks,
                    payload: {

                    }
                } */

                dispatchTask( action );
                reset();
                handleClose();
            });
    };

    const handleEdit = (ev,formState, indice, userId) => {

        ev.preventDefault();
        editTaskFetch(userId, { ...formState, indice })
            .then( data => {
                getTasksFetch(data.task['_id'])
                    .then( dataGet => {
                    
                        const tasks =  dataGet?.tareas.map(task => {
                            return {
                                ...task,
                                priority: {
                                    scale: task.priority,
                                   get text() {
                                        switch (task.priority) {
                                            case '1': return  'LOW'
                                            case '2': return 'MEDIUM'
                                            case '3': return 'HIGH'
                                            default: return 'LOW'
                                        }
                                    },
                                    get cssClass() {
                                        switch (task.priority) {
                                            case '1': return  'success'
                                            case '2': return 'warning'
                                            case '3': return 'danger'
                                            default: return 'success'
                                        }
                                    }
                                }
                            }
                        });
        
                        const action = {
                            type: types.getTasks,
                            payload: tasks
                        };
        
                        dispatchTask( action );
                        handleClose();
                    });
            });
    };

    const reset = () => {
        setformValues(initialState);
    };



    return {
        formValues,
        handleSubmit,
        handleInputChange,
        handleEdit,
        handleSubmitLogin,
        reset,
    }

}
