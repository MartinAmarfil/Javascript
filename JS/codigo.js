let Stock_Productos = [];
const tabla_HTML=document.getElementById("Listado_Productos");

const Guardar_Stock_Local=()=>{
    localStorage.setItem("Productos_Guardados",JSON.stringify(Stock_Productos));
}

const Actualizar_Stock_Insumo=(fila, valor)=>{
    if((valor<0) || (typeof(valor)!=="number"))
        {valor=0;
        }
    Stock_Productos[fila][1]=valor;
    const lista = tabla_HTML.getElementsByClassName("cantidad");
    lista[fila].innerHTML=valor;
    Guardar_Stock_Local();
}

const Eliminar_Insumo=(fila)=>{
    Stock_Productos.splice(fila,1);
    Guardar_Stock_Local();
    Encabezado_Tabla();
    MostrarProductos();
}

const InicializarProductos=()=>{
let auxiliar =localStorage.getItem("Productos_Guardados");
if(auxiliar===null){
    Stock_Productos=[["Computadoras",0],["Mouse",0],["Teclados",0],["Monitores",0]];
    Guardar_Stock_Local();
    } else{
    Stock_Productos=JSON.parse(auxiliar);
    }
}

const MostrarProductos=()=>{
    Stock_Productos.forEach((elemento,filaNum) => {
        const fila =document.createElement("tr");
        fila.innerHTML= `
            <td><strong>${elemento[0]}</strong></td>
            <td class="cantidad">${elemento[1]}</td>
            <td><input type="button" value="Vaciar"></td>
            <td><input type="button" value="Sumar">
                <input type="text" size="4"></td>
            <td><input type="button" value="Eliminar"></td>
            `;
        tabla_HTML.appendChild(fila);
        const etiqueta=fila.getElementsByTagName("input");
        //Vaciar
        etiqueta[0].addEventListener("click",()=>{
            Actualizar_Stock_Insumo(filaNum,0)
            });
        //Agregar
        etiqueta[1].addEventListener("click",()=>{
            const cantidad= parseInt(etiqueta[2].value);
            if (!(isNaN(cantidad))){
                Actualizar_Stock_Insumo(filaNum,Stock_Productos[filaNum][1] + parseInt(cantidad))
              } else {
                alert("Ingrese un valor numerico");
              }
            });
        //eliminar
        etiqueta[3].addEventListener("click",()=>{
            Eliminar_Insumo(filaNum);
            });
        }
    );
}

const Encabezado_Tabla=()=>{
    tabla_HTML.innerHTML=`
    <tr style="background-color: rgb(207, 212, 209);">
    <td><strong>Insumo</strong></td>
    <td><strong>Cant</strong></td>
    <td><strong>Vaciar</strong></td>
    <td><strong>Agregar/Quitar Stock</strong></td>
    <td><strong>Eliminar insumo</strong></td>
    </tr>
    `
}

const Existe_Insumo=(texto)=>{
    const texto1=String(texto).toLowerCase();
    let band =false;
    if (texto != ""){
        let x =0;
        const fin= Stock_Productos.length;
        while((! band) && (x < fin)){
            const texto2=String(Stock_Productos[x][0]).toLowerCase();
            if (texto1 === texto2){
                band=true;
                }
            x++;
        }
    }
    return band
}

InicializarProductos();
Encabezado_Tabla();
MostrarProductos();
document.getElementById("Boton_Agregar").addEventListener("click",()=>{
    const texto = document.getElementById("Texto_Insumo_Nuevo");
    if(texto.value==""){
        alert("Por favor ingrese el nombre del insumo");
    } else{
        if(Existe_Insumo(texto.value)){
            alert("Ya existe el producto");
        } else {
            Stock_Productos.push([texto.value,0]);
            Guardar_Stock_Local();
            Encabezado_Tabla();
            MostrarProductos();
            texto.value="";
            }
        }
    })


