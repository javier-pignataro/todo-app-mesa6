/* ---------------------------------------------- */
/* FUNCIÓN 1: Escuchamos el submit y preparamos el envío */
/* ---------------------------------------------- */
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const pass = password.value;
  const passRepetida = passwordReply.value;

  if (compararContrasenias(pass, passRepetida)) {
    payload = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: pass,
    };
    console.log(payload);
    realizarRegister(payload);
  } else {
    // Muestra un mensaje de error y limpia los campos de contraseña y contraseña repetida
    console.warn("Las contraseñas no son iguales.");
    alert("Las contraseñas no son iguales.");
    password.value = '';
    passwordReply.value = '';
  }
});

/* ---------------------------------------------- */
/* FUNCIÓN 2: Realizar el signup [POST] */
/* ---------------------------------------------- */
function realizarRegister(payload) {
  if (validarContrasenia(payload.password)) {
    const settings = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    console.log(settings);
    // Aquí para enviar los datos al servidor
  } else {
    // Muestra un mensaje de error si la contraseña no es segura
    console.warn("La contraseña no es segura.");
    alert("La contraseña no es segura.");
    password.value = '';
    passwordReply.value = '';
  }
}