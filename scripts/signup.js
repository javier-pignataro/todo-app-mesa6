window.addEventListener("load", function () {
  /* ---------------------- obtenemos variables globales ---------------------- */
  const form = document.forms[0];
  const nombre = document.querySelector("#inputNombre");
  const apellido = document.querySelector("#inputApellido");
  const email = document.querySelector("#inputEmail");
  const password = document.querySelector("#inputPassword");
  const repetirPassword = document.querySelector("#inputPasswordRepetida");
  const url = "https://todo-api.ctd.academy/v1/users";

  /* -------------------------------------------------------------------------- */
  /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
  /* -------------------------------------------------------------------------- */
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (compararContrasenias(password.value, repetirPassword.value)) {
      const payload = {
        firstName: nombre.value,
        lastName: apellido.value,
        email: email.value,
        password: password.value,
      };
      const settings = {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        }
      }
      realizarRegister(settings);
      form.reset();
      console.log(settings);
    } else {
      alert("Las contraseñas no son iguales");
    }
  });

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
  /* -------------------------------------------------------------------------- */
  function realizarRegister(settings) {
    fetch(`${url}`, settings)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.jwt) localStorage.setItem("jwt", JSON.stringify(data.jwt));
      })

      .catch((err) => {
        console.warn("Promesa rechazada ");
        console.log(err);
        if (err.status == 400) {
          console.warn(
            "El usuario ya se encuentra registrado / Alguno de los datos requeridos está incompleto"
          );
          alert(
            "El usuario ya se encuentra registrado / Alguno de los datos requeridos está incompleto"
          );
        } else {
          console.error("Error del servidor");
          alert("Error del servidor");
        }
      });
  }
});
