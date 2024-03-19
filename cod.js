document.addEventListener("DOMContentLoaded", function() {
    const particiones = document.querySelectorAll('.particion');
    const procesos = document.querySelectorAll('.procesos p');

    // Array de colores predeterminados para cada partición
    const coloresPredeterminados = ['red', 'green', 'blue', 'yellow'];

    procesos.forEach((proceso, index) => {
        proceso.draggable = true;
        proceso.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', e.target.innerText);
        });
    });

    particiones.forEach((particion, index) => {
        particion.addEventListener('dragover', function(e) {
            e.preventDefault();
        });

        particion.addEventListener('drop', function(e) {
            e.preventDefault();
            const data = e.dataTransfer.getData('text/plain');
            e.target.innerText = data;
            // Asignar un color predeterminado específico para cada partición
            e.target.style.backgroundColor = coloresPredeterminados[index];
        });
    });
});
