

const addTaskFetch = async ( task, userId) => {

    try {
        
        const resonse = await fetch('http://localhost:4000/api/saveTask/' + userId,
        {
            method: 'PUT',
            body: JSON.stringify( task ),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await resonse.json();

        return data;


    } catch (error) {
        console.error(error);
        return;
    }
};

const getTasksFetch = async ( userId ) => {

    try {
        
        const response = await fetch('http://localhost:4000/api/tasks/' + userId);

        const data = await response.json();

        return data;

    } catch (error) {
        
        console.log(error);
    }

};

const deleteTaskFetch = async ( taskId ) => {

    const response = fetch('http://localhost:4000/api/task/' + taskId,  {
        method: 'DELETE', 
    });
    
    const data = response.json();

};

const editTaskFetch = async ( userId, task ) => {

    try {
        
        const response = await fetch('http://localhost:4000/api/edit/' + userId, {
            method: 'PUT',
            body: JSON.stringify( task ),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        return data;

    } catch (error) {
        console.log(error);
    }

}

export {
    addTaskFetch,
    getTasksFetch,
    deleteTaskFetch,
    editTaskFetch
}