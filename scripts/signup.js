/* ---------------------------------------------- */
/* FUNCIÓN 1: Escuchamos el submit y preparamos el envío */
/* ---------------------------------------------- */
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const pass = password.value;
  const passRepetida = passwordReply.value;

  let errores = [];

  switch (true) {
    case !compararContrasenias(pass, passRepetida):
      agregarError("password", "Las contraseñas no coinciden.");
      agregarError("passwordReply", "Las contraseñas no coinciden.");
      password.value = '';
      passwordReply.value = '';
    case !validarTexto(firstName.value):
      agregarError("firstName", "El nombre no es válido.");
      firstName.value = '';
    case !validarTexto(lastName.value):
      agregarError("lastName", "El apellido no es válido.");
      lastName.value = '';
    case !validarEmail(email.value):
      agregarError("email", "El correo electrónico no es válido.");
      email.value = '';
    case compararContrasenias(pass, passRepetida):
      validarContrasenia(pass);
    case !validarContrasenia(pass):
      agregarError("password", "La contraseña no es segura.");
      password.value = '';
      passwordReply.value = ''; 
  }
  console.log(errores);

  function agregarError(campo, mensaje) {
    errores.push({ campo, mensaje });
  }

  if (errores.length === 0) {
    payload = {
      firstName: normalizarTexto(firstName.value),
      lastName: normalizarTexto(lastName.value),
      email: normalizarEmail(email.value),
      password: pass,
    };
    console.log(payload);
    realizarRegister(payload);
  } else {
    errores.forEach((error) => {
      console.warn(`${error.mensaje}`);
    });
  }
});

/* ---------------------------------------------- */
/* FUNCIÓN 2: Realizar el signup [POST] */
/* ---------------------------------------------- */
function realizarRegister(payload) {
  const settings = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  console.log(settings);
}