/* ---------------------------------- texto --------------------------------- */
function validarTexto(texto) 
{
      // Variables para validar <NOMBRES y APELLIDOS>
      const regExp = /[0-9]/;    
      const longMin = 3;

      return (
            texto.length >= longMin &&
            !( texto.match( regExp ) )
      ) 
            ? true
            : false;
}

function normalizarTexto(texto) 
{
    
}

/* ---------------------------------- email --------------------------------- */
function validarEmail(email) 
{
      const regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;     // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions

      console.log( email.match( regExp ) );

      return ( email.match( regExp ) ) ? true : false;
}

function normalizarEmail(email)
{
    
}

/* -------------------------------- password -------------------------------- */
function validarContrasenia(contrasenia)
{
      // GRACIAS JONNY SOS UN CRACK
      const longMin = 8;
      const mayusCheck = /[A-Z]/.test( contrasenia );
      const minusCheck = /[a-z]/.test( contrasenia );
      const numCheck = /[0-9]/.test( contrasenia );
      const specialCheck = /[!@#$%^&*()_+={}\[\],.;:<>?~-]/.test( contrasenia );
      return (
            contrasenia.length >= longMin &&
            mayusCheck &&
            minusCheck &&
            numCheck &&
            specialCheck
      );
}

function compararContrasenias(contrasenia_1, contrasenia_2)
{
      return ( contrasenia_1 === contrasenia_2 ) ? true : false;
}

