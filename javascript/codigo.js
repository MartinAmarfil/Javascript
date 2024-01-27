const tablaHTML=document.getElementById("tablaProductos");

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

/*   Toast.fire({
    icon: "success", //warning, error, success, info, question.
    title: "Signed in successfully"
  }); */

class ClaseStock{
    constructor(){
        let auxiliar =localStorage.getItem("productosGuardados");
        this.stockProductos = [];
        if(auxiliar===null){
            this.stockProductos=[["Computadoras",0,0],["Monitores",0,0],["Mouse",0,0],["Teclados",0,0]];
            this.cantInsumos =4;
            this.guardarStock();
        } else {
            this.stockProductos=JSON.parse(auxiliar);
            this.cantInsumos = this.stockProductos.length;
        }
        this.mostrarProductos();
    }

guardarStock(){
    this.ordenarInsumos();
    localStorage.setItem("productosGuardados",JSON.stringify(this.stockProductos));
}

ordenarInsumos(){
    this.stockProductos.sort(function([insumoA],[insumoB]){
        if(String(insumoA).toLowerCase() < String(insumoB).toLowerCase()){return -1;} 
        if(String(insumoA).toLowerCase() > String(insumoB).toLowerCase()){return 1;} 
        return 0;
    })
}

actualizarStock=(fila, valor)=>{
    if((valor<0) || (typeof(valor)!=="number"))
        {valor=0;
        }
    this.stockProductos[fila][1]=valor;
    const lista = tablaHTML.getElementsByClassName("cantidad");
    lista[fila].innerHTML=valor;
    this.guardarStock();
    this.mostrarInformacionInsumos();
}

encabezadoTabla(){
    tablaHTML.innerHTML=`
    <tr style="background-color: rgb(207, 212, 209);">
    <td><strong>Insumo</strong></td>
    <td><strong>Cant</strong></td>
    <td><strong>Vaciar</strong></td>
    <td><strong>Agregar/Quitar Stock</strong></td>
    <td><strong>Eliminar insumo</strong></td>
    </tr>
    `
}

eliminarInsumo(fila){
    this.stockProductos.splice(fila,1);
    this.cantInsumos--;
    this.guardarStock();
    this.encabezadoTabla();
    this.mostrarProductos();
}

existeInsumo(texto){
    let band =false;
    this.stockProductos.forEach(([insumo]) => {
        if (texto.toLowerCase() === String(insumo.toLowerCase())){
            band=true;
        }
    });
    return band;
}

agregarInsumo(insumo){
    this.stockProductos.push([insumo,0]);
    this.cantInsumos++;
    this.guardarStock();
    this.encabezadoTabla();
    this.mostrarProductos();
}

totalStock(){
    let total=0;
    this.stockProductos.forEach((elemento)=>{total+=elemento[1]});
    return total;
}

mostrarInformacionInsumos(){
    const informacionInsumos=document.getElementById("informacionInsumos");
    informacionInsumos.innerHTML=`
    <strong>Cantidad de Insumos: </strong>${this.cantInsumos}<br> 
    <strong>Total de stock: </strong>${this.totalStock()}<br> 
    <br>
    `;
}

mostrarProductos(){
    this.mostrarInformacionInsumos();
    this.encabezadoTabla();
    this.stockProductos.forEach(([insumo,stock],filaNum) => {
        const fila =document.createElement("tr");
        fila.innerHTML= `
            <td><strong>${insumo}</strong></td>
            <td class="cantidad">${stock}</td>
            <td><input id="botonVaciar${filaNum}" type="button" value="Vaciar"></td>
            <td><input id="botonSumar${filaNum}" type="button" value="Sumar">
                <input id="cantidadSumar${filaNum}" type="text" size="4"></td>
            <td><input id="botonEliminar${filaNum}" type="button" value="Eliminar"></td>
            `;
        tablaHTML.appendChild(fila);
        
        //Vaciar
        const botonVaciar=document.getElementById(`botonVaciar${filaNum}`);
        botonVaciar.addEventListener("click",()=>{
            this.actualizarStock(filaNum,0)
        });
        
        //Sumar
        const botonSumar=document.getElementById(`botonSumar${filaNum}`);
        botonSumar.addEventListener("click",()=>{
            const cantidadSumar=document.getElementById(`cantidadSumar${filaNum}`);
            const cantidad= parseInt(cantidadSumar.value);
            if (!(isNaN(cantidad))){
                this.actualizarStock(filaNum,this.stockProductos[filaNum][1] + cantidad);
            } else {
                Toast.fire({icon: "warning", title: "Ingrese un valor numerico"});
            }
        });
        
        //eliminar
        const botonEliminar=document.getElementById(`botonEliminar${filaNum}`);
        botonEliminar.addEventListener("click",()=>{
            this.eliminarInsumo(filaNum);
        });

        }
    );
}

}

const stock = new ClaseStock();

document.getElementById("botonAgregar").addEventListener("click",()=>{
    const texto = document.getElementById("insumoNuevo");
    if(texto.value==""){
        Toast.fire({icon: "error", title: "Por favor ingrese el nombre del insumo"});
    } else{
        if(stock.existeInsumo(texto.value)){
            Toast.fire({icon: "error", title: "Ya existe el producto: " + texto.value});
        } else {
            stock.agregarInsumo(texto.value);
            texto.value="";
        }
    }
})


