if(!opener){
  alert("ERROR. Accede desde el menú principal para iniciar partida.");  //por si accede escribiendo arriba la url, haciendo trampa.
  location.assign('../index.html');
}


//Toda la recaudacion se convierte en beneficio menos 200, y se acumula al saldo:


recaudar.onclick = function(){

    const beneficio = opener.objPartida.recaudacion - 200;

    opener.objPartida.saldo += beneficio;

    opener.objPartida.recaudacion = 0;

    opener.msg('success', 'Se han transferido ' + beneficio + '$ al saldo');

    close();
}
