window.addEventListener(
      'load', 
      () =>
      {
            // Objeto de Estado de erroes
            let estadoValidacion = {
                  nombre : false,
                  apellido : false,
                  email : false,
                  contrasenia : false,
                  confirmarcontrasenia : false,
            }

            /* ---------------------- obtenemos variables globales ---------------------- */

            // Inputs
            const inputNombre = document.getElementById( "inputNombre" );
            const inputApellido = document.getElementById( "inputApellido" );
            const inputEmail = document.getElementById( "inputEmail" );
            const inputPassword = document.getElementById( "inputPassword" );
            const inputPasswordRepetida = document.getElementById( "inputPasswordRepetida" );

            // Input Labels
            const labelNombre = inputNombre.previousElementSibling;
            const labelApellido = inputApellido.previousElementSibling;
            const labelEmail = inputEmail.previousElementSibling;
            const labelPassword = inputPassword.previousElementSibling;
            const labelPasswordRepetida = inputPasswordRepetida.previousElementSibling;

            // Url API (signUP)
            const urlSignUp = "https://todo-api.ctd.academy/v1/users"
            
            // Sign Up Form
            const form = document.forms[0];


            /* ---------------------- Listeners ---------------------- */

            // Validador nombre
            inputNombre.addEventListener(
                  "input",
                  (ev) =>
                  {
                        ev.preventDefault();
                        // ( validarTexto(inputNombre.value) )
                        if( estadoValidacion.nombre = validarTexto( inputNombre.value ) ) {
                              
                              labelNombre.classList.remove( "error" );
                              inputNombre.classList.remove( "invalid" );
                              //labelNombre.style.color = "green";
                              labelNombre.innerHTML = "Nombre";
                        } else {
                              //labelNombre.classList.toggle( ".valido" );
                              labelNombre.classList.add( "error" );
                              inputNombre.classList.add( "invalid" );
                              labelNombre.innerHTML = "Nombre *El nombre debe contener almenos 3 letras y no se permiten numeros";
                        }
                        // console.log( estadoValidacion );
                  }
            )
            // Validador apellido
            inputApellido.addEventListener(
                  "input",
                  (ev) =>
                  {
                        ev.preventDefault();
                        if( estadoValidacion.apellido = validarTexto( inputApellido.value ) ){
                              labelApellido.classList.remove( "error" );
                              inputApellido.classList.remove( "invalid" );
                              labelApellido.innerHTML = "Apellido";
                        } else {
                              labelApellido.classList.add( "error" );
                              inputApellido.classList.add( "invalid" );
                              labelApellido.innerHTML = "Apellido *El Apellido debe contener almenos 3 letras y no se permiten numeros";
                        }
                  }
            )
            // Validador email
            inputEmail.addEventListener(
                  "input",
                  (ev) =>
                  {
                        ev.preventDefault();
                        if( estadoValidacion.email = validarEmail( inputEmail.value ) ){
                              labelEmail.classList.remove( "error" );
                              inputEmail.classList.remove( "invalid" );
                              labelEmail.innerHTML = "Email";
                        } else {
                              labelEmail.classList.add( "error" );
                              inputEmail.classList.add( "invalid" );
                              labelEmail.innerHTML = "Email *El formato del e-mail no es válido";
                        }
                  }
            )
            // Validador password
            inputPassword.addEventListener(
                  "input",
                  (ev) =>
                  {
                        ev.preventDefault();
                        if( estadoValidacion.contrasenia = validarContrasenia( inputPassword.value ) ){
                              labelPassword.classList.remove( "error" );
                              inputPassword.classList.remove( "invalid" );
                              labelPassword.innerHTML = "Contraseña";
                        } else {
                              labelPassword.classList.add( "error" );
                              inputPassword.classList.add( "invalid" );
                              labelPassword.innerHTML = 
                                    `Contraseña *La contraseña debe contener:
                                    <p>- 8 Caracteres como minimo</p>
                                    <p>- 1 Numero</p>
                                    <p>- 1 Caracter especial</p>`;
                        }
                        feedbackVisualCompararContrasenias();
                  }
            )

            // Validador confirmpassword
            inputPasswordRepetida.addEventListener(
                  "input",
                  feedbackVisualCompararContrasenias
            );

            /* -------------------------------------------------------------------------- */
            /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
            /* -------------------------------------------------------------------------- */
            form.addEventListener(
                  'submit', 
                  (event) =>
                  {
                        event.preventDefault();

                        console.log( estadoValidacion );
                        if(
                              estadoValidacion.nombre &&
                              estadoValidacion.apellido &&
                              estadoValidacion.contrasenia &&
                              estadoValidacion.confirmarcontrasenia
                        ){
                              // Preparar el body ( payload )
                              const body = {
                                    firstName: inputNombre.value,
                                    lastName: inputApellido.value,
                                    email: inputEmail.value,
                                    password: inputPassword.value,
                              }

                              // Prearar la peticion
                              const settings = {
                                    method: "POST",
                                    body: JSON.stringify( body ),
                                    headers: {
                                          'Content-Type': "application/json"
                                    }
                              } 

                              // Realizar peticion
                              realizarRegister( settings );
                              form.reset()
                        }
                        else {
                              renderizarMensajeRegistro( "Algunos de los datos son incorrectos o incompletos", false );
                        }

                  }
            );

            // Creo un nuevo elemento que va a tener la descripcion del estado del Registro
            crearLabelEstadoSignUp();
            // Capturo el elemento recien creado
            const descrSignUP = inputPasswordRepetida.nextElementSibling;


            // ----------------------------- Declaraciones de funciones -----------------------------------

            function feedbackVisualCompararContrasenias(ev)
            {
                  if( ev ){
                        ev.preventDefault();
                  }
                  if( estadoValidacion.confirmarcontrasenia = compararContrasenias( inputPassword.value, inputPasswordRepetida.value ) ){
                              labelPasswordRepetida.classList.remove( "error" );
                              inputPasswordRepetida.classList.remove( "invalid" );
                        labelPasswordRepetida.innerHTML = "Repetir Contraseña";
                  } else {
                        if( (inputPasswordRepetida.value) ){
                              labelPasswordRepetida.classList.add( "error" );
                              inputPasswordRepetida.classList.add( "invalid" );
                              labelPasswordRepetida.innerHTML = "Repetir Contraseña *Las contraseñas no coinciden";
                        }
                  }
            }

            function crearLabelEstadoSignUp ()
            {
                  // Creo un parrafo para insertar el estado del registro de usuario
                  let labelBoton = document.createElement( "p" );

                  // Capturo el boton
                  let botonSubmit = inputPasswordRepetida.nextElementSibling;

                  // Rehacer los anidamientos para ubicar al <labelBoton> entre los 2 siguientes elementos
                  //    Luego de el ultimo input
                  //    Antes del boton del submit (ultimo elemento)

                  // Modifico el elemento siguiente del ultimo input
                  inputPasswordRepetida.insertAdjacentElement( 'afterend', labelBoton );
                  // Establezco el elemento siguiente del nuevo <labelBoton> creado
                  labelBoton.insertAdjacentElement( 'afterend', botonSubmit );
            }

            function renderizarMensajeRegistro (s, ok)
            {
                  descrSignUP.innerHTML = 
                        `<span class="${ (ok) ? "valido" : "error" }">
                              ${s}
                        </span>`;
            }

            /* -------------------------------------------------------------------------- */
            /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
            /* -------------------------------------------------------------------------- */
            function realizarRegister(settings) {

                  renderizarMensajeRegistro( "Procesando...", true );
                  // fetch ();
                  fetch( urlSignUp, settings )
                  .then(
                        respuesta =>
                        {
                              // Modo 2
                              if( !respuesta.ok ){
                                    return Promise.reject(respuesta);
                              }
                              return respuesta.json();
                        }
                  )
                  .then(
                        objetoRespuesta =>
                        {
                              setTimeout( () => {}, 2500 );
                              renderizarMensajeRegistro( "Se ha realizado el registro del usuario...", true );
                              setTimeout(
                                    () =>
                                    {
                                          localStorage.setItem( "jwt", objetoRespuesta.jwt );
                                          location.replace( "./mis-tareas.html" );
                                    },
                                    2000
                              )
                        }
                  )
                  .catch( 
                        err => {
                              switch( err.status ){
                                    case 400:
                                          renderizarMensajeRegistro( "Este usuario ya se encuentra registrado", false );
                                          break;
                                    case 500:
                                          renderizarMensajeRegistro( "Error en el servidor", false )
                                          break;
                              }
                        }
                  )

            };
      }
);
