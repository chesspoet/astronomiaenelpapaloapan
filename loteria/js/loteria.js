/*Autor Universidad del Papaloapan*/

var cartas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var cartasPasadas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var carton1 = [20, 24, 28, 32, 19, 23, 27, 31, 18, 22, 26, 30, 17, 21, 25, 29];
var carton2 = [44, 33, 25, 40, 6, 35, 36, 14, 51, 11, 13, 38, 15, 10, 8, 17];
var carton3 = [21, 2, 33, 3, 45, 31, 43, 52, 17, 37, 50, 46, 6, 22, 32, 9];
var carton4 = [4, 8, 53, 5, 3, 7, 11, 15, 2, 6, 10, 14, 16, 1, 9, 13];
var carton5 = [36, 40, 44, 48, 35, 39, 43, 47, 34, 38, 42, 46, 33, 37, 41, 45];
var carton6 = [5, 16, 21, 12, 48, 45, 24, 9, 7, 39, 27, 26, 54, 42, 30, 18];
var carton7 = [12, 28, 49, 1, 18, 3, 35, 22, 46, 5, 27, 48, 20, 54, 4, 24];
var carton8 = [52, 34, 11, 41, 51, 28, 14, 38, 50, 54, 47, 20, 49, 37, 43, 23];
var carton9 = [2, 19, 26, 50, 36, 31, 34, 29, 52, 30, 23, 51, 32, 39, 53, 41];
var carton10 = [12, 28, 49, 1, 18, 3, 35, 22, 46, 5, 27, 48, 20, 54, 4, 24];
var cartones = new Array(10);
cartones[0] = carton1;
cartones[1] = carton2;
cartones[2] = carton3;
cartones[3] = carton4;
cartones[4] = carton5;
cartones[5] = carton6;
cartones[6] = carton7;
cartones[7] = carton8;
cartones[8] = carton9;
cartones[9] = carton10;

var cartaActual = 1;
var idAutomatico = 0;
var metodo = 1; //1 Manual 2 automatico
var aux = 0;
var seCantoLoteria = false;
var totalVecesMostrarMsgGanador = 10;
var totalVecesMostradosMsgGanador = 0;
var idIntervaloMsgGanador;
var dirAudio = "audio/audio1/";
var tiempoEntreCartas = 3000;
/*se utiliza para saber que tipo de juego elige 
 * (1 Filas, 2 LLenas, 3 Centro, 4 Esquinas)*/
var tipoJuego = 1;

//Indica si el juego esta
//0 detenido
//1 play
//2 pausa
//3 terminado
var estadoDelJuego = 0;


window.onload = function () {
    document.getElementById("imgSiguienteCarta").onclick = siguienteCarta;
    document.getElementById("imgApagarSonido").onclick = apagarSonido;
    document.getElementById("imgParar").onclick = reiniciar;
    document.getElementById("imgPausa").onclick = pausa;
    document.getElementById("imgIniciar").onclick = play;
    document.getElementById("carta").onclick = manejarClickSobreCartaCentral;

    document.getElementById("mnuManual").onclick = setTipoReproduccionManual;
    document.getElementById("mnuAutomatico").onclick = setTipoReproduccionAutomatica;

    document.getElementById("mnuFilas").onclick = setTipoFilas;
    document.getElementById("mnuLlena").onclick = setTipoLlena;
    document.getElementById("mnuCentro").onclick = setTipoCentro;
    document.getElementById("mnuEsquinas").onclick = setTipoEsquinas;

    cargarMenuCartones();
    reiniciar();
    document.addEventListener("click", closeAllSelect);
};

function revolverCartas() {
    for (var i = 1; i <= 54; i++) {
        do {
            var aleatorio = parseInt(Math.random() * 54);
            aleatorio = aleatorio + 1;
        } while (cartas[aleatorio] != 0);
        cartas[aleatorio] = i;
    }
}


function prepararNuevoJuego() {
    mostrarPlay(true);
    mostrarBotonDetener(false);
    mostrarBotonPausa(false);
    mostrarBotonSiguiente(false);
    mostrarBotonApagarSonido(false);
}
function reiniciar() {
    cartaActual = 1;
    clearInterval(idAutomatico);
    idAutomatico = 0;
    estadoDelJuego = 0;
    dirAudio = "audio/audio1/";
    tiempoEntreCartas = 3000;
    document.getElementById("carta").src = "img/cartas/0.png";

    document.getElementById("mnuAutomatico").className = "";
    document.getElementById("mnuManual").className = "";

    if (!localStorage.tipoReproduccion) {
        localStorage.tipoReproduccion = 2; //automatico        
    }
    if (localStorage.tipoReproduccion == 2) {
        document.getElementById("mnuAutomatico").className = "active";
        metodo = 2; //automatico 
    } else {
        document.getElementById("mnuManual").className = "active";
        metodo = 1; //manual 
    }


    document.getElementById("mnuFilas").className = "active";
    document.getElementById("mnuLlena").className = "";
    document.getElementById("mnuCentro").className = "";
    document.getElementById("mnuEsquinas").className = "";

    //llenar con ceros a los arreglos
    cartas = cartas.fill(0);
    cartasPasadas = cartasPasadas.fill(0);
    revolverCartas();
    eliminarMiniCartas();

    mostrarPlanilla(false);
    ocultarBtnsComprobar();
    seCantoLoteria = false;
    prepararNuevoJuego();
    habilitarBotones();
    clearInterval(idIntervaloMsgGanador);
    document.getElementById("audio").muted = false;
}

function siguienteCarta() {
    if (cartaActual != 55) {
        document.getElementById("carta").src = "img/cartas/" + cartas[cartaActual] + ".png";
        crearAgregarCarta(document.getElementById("carta").src);                
        if(document.getElementById("audio").canPlayType('audio/ogg')){            
            document.getElementById("audio").src=dirAudio + cartas[cartaActual] + ".ogg";
        }else{            
            document.getElementById("audio").src=dirAudio + cartas[cartaActual] + ".mp3";
        }
        document.getElementById("audio").load();
        document.getElementById("audio").play();
        
        cartasPasadas[cartas[cartaActual]] = 1;
        cartaActual++;
    } else {//juego terminado  
        eliminarMiniCartas();
        mostrarMensajeFinDeJUego();
        estadoDelJuego = 3;
        clearInterval(idAutomatico);
        mostrarPlay(false);
        mostrarBotonPausa(false);
        mostrarBotonSiguiente(false);
        mostrarBotonApagarSonido(false);
        mostrarBotonDetener(true);
    }
    //
    mostrarPlanilla(true);
    ocultarBtnsComprobar();
}
/* crea una carta para agregar al pie de página
 * de imagenes ya cantadas
 * @param {type} imagen la url de la imagen a agregar
 * @returns {undefined}
 * 
 */
function crearAgregarCarta(imagen) {
    var imgNueva = document.createElement("img");
    imgNueva.src = imagen;
    var contenedor = document.getElementById("contenedorPie");
    contenedor.appendChild(imgNueva);
}

/* eliminar todas las imagenes que aparecen en el pie de página
 * que representan a las cartas que ya fueron cantadas */
function eliminarMiniCartas() {
    var contenedor = document.getElementById("contenedorPie");
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
}


function pausa() {
    if (metodo == 2) {
        if (estadoDelJuego != 2) {
            clearInterval(idAutomatico);
            mostrarPlay(true);
            mostrarBotonPausa(false);
            estadoDelJuego = 2;
        }
    }
}

function manejarClickSobreCartaCentral() {
    if (estadoDelJuego != 3) {
        if (estadoDelJuego == 0) {//detenido
            play();
        } else if (estadoDelJuego == 1) {//play
            if (metodo == 2) {
                pausa();
            } else {
                siguienteCarta();
            }
        } else if (estadoDelJuego == 2) {//pausa
            if (metodo == 2) {
                play();
            } else {
                siguienteCarta();
            }

        }
    }
}
function play() {
    deshabilitarBotones();
    mostrarPlay(false);
    if (estadoDelJuego == 0) {//detenido       
        mostrarBotonDetener(true);
        if (metodo == 2) {
            mostrarBotonPausa(true);
            siguienteCarta();
            idAutomatico = setInterval("siguienteCarta();", tiempoEntreCartas);
        } else {
            mostrarBotonSiguiente(true);
            mostrarBotonApagarSonido(true);
            siguienteCarta();
        }
    } else if (estadoDelJuego == 2) {//pausa
        if (metodo == 2) {
            siguienteCarta();
            idAutomatico = setInterval("siguienteCarta();", tiempoEntreCartas);
            mostrarBotonPausa(true);
        }
    }
    estadoDelJuego = 1;
}

//muestra u oculta el boton de play
function mostrarPlay(estado) {
    mostrarComponente(document.getElementById("imgIniciar"), estado);
}

//muestra u oculta el boton de stop
function mostrarBotonDetener(estado) {
    mostrarComponente(document.getElementById("imgParar"), estado);
}
//muestra u oculta el boton de pausa
function mostrarBotonPausa(estado) {
    mostrarComponente(document.getElementById("imgPausa"), estado);
}
//muestra u oculta el boton de siguiente
function mostrarBotonSiguiente(estado) {
    mostrarComponente(document.getElementById("imgSiguienteCarta"), estado);
}
//muestra u oculta el boton de siguiente
function mostrarBotonApagarSonido(estado) {
    mostrarComponente(document.getElementById("imgApagarSonido"), estado);
}


function mostrarComponente(componente, valor) {
    if (valor == true) {
        componente.style.visibility = "visible";
    } else {
        componente.style.visibility = "hidden";
    }
}

//esta función apagará o encenderá el sonido
//si está apagado, lo encenderá
//si está encendido, lo apagará
function apagarSonido() {
    if (document.getElementById("audio").muted == true) {
        document.getElementById("audio").muted = false;
        document.getElementById("imgApagarSonido").src = "img/botones/AZULES/volumenoff.png";
    } else {
        document.getElementById("audio").muted = true;
        document.getElementById("imgApagarSonido").src = "img/botones/AZULES/volumeon.png";
    }
}


function manual() {
    metodo = 1;
    clearInterval(idAutomatico);
    localStorage.tipoReproduccion = 1;
}

function automatico() {
    metodo = 2;
    localStorage.tipoReproduccion = 2;
}

//Verifica si la planilla ha sido ganadora
function comprobarGanador(id) {
    if (id > 0) {
        var numeroCarton = parseInt(id);
        var carton;
        var gano = 1;
        carton = cartones[numeroCarton - 1];
        //mostramos en pantalla la planilla a revisar
        llenarPlanilla(carton);
        if (document.getElementById("mnuLlena").className == "active") {
            gano = hayGanadorPorPlanillaLlena(carton);
        } else if (document.getElementById("mnuFilas").className == "active") {
            gano = hayGanadorPorFila(carton);
        } else if (document.getElementById("mnuCentro").className == "active") {
            gano = hayGanadorPorCartasDelCentro(carton);
        } else if (document.getElementById("mnuEsquinas").className == "active") {
            gano = hayGanadorPorCartasDeLasEsquinas(carton);
        }
        //verificamos si hay ganador
        if (gano == 1) {
            clearInterval(idIntervaloMsgGanador);
            totalVecesMostradosMsgGanador = 0;
            idIntervaloMsgGanador = setInterval(mostrarMensajeDeGanadora, 100);
        }
    }
}

/**
 * Verifica si hay ganador de planilla llena
 * @returns {undefined}  Un valor distinto de cero si hay ganador,
 */
function hayGanadorPorPlanillaLlena(carton) {
    var i = 0, gano = 1;
    while (i < 16 && gano != 0) {
        //se verifica si la carta ya ha pasado, de lo contrario
        //regresara un cero, deteniendo la revision
        gano = cartasPasadas[carton[i]];
        i++;
    }
    return gano;
}


function hayGanadorPorFila(carton) {
    var gano = 0;
    //revisamos si hay ganador por filas horizontales
    for (var x = 0; x < 13 && gano == 0; x = x + 4) {
        gano = cartasPasadas[carton[x]] * cartasPasadas[carton[x + 1]] * cartasPasadas[carton[x + 2]] * cartasPasadas[carton[x + 3]];
    }
    //si no hay ganador en filas horizontales
    //revisamos si hay ganador por filas verticales
    if (gano == 0) {
        for (var j = 0; j < 4 && gano == 0; j++) {
            //multiplicamos cada carta en una fila, si una de ellas es cero, 
            //el resultado de gano sera cero
            //si todas las cartas ya pasaron, el resultado sera uno
            gano = cartasPasadas[carton[j]] * cartasPasadas[carton[j + 4]] * cartasPasadas[carton[j + 8]] * cartasPasadas[carton[j + 12]];
        }
    } else if (gano == 0) {
        //0 revisamos si hay ganador en la diagonal
        //  5 de la esquina superior izquierda, 
        //    10 a esquina inferior derecha
        //       15    
        gano = cartasPasadas[carton[0]] * cartasPasadas[carton[5]] * cartasPasadas[carton[10]] * cartasPasadas[carton[15]];
    } else if (gano == 0) {
        //      3 revisamos si hay ganador en la diagonal
        //     6 de la esquina superior derecha, 
        //    9 a esquina inferior izquierda
        //  12    
        gano = cartasPasadas[carton[3]] * cartasPasadas[carton[6]] * cartasPasadas[carton[9]] * cartasPasadas[carton[12]];
    }
    return gano;
}
/**
 * 
 * @param {type} carton numero de carton a revisar
 * @returns {Number} 0 si no han pasado las 4 cartas del centro, distinto de cero en otro caso
 */
function hayGanadorPorCartasDelCentro(carton) {
    //verificamos si las cartas del centro ya han pasado    
    return cartasPasadas[carton[5]] * cartasPasadas[carton[6]] * cartasPasadas[carton[9]] * cartasPasadas[carton[10]];
}

/**
 * 
 * @param {type} carton numero de carton a revisar
 * @returns {Number} 0 si no han pasado las 4 cartas del centro, distinto de cero en otro caso
 */
function hayGanadorPorCartasDeLasEsquinas(carton) {
    //verificamos si las cartas de las esquinas ya han pasado    
    return cartasPasadas[carton[0]] * cartasPasadas[carton[3]] * cartasPasadas[carton[12]] * cartasPasadas[carton[15]];
}

//Muestra un mensaje que la carta ha sido ganadora
function mostrarMensajeDeGanadora() {
    if (totalVecesMostradosMsgGanador < (totalVecesMostrarMsgGanador * 2)) {
        if (document.getElementById("tablaPlanilla").style.visibility == "hidden") {
            document.getElementById("tablaPlanilla").style.visibility = "visible";
        } else {
            document.getElementById("tablaPlanilla").style.visibility = "hidden";
        }
        totalVecesMostradosMsgGanador++;
    } else {
        clearInterval(idIntervaloMsgGanador);
    }
}

/* se llena la tabla con las imagenes que pertencen al cartón*/
function llenarPlanilla(carton) {
    for (var i = 0; i < 16; i++) {
        var carta = document.getElementById("imgCarta" + (i + 1));
        carta.src = "img/cartas/" + carton[i] + ".png";
        if (cartasPasadas[carton[i]] == 1) {
            carta.className = 'cartaMarcada';
        } else {
            carta.className += " cartaDesmarcada";
        }
    }
    //mostramos la planilla en pantalla
    mostrarPlanilla(true);
    document.getElementById("areaVerificacion").focus();
}

//esta funcion oculta el cartón donde se muestra
//el estado actual de una planilla
function mostrarPlanilla(estado) {
    var pPlanilla = document.getElementById("tablaPlanilla");
    if (estado == true) {
        pPlanilla.style.visibility = "visible";
    } else {
        pPlanilla.style.visibility = "hidden";
    }
}

//esta funcion oculta los botones que se utilizan
//para conocer el estado actual de una planilla
function ocultarBtnsComprobar() {
    var tablePlanilla = document.getElementById("tablaPlanilla");
    tablePlanilla.style.display = "none";
    var contenedorDerecho = document.getElementById("areaVerificacion");
    contenedorDerecho.style.cursor = "pointer";
    contenedorDerecho.onclick = mostrarPlanillaParaVerificarGanador;

}

//esto sucede cuando el usuario indica loteria
function mostrarPlanillaParaVerificarGanador() {
    if (cartaActual > 1 && cartaActual < 55) {
        var tablePlanilla = document.getElementById("tablaPlanilla");
        var contenedorDerecho = document.getElementById("areaVerificacion");
        //mostramos la tabla (el cartón)
        tablePlanilla.style.display = "inline";
        //cambiamos el cursor
        contenedorDerecho.style.cursor = "default";
        //no permitimos que pueda seguir haciendo click
        contenedorDerecho.onclick = "";
        seCantoLoteria = true;
        pausa();
        comprobarGanador();
    }
}


function cambiarAudio() {
    if (estadoDelJuego == 0) {//si el juego está detenido
        document.getElementById("audio1").className = "";
        document.getElementById("audio2").className = "";
        document.getElementById("audio3").className = "";
        if (this.id == "audio1") {
            document.getElementById("audio1").className = "active";
        } else if (this.id == "audio2") {
            document.getElementById("audio2").className = "active";
        } else {
            document.getElementById("audio3").className = "active";
        }
        tiempoEntreCartas = 3000;
        dirAudio = "audio/" + this.id + "/";
    }
}

function deshabilitarBotones() {
    setEstadoBotones(true);
}
function habilitarBotones() {
    setEstadoBotones(false);
}

function setEstadoBotones(estado) {
    document.getElementById("mnuLlena").disabled = estado;
    document.getElementById("mnuFilas").disabled = estado;
    document.getElementById("mnuCentro").disabled = estado;
    document.getElementById("mnuEsquinas").disabled = estado;
    document.getElementById("mnuManual").disabled = estado;
    document.getElementById("mnuAutomatico").disabled = estado;
}

function setTipoReproduccionManual() {
    if (estadoDelJuego == 0) {//si el juego está detenido
        document.getElementById("mnuAutomatico").className = "";
        document.getElementById("mnuManual").className = "active";
        manual();
    }
}

function setTipoReproduccionAutomatica() {
    if (estadoDelJuego == 0) {//si el juego está detenido
        document.getElementById("mnuAutomatico").className = "active";
        document.getElementById("mnuManual").className = "";
        automatico();
    }
}

function setTipoFilas() {
    if (estadoDelJuego == 0) {//si el juego está detenido
        document.getElementById("mnuFilas").className = "active";
        document.getElementById("mnuLlena").className = "";
        document.getElementById("mnuCentro").className = "";
        document.getElementById("mnuEsquinas").className = "";
        tipoJuego = 1;
    }
}
function setTipoLlena() {
    if (estadoDelJuego == 0) {//si el juego está detenido
        document.getElementById("mnuFilas").className = "";
        document.getElementById("mnuLlena").className = "active";
        document.getElementById("mnuCentro").className = "";
        document.getElementById("mnuEsquinas").className = "";
        tipoJuego = 2;
    }
}
function setTipoCentro() {
    if (estadoDelJuego == 0) {//si el juego está detenido
        document.getElementById("mnuFilas").className = "";
        document.getElementById("mnuLlena").className = "";
        document.getElementById("mnuCentro").className = "active";
        document.getElementById("mnuEsquinas").className = "";
        tipoJuego = 3;
    }
}
function setTipoEsquinas() {
    if (estadoDelJuego == 0) {//si el juego está detenido
        document.getElementById("mnuFilas").className = "";
        document.getElementById("mnuLlena").className = "";
        document.getElementById("mnuCentro").className = "";
        document.getElementById("mnuEsquinas").className = "active";
        tipoJuego = 4;
    }
}

/* El código de esta función
 * fue tomado de 
 * https://www.w3schools.com/howto/howto_custom_select.asp*/
function cargarMenuCartones() {
    var x, i, j, l, ll, selElmnt, a, b, c;
    x = document.getElementsByClassName("custom-select");
    l = x.length;
    for (i = 0; i < l; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        ll = selElmnt.length;
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < ll; j++) {
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function (e) {
                var y, i, k, s, h, sl, yl;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                sl = s.length;
                h = this.parentNode.previousSibling;
                for (i = 0; i < sl; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        yl = y.length;
                        for (k = 0; k < yl; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function (e) {

            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }
}

/* El código de esta función
 * fue tomado de 
 * https://www.w3schools.com/howto/howto_custom_select.asp*/
function closeAllSelect(elmnt) {

    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}


/* Nos permite mostrar en la sección del pie
 * el mensaje de juego terminado, cuando todas
 * las cartas ya han pasado */
function mostrarMensajeFinDeJUego() {
    var contenedor = document.getElementById("contenedorPie");
    var h1 = document.createElement("h1");
    h1.innerHTML = "Juego Terminado";
    contenedor.appendChild(h1);
}

function cambiarFondo() {
    if (document.body.style.backgroundImage.length == 0) {
        document.body.style.backgroundImage = "url('img/fondoEspacio.jpg')";
    } else {
        document.body.style.backgroundImage = "";
    }

}