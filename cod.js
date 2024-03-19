document.addEventListener("DOMContentLoaded", function() {
    const particiones = document.querySelectorAll('.particion');
    const procesos = document.querySelectorAll('.procesos p');
    const coloresPredeterminados = ['red', 'green', 'blue', 'yellow'];
    let tamanosParticiones = [4, 4, 4, 4];
    const tamanosProcesos = {
        "Visual SC": 4,
        "Warzone": 4,
        "Chrome": 4,
        "R studio": 4
    };

    function calcularTotalRAM() {
        return tamanosParticiones.reduce((total, particion) => total + particion, 0);
    }

    function actualizarTotalRAM() {
        const totalRAM = calcularTotalRAM();
        document.getElementById('total-ram').innerText = totalRAM;
    }

    actualizarTotalRAM();

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
            const procesoSize = tamanosProcesos[data];

            if (procesoSize !== undefined && tamanosParticiones[index] >= procesoSize) {
                e.target.innerText = `${data} - Ocupa ${procesoSize}GB`;
                e.target.style.backgroundColor = coloresPredeterminados[index];
                tamanosParticiones[index] -= procesoSize;
                actualizarTotalRAM(); 
            } else {
                alert(`No hay suficiente espacio en esta partición para el proceso ${data}`);
            }
        });
    });
});

