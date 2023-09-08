window.addEventListener("load", function () {
    /* ---------------------- Obtenemos variables globales ---------------------- */
    const form = document.forms[0];
    const email = document.querySelector("#inputEmail");
    const password = document.getElementById("inputPassword");
    const passwordConfirmation = document.getElementById("inputPasswordRepetida");
    const submitButton = form.querySelector('button[type="submit"]');
    const url = "https://todo-api.ctd.academy/v1";
 
    /* -------------------------------------------------------------------------- */
    /*         FUNCIÓN 1: Escuchamos el submit y preparamos el envío al signup    */
    /* -------------------------------------------------------------------------- */
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!email.value || !password.value || !passwordConfirmation.value) {
        alert("Se deben llenar todos los campos");
        return;
      }
      if (!isValidEmail(email.value)) {
        alert("Por favor usa un email valido");
        return;
      }
      if (password.value !== passwordConfirmation.value) {
        alert("Las contraseñas no coinciden");
        return;
      }
 
      // Creamos el cuerpo de la request (petición al servidor)
      const payload = {
        email: email.value,
        password: password.value,
      };
 
      // Configuramos la request del Fetch
      const settings = {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      };
      submitButton.disabled = true;
      // Lanzamos la consulta del registro a la API
      realizarRegister(settings).finally(() => {
        submitButton.disabled = false;
      });
 
      // Limpiamos el formulario
      form.reset();
    });
 
    /* -------------------------------------------------------------------------- */
    /*                   FUNCIÓN 2: Realizar el signup [POST]                      */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(settings) {
      fetch(`${url}/users`, settings)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return Promise.reject(response);
          }
        })
        .then((data) => {
          alert("Registro exitoso!");
        })
        .catch((err) => {
          console.warn("Error durante el registro");
          if (err.status === 400) {
            alert("Solicitud incorrecta");
          } else if (err.status === 409) {
            alert("El email ya está registrado");
          } else {
            alert("Error en el servidor, por favor intente más tarde");
          }
        });
    }
  });
  function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  }



