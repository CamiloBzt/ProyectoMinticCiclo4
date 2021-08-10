

const addTaskFetch = async ( task, userId) => {

    try {

        const token = localStorage.getItem('token') || '';

        const resonse = await fetch('http://localhost:4000/api/saveTask/' + userId,
        {
            method: 'PUT',
            body: JSON.stringify( task ),
            headers: {
                'Content-Type': 'application/json',
                token
            },
        });

        const data = await resonse.json();

        if (data.message) {
            throw new Error(data.message);
        }

        return data;


    } catch (error) {
        throw new Error(error);
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

        const token = localStorage.getItem( 'token' );
        
        const response = await fetch('http://localhost:4000/api/edit/' + userId, {
            method: 'PUT',
            body: JSON.stringify( task ),
            headers: {
                'Content-Type': 'application/json',
                token
            }
        });

        const data = await response.json();

        if (data.message) {
            throw new Error(data.message);
        }

        return data;

    } catch (error) {
        throw new Error(error);
    }

}

export {
    addTaskFetch,
    getTasksFetch,
    deleteTaskFetch,
    editTaskFetch
}