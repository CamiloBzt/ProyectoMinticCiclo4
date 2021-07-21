import React, { useState } from 'react'
import './Products.css';

const Registrarse = () => {

    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [correo, setCorreo] = useState("")
    const [pais, setPais] = useState("")
    const [contraseña, setContraseña] = useState("")
    const [validarcontraseña, setValidarContraseña] = useState("")

    const validar = (event) => {
        //capturar el evento submit del formulario y evitar que la pagina se recargue
        event.preventDefault()
        console.log("pulsado el boton")
        //trim evalua si hay cadena de caracteres
        if (!nombre.trim()) {
            console.log("El nombre esta vacio")
            return
        }
        if (!apellido.trim()) {
            console.log("La apellido esta vacia")
            return
        } 
        if (!correo.trim()) {
            console.log("La correo esta vacia")
            return
        } 
        if (!pais.trim()) {
            console.log("La pais esta vacia")
            return
        } 
        if (!contraseña.trim()) {
            console.log("La contraseña esta vacia")
            return
        } 
        if (!validarcontraseña.trim()) {
            console.log("La contraseña de validación esta vacia")
            return
        } 
    }
    return (

    <div className="products__outside">
        <div className="products__container">
        <div class="container mt-5 d-flex justify-content-center">
            <form onSubmit={validar} className="form-groups">

            <img src="http://placeimg.com/200/200/nature" alt=''/>

            <   div class="col align-items-center"> 
                    <div className='form-row'>
                    <div class="col-md-4">
                            <label class="align-items-left" for="Upload photo">Imagen de perfil</label>
                    </div>
                        <div class="col-md-4">
                            <input id="Upload photo" name="Upload photo" class="input-file" type="file"/>
                        </div>
                    </div>
                        

                </div>

                <label className= 'align-items-left'>Nombre y Apellido*</label>
                <div className='form-row'>
                    <div className="col">
                        <input 
                        type="text"
                        class="form-control" 
                        placeholder="Nombres"
                        onChange={(e) => { setNombre(e.target.value) }}/>
                    </div>
                    <div className="col">
                        <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Apellidos"
                        onChange={(e) => { setApellido(e.target.value) }}/>
                    </div>
                </div>

                <label className= 'align-items-left'>Correo*</label>
                <div className='form-row'>
                    <div className="col">
                        <input 
                        type="email" 
                        class="form-control" 
                        placeholder="ejemplo@gmail.com"
                        onChange={(e) => { setCorreo(e.target.value) }}/>
                    </div>
                </div>

                <label className= 'align-items-left'>Nacionalidad*</label>
                <div className='form-row'>
                    <div className="col">
                        {/* <select class="selectpicker countrypicker" data-flag="true" multiple></select> */}
                        {/* <select class="selectpicker countrypicker" data-flag="true" ></select> */}
                        <input 
                        type="country" 
                        class="form-control" 
                        placeholder="Nacionalidad"
                        onChange={(e) => { setPais(e.target.value) }}/>
                    </div>
                </div>

                <div className='form-row'>
                    <div className="col">
                        <label for="exampleInputPassword1">Contraseña</label>
                        <input 
                        type="password" 
                        class="form-control" 
                        id="exampleInputPassword1" 
                        placeholder="Password"
                        onChange={(e) => { setContraseña(e.target.value) }}/>  
                    </div>
                    <div className="col">
                        <label for="exampleInputPassword1">Validar Contraseña</label>
                        <input 
                        type="password" 
                        class="form-control" 
                        id="exampleInputPassword1" 
                        placeholder="Password"
                        onChange={(e) => { setValidarContraseña(e.target.value) }}/>  
                    </div>
                </div>

                 <button type="submit" class="btn btn-primary mb-2">Registrarse</button>
                
            </form>
        </div>
        </div>
        </div>

       
    )
}

export default Registrarse