import React from 'react'


export const useForm = ( initialFormState = {} ) => {
    
    const [formState, setFormState] = React.useState( initialFormState );

    const handleInputChange = ({ target }) => {
        console.log(target.name, target.value);
        setFormState({
            ...formState,
            [ target.name ] : target.value
        });
    }; 

    const handleFormSubmit = (ev, formState = initialFormState) => {
        ev.preventDefault();
        
        
    };

    return [ formState, handleInputChange, handleFormSubmit ];
}
