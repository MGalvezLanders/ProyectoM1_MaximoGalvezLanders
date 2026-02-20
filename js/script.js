//Variables para acceder a los elementos
let boton = document.getElementById('miBoton');
let paleta = document.getElementById('paleta');
let tamañoPaleta = document.getElementById('tamañoPaleta');
let formato = document.getElementById('formato');
let toast = document.createElement('div');
toast.classList.add('toast');
document.body.appendChild(toast);
toast.style.display = 'none';

// Funciones para generar los colores y determinar los colores de las letras
function generarColorHex(cantidad){
    const numero = Math.floor(Math.random() * 16777215);
    return '#' + numero.toString(16).padStart(6, '0');
}
function generarColorHsl(cantidad){
    const h = Math.floor(Math.random() * 360);  
    const s = Math.floor(Math.random() * 100);
    const l = Math.floor(Math.random() * 100);
    return `hsl(${h}, ${s}%, ${l}%)`;
}
function colorLetraHex(hex){
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminosidad = (r * 299 + g * 587 + b * 114) / 1000;
    return luminosidad < 128;
}
function colorLetraHsl(hsl) {
    const valores = hsl.match(/\d+/g); // Extrae los valores numéricos de HSL
    const l = parseInt(valores[2]); // Obtiene el valor de luminosidad

    return l < 50; 
}
//Funcion principal para generar la paleta de colores
function generarPaleta(cantidad){
    paleta.innerHTML ='';// Limpiar paleta antes de generar una nueva
    const formatoSeleccionado = formato.value;
    if (formatoSeleccionado === 'hex') {
        for(let i = 0; i<cantidad; i++){
            const colorHex = generarColorHex();
            const sectionPaleta = document.createElement('section');//agrega un elemento section
            sectionPaleta.classList.add('color-box');//agrega un class para el estilo
            sectionPaleta.style.backgroundColor = colorHex;
            sectionPaleta.style.boxShadow = '0 0 8px rgba(0, 0, 0, 0.5)';//agrega sombra para que se vea mejor
            sectionPaleta.innerHTML = `<span class="color-label">${colorHex}</span>`;//agrega el nombre del color
            sectionPaleta.setAttribute('tabindex', '0');            

            if (colorLetraHex(colorHex)) {//determina el color de la letra dependiendo del fondo
                sectionPaleta.style.color = 'white';
            } else {
                sectionPaleta.style.color = 'black';
            }

            paleta.appendChild(sectionPaleta);
        }
    } else {
        for(let i = 0; i<cantidad; i++){
            const colorHsl = generarColorHsl();
            const colorHex = generarColorHex();
            const sectionPaleta = document.createElement('section');
            sectionPaleta.classList.add('color-box');
            sectionPaleta.style.backgroundColor = colorHsl;
            sectionPaleta.style.boxShadow = '0 0 8px rgba(0, 0, 0, 0.5)';
            sectionPaleta.innerHTML = `<span class="color-label">${colorHsl} <br> Hex: ${colorHex}</span>`;
            sectionPaleta.setAttribute('tabindex', '0');           

            if (colorLetraHsl(colorHsl)) {
                sectionPaleta.style.color = 'white';
            } else {
                sectionPaleta.style.color = 'black';
            }

            paleta.appendChild(sectionPaleta);
        }
    }
}

paleta.addEventListener('dblclick', (e) => {
    if (e.target.classList.contains('color-box')) {
        const colorLabel = e.target.querySelector('.color-label');
        const colorText = colorLabel.textContent;
        navigator.clipboard.writeText(colorText).then(() => {
            toast.textContent = `Color copiado: ${colorText}`;
            toast.style.display = 'block';
            setTimeout(() => {
                toast.style.display = 'none';
            }, 2000);
        });
    }
});


boton.addEventListener('click', () => {
    if (tamañoPaleta.value && formato.value) {//verifica que se seleccioono un tamaño y un formato
        generarPaleta(tamañoPaleta.value);
        toast.textContent = `Paleta ${formato.value.toUpperCase()} generada con éxito`;//mensaje de confirmacion con el formato en mayuscula
        toast.style.display = 'block';
        setTimeout(() => {//Oculta el mensaje despues de un tiempo
            toast.style.display = 'none';
        }, 2000);
    } else {
        alert('Por favor, selecciona un tamaño y un formato.');
    }
});