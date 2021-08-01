import React, { useState } from 'react';
import { addUserFetch } from '../helpers/userFetch'; 

export default function useFormRegister( initialState = {}, history ) {
    
    const [formValues, setformValues] = useState( initialState );

    const handleInputChange = ( { target } ) => {

        setformValues({
            ...formValues,
            [ target.name ] : target.value
        });

    };

    const reset = () => setformValues( initialState );

    const handleSubmit = ( ev, formState ) => {

        ev.preventDefault();

        addUserFetch(formState)
            .then( ({ message }) => {
    
                if (message?.toLowerCase().localeCompare('added succesfully') === 0) {
                    history.push('/Login');
                }

                //TODO: Sweet alert
            });

    };

    return {
        formValues,
        handleInputChange,
        handleSubmit,
        reset
    }

}
