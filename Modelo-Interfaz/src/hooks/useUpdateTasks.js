import React from 'react'


export const useTasksUpdate = ( ) => {
    
    const [ update, setUpdate ] = React.useState(false);

    return { update, setUpdate };
}
