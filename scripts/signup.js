window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.forms[0]
    const nombre = document.querySelector("#inputNombre")
    const apellido = document.querySelector("#inputApellido")
    const email = document.querySelector("#inputEmail")
    const password = document.getElementById("inputPassword")
    const url = "https://todo-api.ctd.academy/v1"
    // console.log(form);
    
    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
            event.preventDefault()
            //Creamos el cuerpo de la request (petición al servidor)
            const payload = {
                email: email.value,
                password: password.value
            }
            // vemos el objeto que recibimos del formulario
            console.log(payload);
            //configuramos la request del Fetch
            const settings = {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        // Lanzamos la consulta del signup a la API
        realizarRegister(settings)
        // Limpiamos el formulario
        form.reset()

        })
    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(settings) {
            // console.log(settings);
            console.log("Lanzar la consulta a la API...");
            fetch(`${url}/users`, settings)
                .then(response => {
                    console.log(response);
    
                    // manejar el error de la request.
                    //  if (response.ok) 
                    return response.json()
    
                    // si llego acá es por que la request no es la correcta y fuerzo el rechazo de la promesa del fetch
                    // return Promise.reject(response)
    
                })
                .then(data => {
                    console.log("Promesa cumplida💍");
                    console.log(data);
    
                    if (data.jwt) {
                        // Guardamos el dato jwt en el local storage (este token de autenticación)
                        localStorage.setItem("jwt", JSON.stringify(data.jwt))
    
                        // redireccionamos a nuestro dashboard de todo
                        // location.replace("./mis-tareas.html")
                    }
    
                })
                .catch(err => {
                    console.warn("Promesa rechazada ");
                    console.log(err);
                    if (err.status == 400) {
                        console.warn("El usuario ya se encuentra registrado / Alguno de los datos esta incompleto")
                        alert("El usuario ya se encuentra registrado / Alguno de los datos esta incompleto")
                    } else if (err.status == 500) {
                        console.warn("Error del servidor")
                        alert("Error del servidor")
                    } 
                })
            };
        })