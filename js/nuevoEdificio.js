if(!opener){
  alert("ERROR. Accede desde el menú principal para iniciar partida.");  //por si accede escribiendo arriba la url, haciendo trampa.
  location.assign('../index.html');
}


/* CLASES PARA LOS EDIFICIOS QUE TENEMOS */
class Edificio {   //tanto Atracción como Puesto tienen en común que son Edificios, y tienen estas propiedades en común.
  constructor(celda, nombre){
    this._celda = celda;
    this._nombre = nombre;
  }
  get tipo() {
    return this._tipo;
  }
  mostrar(){

         const celdas = opener.document.getElementsByClassName('celda');
         for (let elem of celdas) {
             if (elem.dataset.celda === this._celda) {
                 elem.dataset.edificio = this._nombre;
             }
         }
     }
 }


class Atraccion extends Edificio {
  constructor(celda, nombre, visitantes){
    super(celda, nombre);     //el metodo super se trae directamente lo que hereda del padre Edificio.
    this._visitantes = visitantes;  //además tiene esto que no es común.
    this._tipo = "atraccion";
  }
  get visitantes() {
    return Number(this._visitantes);
  }
}

class Puesto extends Edificio {
    constructor(celda, nombre, ingresos){
    super(celda, nombre);     //el metodo super se trae directamente lo que hereda del padre Edificio.
    this._ingresos = ingresos;      // además tiene esto que no es común.
    this._tipo = "puesto";
  }
  get ingresos() {
    return Number(this._ingresos);
  }
}



/* NOS DICE SI ES UNA ATRACCIÓN O PUESTO ETC */
const edificios = document.getElementsByClassName("edificio");

for (let elem of edificios) {

  elem.onclick = function(){

    if(opener.objPartida.saldo >= elem.dataset.coste){

        const tipo = elem.dataset.tipo;
        const nombre = elem.dataset.nombre;
        celda = opener.idCelda;          //opener: vas a tu padre y coges de ahí celda. y no está declarada porque en el general tiene declaración var, solo las var son interventanales.

        if (tipo === "atraccion") {
          const visitantes = elem.dataset.visitantes;
          const atraccion = new Atraccion(celda,nombre,visitantes);
          atraccion.mostrar();
          opener.objPartida.parque.push(atraccion);
        }

        if (tipo === "puesto") {
          const ingresos = elem.dataset.ingresos;
          const puesto = new Puesto(celda,nombre,ingresos);
          puesto.mostrar();
          opener.objPartida.parque.push(puesto);
        }

        opener.objPartida.saldo -= elem.dataset.coste;
        opener.msg("success", "Edificio creado");
        window.close();

    }else{

        msg("error", "Error, saldo insuficiente (" + opener.objPartida.saldo + "$ restantes)");
    }
  }
}
