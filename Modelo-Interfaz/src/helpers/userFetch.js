
const addUserFetch = async ( userForm ) => {

    try {
        
        const response = await fetch('http://localhost:4000/api/store',
        {
            method: 'POST',
            body: JSON.stringify( userForm ),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();

        return data;


    } catch (error) {
        console.error(error);
        return;
    }

};

const loginFetch = async ( credentials ) => {

    const body = { correo: credentials.email, contraseña1: credentials.contraseña1 };

    const response = await fetch('http://localhost:4000/api/login', 
        {
            method: 'POST',
            body: JSON.stringify( body ),
            headers: {
                'Content-Type': 'application/json'
            }
        });

    const data = await response.json();

    return data;

};


export {
    addUserFetch,
    loginFetch,
}