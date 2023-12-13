
const InicializarStock=(Stock)=>{
let listadoOpciones = "Elija el producto al que quiere modificar el stock:\n\n"
for(let x in Stock) {
    listadoOpciones+= parseInt(x)+1 + ") " + Stock[x][0] + "\n"
    }
listadoOpciones+="0) Salir"
let salir=false
do{
    opcion = prompt(listadoOpciones)
    if (opcion!="0" && opcion!=null){
        let num=parseInt(opcion)
        if(num>0 && num<=Stock.length){
            let cantidad = parseInt(prompt("Ingrese la cantidad actual del producto " +Stock[num-1][0]))
            if(cantidad>=0){
                Stock[num-1][1]=cantidad
            }else{
                alert ("Ingresó un valor incorrecto")
            }
        }else {
            alert("la opcion no existe")
        }
    } else {
        salir=true
    }
}while (!salir)
}

const AgregarElemento=(Stock)=>{
    let listadoOpciones = "Elija el producto al que hay que agregar mas stock:\n\n"
    for(let x in Stock) {
        listadoOpciones+= parseInt(x)+1 + ") " + Stock[x][0] + "\n"
        }
    listadoOpciones+="0) Salir"
    let salir=false
    do{
        opcion = prompt(listadoOpciones)
        if (opcion!="0" && opcion!=null){
            let num=parseInt(opcion)
            if(num>0 && num<=Stock.length){
                let cantidad = parseInt(prompt("Ingrese la cantidad a agregar al producto " +Stock[num-1][0]))
                if(cantidad>=0){
                    Stock[num-1][1]+=cantidad
                }else{
                    alert ("Ingresó un valor incorrecto")
                }
            }else {
                alert("la opcion no existe")
            }
        } else {
            salir=true
        }
    }while (!salir)
}

const QuitarElemento=(Stock)=>{
    let listadoOpciones = "Elija el producto al que hay que descontar stock:\n\n"
    for(let x in Stock) {
        listadoOpciones+= parseInt(x)+1 + ") " + Stock[x][0] + "\n"
        }
    listadoOpciones+="0) Salir"
    let salir=false
    do{
        opcion = prompt(listadoOpciones)
        if (opcion!="0" && opcion!=null){
            let num=parseInt(opcion)
            if(num>0 && num<=Stock.length){
                let cantidad = parseInt(prompt("Ingrese la cantidad a quitar al producto " +Stock[num-1][0]))
                if(cantidad>=0){
                    Stock[num-1][1]-=cantidad
                    if (Stock[num-1][1]<0){
                        alert(Stock[num-1][1] + " elementos se intentaron quitar del stock, pero no existian. El stock queda en cero.")
                        Stock[num-1][1]=0
                    }
                }else{
                    alert ("Ingresó un valor incorrecto")
                }
            }else {
                alert("la opcion no existe")
            }
        } else {
            salir=true
        }
    }while (!salir)

}

const VerStock=(Stock)=>{
let listadoStock="El stock actual es el siguiente: \n \n"
for(let x in Stock) {
    listadoStock+= "- " + Stock[x][0] + " hay " + Stock[x][1] + "\n"
    }
alert (listadoStock)
}


const MenuPrincipal=()=>{
let opcion = ""
let salir=false
const Stock=[["Computadoras",0],["Mouse",0],["Teclados",0],["Monitores",0]]
do{
    opcion = prompt("Control de stock, seleccione una opcion:\n \n 1) Inicializar Stock \n 2) Agregar elementos stock \n 3) Quitar elemento del stock \n 4) Ver stock \n 0) Salir de la aplicacion")
    if (opcion!="0" && opcion!=null){
        switch (opcion){
        case "0":
            break;
        case "1":
            InicializarStock(Stock);
            break;
        case "2":
            AgregarElemento(Stock);
            break;
        case "3":
            QuitarElemento(Stock);
            break;
        case "4":
            VerStock(Stock);
            break;
        default:
            alert ("Opción no existente");
        }
    } else {
        salir=true
    }
}while (!salir)
}

let intentos = 1
let contrasenia = ""
do{
contrasenia = prompt("Introduzca la contraseña para ingresar o Cancele para salir (Intento " + intentos + ")")
if (contrasenia === "123"){
    alert("¡¡¡Bienvenido a la aplicación para control de stock!!!!")
    MenuPrincipal()
    contrasenia=null
    } else{
    intentos++
    }
}while (contrasenia != null )
