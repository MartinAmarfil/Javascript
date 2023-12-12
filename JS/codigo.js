


const MenuPrincipal=()=>{
let opcion = ""
do{
    opcion = prompt("Menu principal:\n \n 1) Opcion 1 \n 2) Opcion 2 \n 3) Opcion 3 \n 0) Salir del menú")
    switch (opcion){
        case "0":
            break;
        case "1":
            
            break;
        case "2":
            break;
        case "3":
            break;
        default:
            alert ("Opción no existente")
    }
    }while (opcion!="0")
return opcion
}

let intentos = 1

do{
contrasenia = prompt("Introduzca la contraseña para ingresar o Cancele para salir")
if (contrasenia === "123"){
    MenuPrincipal()
    } else{
    intentos++
    }
}while (contrasenia != null )