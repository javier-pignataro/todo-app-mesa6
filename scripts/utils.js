/* ---------------------------------- texto --------------------------------- */
function validarTexto(texto) {
    let solosLetras = /^[A-Za-z]+$/;
    return texto.length >= 4 && solosLetras.test(solosLetras);
}

function normalizarTexto(texto) {
    let textoNormalizado = texto.trim().toLowerCase();
    return textoNormalizado;
}

/* ---------------------------------- email --------------------------------- */
function validarEmail(email) {
    let mailValidado = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return mailValidado.test(email);
}

function normalizarEmail(email) {
    let mailNormalizado = email.trim().toLowerCase();
    return mailNormalizado;
}

/* -------------------------------- password -------------------------------- */
function validarContrasenia(contrasenia) {
    let caracteresMinimos = 8;
    let mayuscula = /[A-Z]/.test(contrasenia);
    let minuscula = /[a-z]/.test(contrasenia);
    let numero = /[0-9]/.test(contrasenia);
    let caracterEspecial = /[@#$%^&+=!]/.test(contrasenia);

    return (contrasenia.length = caracteresMinimos && mayuscula && minuscula&& numero && caracterEspecial);

}

function compararContrasenias(contrasenia_1, contrasenia_2) {
    
}

