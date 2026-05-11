// referencias
const contenedor = document.getElementById('contenedor-pelis');
const buscador = document.getElementById('buscador');
const avisoCarga = document.getElementById('cargando');
const avisoError = document.getElementById('error');

let listaDePelis = [];

// funciones API

async function traerPeliculas() {
    try {
        avisoCarga.classList.remove('oculto');
        
        // llamada al servidor de Ghibli
        const respuesta = await fetch('https://ghibliapi.vercel.app/films');
        
        if (!respuesta.ok) {
            throw new Error('No pudimos conectar');
        }

        listaDePelis = await respuesta.json();
        dibujarPelis(listaDePelis);

    } catch (error) {
        console.log("Error de principiante:", error);
        avisoError.classList.remove('oculto');
    } finally {
        avisoCarga.classList.add('oculto');
    }
}

// logica de la pagina

function dibujarPelis(datos) {
    contenedor.innerHTML = ''; // limpiamos antes de dibujar
    
    datos.forEach(peli => {
        const div = document.createElement('div');
        div.className = 'tarjeta';
        
        div.innerHTML = `
            <img src="${peli.image}" alt="Póster">
            <h3>${peli.title}</h3>
            <p>${peli.release_date}</p>
        `;

        // si le dan clic, mostramos la descripción
        div.onclick = () => alert(`Resumen: ${peli.description}`);
        
        contenedor.appendChild(div);
    });
}

// para que el buscador funcione mientras escribimos
buscador.oninput = (evento) => {
    const loQueEscribo = evento.target.value.toLowerCase();
    const filtradas = listaDePelis.filter( p => 
        p.title.toLowerCase().includes(loQueEscribo)
    );
    dibujarPelis(filtradas);
};

traerPeliculas();