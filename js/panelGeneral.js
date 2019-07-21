var objPartida = {    // AQUÍ PONEMOS VAR PORQUE ES INTERVENTANA
    iniciada: false,
    saldo: 3000,
    recaudacion: 0,
    visitantes: 0,
    parque: []
};

var idCelda   // lo uso en nuevoEdifcio, le pongo var porque ira otra ventana;

// Ejecución paneles
document.getElementById('nuevaPartida').onclick = function (){

    if (!objPartida.iniciada) {

        open("paneles/nuevapartida.html", 'Nueva partida', 'scrollbars=yes,width=700,height=1000,toolbar=yes');

    } else {

        msg('error', 'Ya has iniciado una partida previamente, no es posible crear una nueva partida');

    }
}


//Ejecución panel construccion:

const celdas = document.getElementsByClassName('celda');

for(let elem of celdas) {   //elem devuelve un string, por eso vamos a su propiedad onclick.

  elem.onclick = function() {

    if (objPartida.iniciada){

        if (elem.dataset.edificio === "vacia") {

          idCelda = elem.dataset.celda;
          open('paneles/nuevoEdificio.html', 'construir', 'width=700, height=900, scrollbars=yes, toolbar=no');


        }else{

          msg("error", "Imposible construir sobre una celda identificada");
        }
    //    alert(elem.dataset.edificio);   //la propiedad dataset controla sus atributos datas del html.

    }else{
      msg("error", "ERROR. Inicia partida para construir");
    }

  }
}

//RECAUDAR ENTRADAS:
// Comprobamos si la sesión está iniciada
document.getElementById('recaudarCaja').onclick = function (){

    if (objPartida.iniciada) {

        // Comprobamos que tenga más de 200$ que es el coste para poder recaudar
        if (objPartida.recaudacion > 200) {
          open('paneles/recaudarEntradas.html', 'recaudar', 'width=500, height=300, scrollbars=yes, toolbar=no')
        }else{
          alert("No puedes acceder, no tienes dinero.");
        }

    } else {

        msg('error', 'ERROR. Debes iniciar sesión para recaudar.');

    }
}



// SORTEO:
document.getElementById('nuevoSorteo').onclick = function (){

    if (objPartida.iniciada) {

          // Comprobamos que tenga dos edificios creados.
          if (objPartida.parque.length >= 2) {

            open('paneles/nuevoSorteo.html', 'elegirNumeros', 'width=500, height=600, scrollbars=yes, toolbar=no')

          }else{

            alert("No puedes acceder, debes tener 2 eficios creados.");

          }

    } else {

        msg('error', 'ERROR. Debes iniciar sesión para participar en el sorteo.');

    }
}



// intervalo de actualización
setInterval( function(){

    const parque = objPartida.parque;

    for (let elm of parque) {

        if (elm.tipo === "atraccion") {

            objPartida.visitantes += elm.visitantes;
            objPartida.recaudacion += elm.visitantes * 2;
        }

        if (elm.tipo === "puesto") {

            objPartida.saldo += elm.ingresos;
        }
    }



    // Actualización estadísticas panel
    document.getElementById('contadorEdificios').textContent = objPartida.parque.length + " edificios";

    document.getElementById('contadorVisitantes').textContent = objPartida.visitantes + " visitantes";

    document.getElementById('contadorRecaudacion').textContent = objPartida.recaudacion + " $ en caja";

    document.getElementById('contadorSaldoActual').textContent = objPartida.saldo + " $";

}, 100);
