import React from 'react'

export const useForm = ( initialFormState = {} ) => {
    
    const [formState, setFormState] = React.useState( initialFormState );

    const handleInputChange = ({ target }) => {
        setFormState({
            ...formState,
            [ target.name ] : target.value
        });
    }; 

    const handleFormSubmit = (ev, formState = initialFormState) => {
        ev.preventDefault();
        console.log(formState);

    };

    return [ formState, handleInputChange, handleFormSubmit ];
}
