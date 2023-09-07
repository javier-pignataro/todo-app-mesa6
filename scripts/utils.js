/* ---------------------------------- texto --------------------------------- */
const validacionEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
const form = document.forms[0];
const firstName = document.querySelector("#inputNombre");
const lastName = document.querySelector("#inputApellido");
const email = document.querySelector("#inputEmail");
const password = document.querySelector("#inputPassword");
const PasswordReply = document.querySelector("#inputPasswordRepetida");

function validarTexto(texto) {
    if (texto.length >= 4 && texto.match(/[0-9]/) === null){
        return true
    }else {
        return alert('porfavor ingrese un nombre o un apellido valido')
    }
}

function normalizarTexto(texto) {
  return texto.trim().toLowerCase();
}

/* ---------------------------------- email --------------------------------- */
function validarEmail(email) {
  if (validacionEmail.test(email) && email !== "") {
    return true;
  } else {
    return alert("El email no es valido");
  }
}

function normalizarEmail(email) {
  return email.trim().toLowerCase();
}

/* -------------------------------- password -------------------------------- */
function validarContrasenia(contrasenia) {
let longitud = 6;
let contMayus = /[A-Z]/.test(contrasenia);
let contMinus = /[a-z]/.test(contrasenia);
let contNum = /[0-9]/.test(contrasenia);
let contEspec = /[!@#$%^&*()_+{}[\]:;<>,.?~=-]/.test(contrasenia);
  // Realizar la validación
  if (
    contrasenia.length >= longitud && contMayus && contMinus && contNum && contEspec 
  ) {
    return true;
  } else {
    return false
  }
}

function compararContrasenias(contrasenia_1, contrasenia_2) {
  if (contrasenia_1 === contrasenia_2) {
    return true;
  } else {
    return alert("las contraseñas no son iguales");
  }
}

console.log(validarTexto("1234"))

