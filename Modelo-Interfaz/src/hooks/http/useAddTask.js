import { useState } from "react"


export const useAddTask = ({ task }) => {

    fetch('http://localhost:4000/api/save',
        {
            method: 'POST',
            body: JSON.stringify( task ),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then( res => res.json())
        .then( data => {
            console.log(data);
        })
        .catch(console.err);

}
