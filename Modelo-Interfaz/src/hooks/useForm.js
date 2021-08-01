import React from 'react'


export const useForm = ( initialFormState = {} ) => {
    
    const [formState, setFormState] = React.useState( initialFormState );

    const handleInputChange = ({ target }) => {
        //console.log(target.name, target.value);
        setFormState({
            ...formState,
            [ target.name ] : target.value
        });
    }; 

    const handleFormSubmit = (ev, formState = initialFormState) => {
        ev.preventDefault();
        console.log(formState);
        fetch('http://localhost:4000/api/save', 
                {
                    method: 'POST', 
                    body: JSON.stringify(formState),
                    headers: {
                        'Content-Type': 'application/json'
                      },
                })
            .then(data => data.json())
            .then(task => {
                const { update, setUpdate, handleClose } = formState;
                setUpdate(!update);
               // handleClose();
            })
            .catch(console.err);
        
    };

    return [ formState, handleInputChange, handleFormSubmit ];
}
