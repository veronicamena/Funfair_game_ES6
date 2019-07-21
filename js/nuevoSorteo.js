/*
Funcionamiento:
- El módulo de sorteo muestra al usuario la opción de elegir un número, entre 1 y 5.
- Uno de los números premiará al usuario con 10.000$.
- Otro castigará al usuario con un terremoto, destruyendo dos edificaciones.


Restricciones:
- Sólo se puede acceder al sorteo con un mínimo de dos edificaciones.
- La consola debe mostrar, al ejecutar el módulo, cuál será el número que premie o castigue al usuario - previo a que lo seleccione (ejemplo: "El premio se encuentra tras la casilla 5, el terremoto tras la casilla 2).
- Los números premiados deben ser diferentes y elegidos al azar en cada sorteo.


Bola extra:
- Sólo se puede realizar un sorteo por hora (0,5 puntos adicionales)
-----------------------------------------------------------------------------------------------------------------



*/

if(!opener){
  alert("ERROR. Accede desde el menú principal para iniciar partida.");  //por si accede escribiendo arriba la url, haciendo trampa.
  location.assign('../index.html');
}


// Sacar números sorteo:
  let premio = Math.floor(Math.random() * 5) + 1;
  let terremoto = Math.floor(Math.random() * 5) + 1;

  if (premio === terremoto) {

      let premio = Math.floor(Math.random() * 5) + 1;
      let terremoto = Math.floor(Math.random() * 5) + 1;

  }else{

      console.warn("El numero premiado es: " + premio);
      console.error("Peligro! el terremoto está en: " + terremoto);
  }



//Dinero o terremoto:
const boton = document.getElementsByTagName('button');

for (let element of boton) {

  element.onclick = function(){

    if(Number(this.dataset.numero) === premio){      //PREMIO

      opener.objPartida.saldo += 10000;
      opener.msg("success", "¡ ENHORABUENA! Has ganado 10.000 $ !");
      window.close();

    }else if (Number(this.dataset.numero) === terremoto) {        //TERREMOTO

      parque = opener.objPartida.parque;  //sacamos el numero de las celdas que tienen algo.
      for(let elem of parque) {
      console.log("Las celdas con edificios son: " + elem._celda);
    }

// Hasta aquí bien, ahora pruebas:

const celdas = opener.document.getElementsByClassName('celda');    // Esto se carga TODAS las celdas y las deja vacias.
for (let elem of celdas) {
        elem.dataset.edificio = "vacia";
      }
    }



      opener.msg("error", "OH NO!... Un terremoto ha destrozado tu parque :(");
    window.close();

    }else{

      opener.msg('success', 'No has tenido suerte, ni buena ni mala, vuelve a intentarlo en 1 hora');
      window.close();

    }
  }
}
