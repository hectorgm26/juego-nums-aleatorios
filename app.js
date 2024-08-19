let numeroSecreto = 0;
let intentos = 0;
let intentosMaximos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (intentos >= intentosMaximos) {
        asignarTextoElemento('p', '¡Has superado el número máximo de intentos!');
        document.getElementById('reiniciar').removeAttribute('disabled');
        return;
    }

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `¡Acertaste el número en ${intentos + 1} ${(intentos + 1 === 1) ? 'intento' : 'intentos'}!`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es menor');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor');
        }
        intentos++;
        if (intentos >= intentosMaximos) {
            asignarTextoElemento('p', '¡Has superado el número máximo de intentos!');
            document.getElementById('reiniciar').removeAttribute('disabled');
        } else {
            actualizarContadorIntentos();
        }
        limpiarCaja();
    }
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
    } else {
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto!');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    asignarTextoElemento('#contadorIntentos', 'Esperando que ingreses el número de intentos...');

    setTimeout(() => {
        intentosMaximos = parseInt(prompt('¿Cuántos intentos deseas en total?'));
        if (isNaN(intentosMaximos) || intentosMaximos <= 0) {
            intentosMaximos = 10; // Valor predeterminado si la entrada no es válida
        }
        intentos = 0; // Inicializar intentos a 0
        actualizarContadorIntentos();
        numeroSecreto = generarNumeroSecreto();
    }, 100);
}

function actualizarContadorIntentos() {
    let intentosRestantes = intentosMaximos - intentos;
    if (intentosRestantes >= 0) {
        asignarTextoElemento('#contadorIntentos', `Intentos restantes: ${intentosRestantes}`);
    }
}

function reiniciarJuego() {
    limpiarCaja();
    condicionesIniciales();
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

window.onload = condicionesIniciales;
