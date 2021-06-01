

export default function crearTabla(items){
    const tabla = document.createElement("table");

    tabla.appendChild(crearThead(items[0]));
    tabla.appendChild(crearTbody(items));
    console.log("Cree una tabla");

    /*tabla.setAttribute("style", "border:1px solid black border-collapse:collapse");*/

    return tabla;

}

function crearThead(item){
    const thead = document.createElement("thead");

    const tr = document.createElement("tr");

    for ( const key in item){
        if(key !== "id"){
            const th = document.createElement("th");
            const texto = document.createTextNode(key);
            th.appendChild(texto);

            tr.appendChild(th);
        }        
    }
    thead.appendChild(tr);

    return thead;
}

/*function crearTbody(items){
    const tbody = document.createElement("tbody");

   

    items.forEach(item => {
        
        const tr = document.createElement("tr");
        for(const key in item){
            if(key === "id"){
                tr.setAttribute("data-id",item[key]);
            }
            else{
                const td = document.createElement("td"); 
                const texto = document.createTextNode(item[key]);
                td.appendChild(texto);
                //td.textContent = item[key];
                tr.appendChild(td);
            }
        }

        tbody.appendChild(tr);
        
    });

    return tbody;

}*/

function crearTbody(items){
    const tbody = document.createElement("tbody");

    items.forEach(item => {

        const tr = document.createElement("tr");
        
        
        // tr.addEventListener("click",handlerClickTD);

        for (const key in item) {
            if(key === "id"){
                tr.setAttribute("data-id",item[key]);
            }
            else{
                const td = document.createElement("td"); 
                const texto = document.createTextNode(item[key]);
                td.appendChild(texto);
                //td.textContent = item[key];
                tr.appendChild(td);
            }
        }                                    
        tbody.appendChild(tr);
    });

    

    return tbody;


}

export function renderizarLista(lista, contenedor){
    
    
    while(contenedor.hasChildNodes()){//Mientras el contenedro tiene hijos, remuevo el primero
        contenedor.removeChild(contenedor.firstChild);
    }
    if(lista){
        contenedor.appendChild(lista);
    }
    
    
}


