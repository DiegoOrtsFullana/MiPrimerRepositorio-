document.getElementById("btn_juego").onclick = iniciarJuego;
const imagenes_nombre = [];
let img;

img = document.createElement("img");
img.setAttribute('src', 'imgs/img_jaime.png');
img.setAttribute('id', 'Jaime');
img.setAttribute('alt', 'Jaime');
imagenes_nombre.push(img);

img = document.createElement("img");
img.setAttribute('src', 'imgs/img_dof.png');
img.setAttribute('id', 'Diego');
img.setAttribute('alt', 'Diego');
imagenes_nombre.push(img);

img = document.createElement("img");
img.setAttribute('src', 'imgs/img_gom.png');
img.setAttribute('id', 'Alvaro');
img.setAttribute('alt', 'Alvaro');
imagenes_nombre.push(img);

img = document.createElement("img");
img.setAttribute('src', 'imgs/img_luigi.png');
img.setAttribute('id', 'Giovanni');
img.setAttribute('alt', 'Giovanni');
imagenes_nombre.push(img);

console.log(imagenes_nombre)


const imagenes_foto = [
    {   ruta:"imgs/depositphotos_84671024-stock-photo-good-looking-businessman-smiling-at.jpg",
        id :"Jaime"
    },
    {   ruta:"imgs/depositphotos_84671024-stock-photo-good-looking-businessman-smiling-at.jpg",
        id:"Diego"
    },
    {   ruta:"imgs/depositphotos_84671024-stock-photo-good-looking-businessman-smiling-at.jpg",
        id:"Giovanni"
    },
    {   ruta:"imgs/depositphotos_84671024-stock-photo-good-looking-businessman-smiling-at.jpg",
        id:"Alvaro"
    }    
]

barajar(imagenes_nombre);
barajar(imagenes_foto);
for (let i = 0; i < imagenes_nombre.length; i++) {
    movibles(imagenes_nombre[i]);
}


function iniciarJuego(){
    const contenido = document.querySelector('.contenido');
    contenido.innerHTML = '';

    contenido.innerHTML = `
        <div class="imgs_juego">
            <div class="conjunto" id="c1">
                <img class="foto1" width="200" height="200" src="${imagenes_foto[0].ruta}" alt="${imagenes_foto[0].id}">
                <div class="tapete" id="hueco1" data-ocupado="false" nom-corresp="${imagenes_foto[0].id}"></div>
                <div class="nombres" id="nombre1"></div>
            </div>
            <div class="conjunto" id="c2">
                <img class="foto2" width="200" height="200" src="${imagenes_foto[1].ruta}" alt="${imagenes_foto[1].id}">
                <div class="tapete" id="hueco2" data-ocupado="false" nom-corresp="${imagenes_foto[1].id}"></div>
                <div class="nombres" id="nombre2"></div>
            </div>
            <div class="conjunto" id="c3">
                <img class="foto3" width="200" height="200" src="${imagenes_foto[2].ruta}" alt="${imagenes_foto[2].id}">
                <div class="tapete" id="hueco3" data-ocupado="false" nom-corresp="${imagenes_foto[2].id}"></div>
                <div class="nombres" id="nombre3"></div>
            </div>
            <div class="conjunto" id="c4">
                <img class="foto4" width="200" height="200" src="${imagenes_foto[3].ruta}" alt="${imagenes_foto[3].id}">
                <div class="tapete" id="hueco4" data-ocupado="false" nom-corresp="${imagenes_foto[3].id}"></div>
                <div class="nombres" id="nombre4"></div>
            </div>
            
        </div>
    `;
    
    let hueco1   = document.getElementById("hueco1");
    let hueco2   = document.getElementById("hueco2");
    let hueco3   = document.getElementById("hueco3");
    let hueco4   = document.getElementById("hueco4");

    let nombre1   = document.getElementById("nombre1");
    let nombre2   = document.getElementById("nombre2");
    let nombre3   = document.getElementById("nombre3");
    let nombre4  = document.getElementById("nombre4");

    

    for (let i = 0; i < imagenes_nombre.length;i++){
        imagenes_nombre[i].style.width=100+"%";
        document.getElementById(`nombre${i + 1}`).appendChild(imagenes_nombre[i]);
    }


    

    hueco_destino(hueco1);
    hueco_destino(hueco2);
    hueco_destino(hueco3);
    hueco_destino(hueco4);

    document.querySelector('.boton_reinicio').style.display = 'block';
    document.getElementById('btn_reset').onclick = reiniciarJuego;

};


function reiniciarJuego() {
    const tapetes = document.querySelectorAll('.tapete');

    barajar(imagenes_nombre);
    for (let i = 0; i < imagenes_nombre.length;i++){
        imagenes_nombre[i].style.width=100+"%";
        document.getElementById(`nombre${i + 1}`).appendChild(imagenes_nombre[i]);
        movibles(imagenes_nombre[i]);
    }

    tapetes.forEach(tapete => {
        tapete.setAttribute('data-ocupado', 'false');
    });

}



function limpiarTapete(tapete) {
    while (tapete.firstChild) {
        tapete.removeChild(tapete.firstChild);
    }
}

function barajar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function movibles(imgs) {
    if (!imgs.classList.contains('imagen_nombre')) {
        imgs.draggable = true;
        imgs.ondragstart = al_mover;
        imgs.ondrag = function (e) { };
        imgs.ondragend = function () { };
    }
}
function al_mover(e) { 
    e.dataTransfer.setData( "text/plain",e.target.getAttribute("id")); 
}   
function soltar(e){
    e.preventDefault();

}

function hueco_destino(destino){
        destino.ondragenter = function(e) { e.preventDefault(); };
        destino.ondragover = function(e) { e.preventDefault(); };
        destino.ondraleave = function(e) { e.preventDefault(); };
        destino.ondrop = soltar;
}

function soltar(e) {
    e.preventDefault();
    const tapeteDestino = e.target;

    const ocupado = tapeteDestino.getAttribute('data-ocupado');

    if (ocupado === 'false') {
        const id = e.dataTransfer.getData("text/plain");
        const imagenArrastrada = document.querySelector(`[id="${id}"]`);

        limpiarTapete(tapeteDestino);

        tapeteDestino.appendChild(imagenArrastrada);
        imagenArrastrada.draggable=false;

        tapeteDestino.setAttribute('data-ocupado', 'true');

        const todosOcupados = Array.from(document.querySelectorAll('.tapete')).every(hueco => hueco.getAttribute('data-ocupado') === 'true');
    
        if (todosOcupados) {
            setTimeout(compararHuecos, 250);        }
    }
}

function compararHuecos() {
    const tapetes = document.querySelectorAll('.tapete');
    let aciertos = 0;
    let fallos = 0;

    for (let i = 0; i < tapetes.length; i++) {
        const nombreId = tapetes[i].getAttribute('nom-corresp');
        const imagenEnHueco = tapetes[i].querySelector('img');

        if (nombreId === imagenEnHueco.id) {
            aciertos++;
        } else {
            fallos++;
        }
    }

    alert(`Aciertos: ${aciertos}\nFallos: ${fallos}`);
}