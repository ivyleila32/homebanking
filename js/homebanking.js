//Declaración de variables
var storage = window.localStorage;
var saldoCuenta = 5000;
var nombreUsuario = "Ivana";
var codigo = 1234;
var limiteExtraccion = 1000;
var cuentasAmigas = [{ numero: 1234567, nombre: "Cuenta amiga 1" },{numero:7654321,nombre:"cuenta amiga 2"}];
var movimientos = [];

//Ejecución de las funciones que actualizan los valores de las variables en el HTML
document.onreadystatechange  = function() {
    if (document.readyState == "interactive") {
        // Initialize your application or run some code.
        iniciarSesion();
        aplicarTema();
    }   
}

//Funciones que tenes que completar


function cambiarLimiteDeExtraccion() {
    var monto = prompt("ingrese nuevo limite de extraccion")
    if(monto === null) {
        return;
    }
    monto = parseInt(monto);
    if (monto > saldoCuenta || monto <= 0) {
    alert("no se puede realizar la operacion");
        return;
    }
    else{
        limiteExtraccion = monto;
    }
    actualizarLimiteEnPantalla();
    alert("el nuevo limite es: " + monto);
}

function extraerDinero() {
    var monto = prompt("ingrese el monto a extraer");
    if(monto === null) {
        return;
    }
    monto = parseInt(monto);
    var saldoAnterior = saldoCuenta;
     if (monto > saldoCuenta) { 
        alert("ALERTA - Saldo Insuficiente."); 
    } 
    else if ( monto > limiteExtraccion){
        alert("ALERTA - Supera el limite de extraccion");
    }
    else if(monto % 100 !== 0 || monto <100) {
        alert("ALERTA - Solo se pueden extraer montos multiplos de 100");    
    } 
    else {
        restarSaldo(monto);
        actualizarSaldoEnPantalla();
        alert(  "Monto extraido:        " + monto + " \n" + 
                "Saldo anterior:        " + saldoAnterior + " \n" +     
                "Saldo actual:        " + saldoCuenta + "\n" );
        guardarMovimiento("extraccion", monto, saldoCuenta);
    }
   
}

function depositarDinero() {
    var monto = prompt("Ingrese el monto a depositar");
    if(monto === null) {
        return;
     if(isNaN(monto)) {
        alert("ALERTA - Ingrese Valores Numericos.");
    } }
    monto = parseInt(monto);  
    var saldoAnterior = saldoCuenta;
    if(isNaN(monto)) {
        alert("ALERTA - Ingrese Valores Numericos.");
    }  
    sumarSaldo(monto);

    alert(  "Monto depositado:        " + monto + " \n" + 
            "Saldo anterior:        " + saldoAnterior + " \n" +
            "Saldo actual:        " + saldoCuenta + "\n" );
    actualizarSaldoEnPantalla();
    guardarMovimiento("deposito", monto, saldoCuenta);
}

function pagarServicio() {
    
    const   serviAgua = 350,
            serviTelefono = 425,
            serviLuz = 210,
            serviInternet = 570;
    var ejOpcion = function(monto, menu) {
        var saldoAnterior =  saldoCuenta;
         if(saldoCuenta < monto) {
            alert( "saldo insuficiente");  
        }
        else {
            restarSaldo(monto);
            alert( "se ha pagado el servicio :" + menu + " \n" +   
                    "saldo anterior :       " + saldoAnterior + " \n" + 
                    "valor del servicio pagado:        " + monto + " \n" +
                    "Saldo actual:          " + saldoCuenta + "\n" );
            actualizarSaldoEnPantalla();
            guardarMovimiento("pago de servicio", monto, saldoCuenta);
            
        }
    };        
    var menu = "Ingrese el numero que corresponda con el servicio que quieres pagar: \n";
        menu += "1: AGUA \n";
        menu += "2: TELEFONO \n";
        menu += "3: lUZ \n";
        menu += "4: INTERNET \n";
    var opcion = prompt(menu);
    if(monto === null) {
        return;
    }
    switch (opcion) {
        case "1":
            ejOpcion(serviAgua, "AGUA");
            break;
        case "2":
            ejOpcion(serviTelefono, "TELEFONO");       
            break;
        case "3":
           ejOpcion(serviLuz, "LUZ");
            break;
        case "4":
           ejOpcion(serviInternet, "INTERNET");
            break;  
        default:
            alert("ERROR - Opcion invalida.");
            break;
    }
}

function transferirDinero() {
    var nroCuenta = prompt("ingrese el nro de cuenta a la cual quiere transferir");
    if(monto === null) {
        return;
    }
    nroCuenta = parseInt(nroCuenta);
    var saldoAnterior = saldoCuenta;
    var cuentaExiste = false;
    
    // Busco si existe la cuenta
    for (i=0; i<cuentasAmigas.length;i++) {
        var obj = cuentasAmigas[i];
        if(obj.numero === nroCuenta) {
            cuentaExiste = obj;
        }
    }
    if(cuentaExiste) { // SI existe la cuenta amiga
        // Transfiero los fondos
        var  transferir = prompt("ingrese el monto a tranferir");
        transferir = parseInt(transferir);
        if(transferir > saldoCuenta) {
            alert("saldo de cuenta insuficiente");
        }
        else {
            restarSaldo(transferir);
            alert( "el monto transferido es de :" + transferir + " \n" +   
                    "saldo anterior :       " + saldoAnterior + " \n" +
                    "Saldo actual:          " + saldoCuenta + "\n" +
                    "cuenta destino:          " + cuentaExiste.numero + " - " + cuentaExiste.nombre + "\n" );
            guardarMovimiento("transferencia", transferir, saldoCuenta);
            actualizarSaldoEnPantalla();
                            
        }
    } 
    else {
        alert("cuenta amiga no encontrada");
    }
    
}
    
function iniciarSesion(saldoRetenido = false) {
    var ingreso = prompt("ingrese su contraseña");
    ingreso = parseInt(ingreso);

    if  (codigo == ingreso) {
        if (saldoRetenido !== false) {
            saldoCuenta = saldoRetenido;
        }
        alert("Bienvenido/a " + nombreUsuario + " ya puedes comenzar a utilizar tus operaciones");
        cargarNombreEnPantalla();
        actualizarSaldoEnPantalla();
        actualizarLimiteEnPantalla();
    }    
    else {
        var error = alert("la contraseña es incorrecta");    
        var retenido;
        if (saldoRetenido === false) {
            retenido = saldoCuenta;
        }
        else {
            retenido = saldoRetenido;
        }
        
        saldoCuenta = 0;
        actualizarSaldoEnPantalla();
        var msg = alert("el saldo de su cuenta ha sido retenido por seguridad");
        iniciarSesion(retenido);
    }
    
}    

//suma plata
function sumarSaldo(monto) {
    saldoCuenta += monto;

}
//resta plata 
function restarSaldo(monto) {
    saldoCuenta -= monto;
}
//muestras los movimientos realizados a lo largo de la sesion
function verMovimientos() {
     var msg = "Movimientos realizados \n";
    msg += "Nro | Movimiento | Monto | SaldoCuenta\n";            
    for (i=0; i <movimientos.length;i++) {
      msg += i +" | "+ movimientos[i].movimiento +" | "+ movimientos[i].monto +" | "+ movimientos[i].saldo + "\n";
        
    }
    alert(msg); 
}
//guarda los movimientos para luego mostrarlos 
function guardarMovimiento(movimiento, monto, saldo){
    var obj = {
        movimiento: movimiento, 
        monto: monto, 
        saldo: saldo
    };
    movimientos.push(obj);
}

//cambia los colores 
function cambiarTema() {
   document.getElementById("cuentaInfo").classList.toggle("ocultar");
   document.getElementById("selectorDeTema").classList.toggle("ocultar");
}
// setea el tema
function asignarTema(tema) {
    storage.setItem('theme', tema);
    aplicarTema();
}
function aplicarTema() {
    if(!storage.getItem('theme')){
        storage.setItem('theme','verde');
    }
    const tema = storage.getItem('theme');
    switch (tema) {
        case "verde":
            document.body.classList.remove('theme-azul','theme-rosa');
            document.body.classList.add('theme-verde');
            break;
        case "rosa":
            document.body.classList.remove('theme-azul','theme-verde');
            document.body.classList.add('theme-rosa');
            break;
        case "azul":
            document.body.classList.remove('theme-verde','theme-rosa');
            document.body.classList.add('theme-azul');
            break;
        default:
            break;
    }
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}

