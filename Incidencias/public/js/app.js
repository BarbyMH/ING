document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#tabla-incidencias tbody');

    // Usamos delegación de eventos para capturar los clics en los botones
    tableBody.addEventListener('click', (e) => {
        const target = e.target;
        const row = target.closest('tr');

        // BORRAR FILA
        if (target.classList.contains('btn-borrar')) {
            if (confirm('¿Estás seguro de que deseas borrar esta incidencia?')) {
                row.remove();
            }
        }

        // ACTIVAR MODO EDICIÓN
        if (target.classList.contains('btn-editar')) {
            const descCell = row.cells[1];
            const ubiCell = row.cells[2];
            const fechaCell = row.cells[3];
            const estadoCell = row.cells[4];
            const accionesCell = row.cells[5];

            // Guardamos los valores actuales por si el usuario presiona "Cancelar"
            row.dataset.desc = descCell.innerText;
            row.dataset.ubi = ubiCell.innerText;
            row.dataset.fecha = fechaCell.innerText;
            row.dataset.estado = estadoCell.innerText.trim();

            // Reemplazamos el texto por inputs
            descCell.innerHTML = `<input type="text" class="edit-input" value="${row.dataset.desc}">`;
            ubiCell.innerHTML = `<input type="text" class="edit-input" value="${row.dataset.ubi}">`;
            fechaCell.innerHTML = `<input type="date" class="edit-input" value="${formatearFechaParaInput(row.dataset.fecha)}">`;
            
            // Reemplazamos el badge por un select
            estadoCell.innerHTML = `
                <select class="edit-input">
                    <option value="Pendiente" ${row.dataset.estado === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
                    <option value="En proceso" ${row.dataset.estado === 'En proceso' ? 'selected' : ''}>En proceso</option>
                    <option value="Resuelto" ${row.dataset.estado === 'Resuelto' ? 'selected' : ''}>Resuelto</option>
                </select>
            `;

            // Cambiamos los botones
            accionesCell.innerHTML = `
                <button class="btn btn-guardar">Guardar</button>
                <button class="btn btn-cancelar">Cancelar</button>
            `;
        }

        // GUARDAR CAMBIOS
        if (target.classList.contains('btn-guardar')) {
            const descVal = row.cells[1].querySelector('input').value;
            const ubiVal = row.cells[2].querySelector('input').value;
            const fechaVal = row.cells[3].querySelector('input').value;
            const estadoVal = row.cells[4].querySelector('select').value;

            row.cells[1].innerText = descVal;
            row.cells[2].innerText = ubiVal;
            row.cells[3].innerText = formatearFechaParaMostrar(fechaVal);
            
            row.cells[4].innerHTML = generarBadge(estadoVal);

            // Restauramos los botones
            row.cells[5].innerHTML = `
                <button class="btn btn-editar">Editar</button>
                <button class="btn btn-borrar">Borrar</button>
            `;
        }

        // CANCELAR EDICIÓN
        if (target.classList.contains('btn-cancelar')) {
            row.cells[1].innerText = row.dataset.desc;
            row.cells[2].innerText = row.dataset.ubi;
            row.cells[3].innerText = row.dataset.fecha;
            row.cells[4].innerHTML = generarBadge(row.dataset.estado);

            // Restauramos los botones
            row.cells[5].innerHTML = `
                <button class="btn btn-editar">Editar</button>
                <button class="btn btn-borrar">Borrar</button>
            `;
        }
    });

    // Funciones auxiliares para el formato de etiquetas y fechas
    function generarBadge(estado) {
        let badgeClass = '';
        if (estado === 'Pendiente') badgeClass = 'pendiente';
        if (estado === 'En proceso') badgeClass = 'proceso';
        if (estado === 'Resuelto') badgeClass = 'resuelto';
        return `<span class="badge ${badgeClass}">${estado}</span>`;
    }

    // Convierte DD/MM/YYYY a YYYY-MM-DD para el <input type="date">
    function formatearFechaParaInput(fechaStr) {
        if (fechaStr.includes('/')) {
            const [dia, mes, anio] = fechaStr.split('/');
            return `${anio}-${mes}-${dia}`;
        }
        return fechaStr;
    }

    // Convierte YYYY-MM-DD de vuelta a DD/MM/YYYY para mostrar en la tabla
    function formatearFechaParaMostrar(fechaStr) {
        if (fechaStr.includes('-')) {
            const [anio, mes, dia] = fechaStr.split('-');
            return `${dia}/${mes}/${anio}`;
        }
        return fechaStr;
    }
});