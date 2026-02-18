let boton = document.getElementById('miBoton');
let paleta = document.getElementById('paleta');
let tamañoPaleta = document.getElementById('tamañoPaleta');
let formato = document.getElementById('formato');

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
    const valores = hsl.match(/\d+/g); 
    const l = parseInt(valores[2]); // tercer número = lightness

    return l < 50; 
}

function generarPaleta(cantidad){
    paleta.innerHTML ='';// Limpiar paleta antes de generar una nueva
    const formatoSeleccionado = formato.value;
    if (formatoSeleccionado === 'hex') {
        for(let i = 0; i<cantidad; i++){
            const colorHex = generarColorHex();
            const sectionPaleta = document.createElement('section');
            sectionPaleta.classList.add('color-box');
            sectionPaleta.style.backgroundColor = colorHex;
            sectionPaleta.innerHTML = `<span class="color-label">${colorHex}</span>`;
            sectionPaleta.setAttribute('tabindex', '0');
            

            if (colorLetraHex(colorHex)) {
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

boton.addEventListener('click', () => {
    generarPaleta(tamañoPaleta.value);
});