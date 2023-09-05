window.addEventListener('load', function() {
    /* obtenemos variables globales */
    const form = document.forms[0];
    const email = document.querySelector("#inputEmail");
    const password = document.getElementById("inputPassword");
    const url = "https://todo-api.ctd.academy/v1";

    /* ---------------------------------------------- */
    /* FUNCIÓN 1: Escuchamos el submit y preparamos el envío */
    /* ---------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault()
        //Creamos el cuerpo de la request (petición al servidor)
        const payload = {
            email: email.value,
            password: password.value
        };
        // vemos el objeto que recibimos del formulario
        console.log(payload);
        realizarLogin(payload); 
        // Limpiamos el formulario
        form.reset()
    });

    /* ---------------------------------------------- */
    /* FUNCIÓN 2: Realizar el login [POST]*/
    /* ---------------------------------------------- */
    async function realizarLogin(payload) {
        console.log("Lanzar la consulta a la API...");
        //configuramos la request del Fetch
        const settings = {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`${url}/users/login`, settings);
            if (!response.ok) {
                throw response;
            }
            const data = await response.json();
            handleData(data);
        } catch (err) {
            handleError(err);
        }
    }

    function handleData(data) {
        if (data.jwt) {
            // Guardamos el dato jwt en el local storage (este token de autenticación)
            localStorage.setItem("jwt", JSON.stringify(data.jwt));
            // redireccionamos a nuestro dashboard de todo  
            location.replace("./mis-tareas.html")
        }
    }

    function handleError(err) {
        console.warn("Promesa rechazada");
        console.log(err);
        if (err.status == 400) {
            console.warn("Contraseña incorrecta");
            alert("Contraseña incorrecta");
        } else if (err.status == 404) {
            console.warn("El usuario no existe");
            alert("El usuario no existe");
        } else {
            console.error("Error del servidor | url no existe");
            alert("Error del servidor | url no existe");
        }
    }
});