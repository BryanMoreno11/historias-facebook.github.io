var usuarioActual = '';

function iniciarSesion() {
    var loginCorreo = document.getElementById('loginCorreo').value;
    var loginContrasena = document.getElementById('loginContrasena').value;

    var usuarioGuardado = localStorage.getItem(loginCorreo);

    if (usuarioGuardado) {
        var usuario = JSON.parse(usuarioGuardado);

        if (usuario.contrasena === loginContrasena) {
            alert('Inicio de sesión exitoso. ¡Bienvenido, ' + usuario.nombre + '!');
            localStorage.setItem('usuarioActual', loginCorreo);
            window.location.href = 'historias.html';
        } else {
            alert('Contraseña incorrecta. Intenta de nuevo.');
        }
    } else {
        alert('El usuario no existe. Por favor, regístrate.');
    }
}

function registrarUsuario() {
    var nombre = document.getElementById('nombre').value;
    var correo = document.getElementById('correo').value;
    var contrasena = document.getElementById('contrasena').value;

    if (localStorage.getItem(correo)) {
        alert('El usuario ya existe. Por favor, elige otro correo electrónico.');
    } else {
        localStorage.setItem(correo, JSON.stringify({ nombre: nombre, contrasena: contrasena }));
        alert('Usuario registrado exitosamente. Serás redirigido al login.');

        setTimeout(function() {
            window.location.href = 'index.html';
        }, 2000);
    }
}