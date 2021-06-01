
import crearTabla from "./tablas.js";
import {renderizarLista} from "./tablas.js";

import limpiarFormulario from "./formulario.js";
import {rellenarFormulario} from "./formulario.js";
import Anuncio_Animal from "./anuncios.js";



let anuncios = JSON.parse(localStorage.getItem("lista")) || [];



window.addEventListener("DOMContentLoaded",()=>{

    document.forms[0].addEventListener("submit",handlerSubmit);

    window.addEventListener("click",handlerClick);

    if(anuncios.length > 0){
        
        renderizarLista(crearTabla(anuncios),document.getElementById("divLista"));

    }

});


function handlerSubmit(e){
    e.preventDefault();

    const frm = e.target;

    if(frm.id.value){
        

    }
    else{
        const nuevoAnuncio = new Anuncio_Animal(Date.now(),
        frm.titulo.value,
        frm.tipoTransaccion.value,
        frm.descripcion.value,
        frm.precio.value,
        frm.tipo.value,
        frm.raza.value,
        frm.fecha.value,
        frm.vacunado.value);
        

        agregarSpinner();

        setTimeout(()=>{
            altaAnuncio(nuevoAnuncio);
            quitarSpinner();
        },3000);

        

        
    }
    
}

function modificarAnuncio(anuncio){
    let index = anuncios.findIndex((a)=>{
        if(a.id == anuncio.id)
            return a.id;
    });

    console.log(index);

    console.log(anuncios);

    anuncios.splice(index,1,anuncio);

    console.log(anuncio);


    console.log(anuncios);
    almacenarDatos(anuncios);
    

}



function altaAnuncio(anuncio){
    anuncios.push(anuncio);
    almacenarDatos(anuncios);


}

function almacenarDatos(data){
    localStorage.setItem("lista",JSON.stringify(data));
    renderizarLista(crearTabla(anuncios),document.getElementById("divLista"));

}



function handlerClick(e){

    if(e.target.matches("td")){

        
        let id = e.target.parentNode.dataset.id;
        rellenarFormulario(id);

 

    }
    else if(e.target.matches("#btnEliminar")){
        let id = parseInt(document.forms[0].id.value);
        
        if(confirm("Confirma la eliminacion?")){
          
            let index = anuncios.findIndex((el) => el.id == id);
           
            agregarSpinner();
            setTimeout(()=>{
                anuncios.splice(index,1);
                almacenarDatos(anuncios);
                quitarSpinner();
            },3000);
            
       
            limpiarFormulario(document.forms[0]);
            
        }
        else{
            limpiarFormulario(document.forms[0]);
        }


    } 
    else if(e.target.matches("#btnModificar")){
        let id = parseInt(document.forms[0].id.value);
        const frm = document.forms[0];

        const anuncioEditado = new Anuncio_Animal(
            id,
            
            frm.titulo.value,
            frm.tipoTransaccion.value,
            frm.descripcion.value,
            frm.precio.value,
            frm.tipo.value,
            frm.raza.value,
            frm.fecha.value,
            frm.vacunado.value);
            if(confirm("Confirma la modificacion?")){
                
                agregarSpinner();
                setTimeout(()=>{
                    modificarAnuncio(anuncioEditado);
                    quitarSpinner();
                },3000);
                limpiarFormulario(document.forms[0]);
            }
                
            else{
                limpiarFormulario(document.forms[0]);
            }


    }
    else if(e.target.matches("#btnCancelar")){
        limpiarFormulario(document.forms[0]);
    }
}



function agregarSpinner(){
    let spinner = document.createElement("img");
    spinner.setAttribute("src","./images/Hourglass.gif");
    spinner.setAttribute("alt","spinner");
    const spinnerContainer =document.getElementById("spinnerContainer");

    spinnerContainer.appendChild(spinner);

    
}

function quitarSpinner(){
    document.getElementById("spinnerContainer").innerHTML="";
}