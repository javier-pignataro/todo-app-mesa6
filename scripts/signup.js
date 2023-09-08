window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.forms[0]
    const nombre = document.querySelector("#inputNombre")
    const apellido = document.querySelector("#inputApellido")
    const email = document.querySelector("#inputEmail")
    const password = document.querySelector("#inputPassword")
    const url = "https://todo-api.ctd.academy/v1"

    

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault()

        const payload = {         
                firstName: nombre.value,
                lastName: apellido.value,
                email: email.value,
                password: password.value
        }
        

        const settings = {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        realizarRegister(settings)
        form.reset()
    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(settings) {
        
        fetch(`${url}/users`, settings)
            .then(response => {
                //console.log(response);
                if (response.ok) 
                    return response.json();
            })
        .then(data => {
            if (data.jwt){
                localStorage.setItem("jwt", JSON.stringify(data.jwt));
            }
        })
        .catch(err => {
            console.log(err.menssage);
            if(err.status == 400) {
                console.warn("El usuario ya se encuentra registrado")
                alert("El usuario ya se encuentra registrado")
                
            } 
            else {
                console.error("Error del servidor | url no existe")
                alert("El usuario ya se encuentra registrado")
            }
        })

    };


});