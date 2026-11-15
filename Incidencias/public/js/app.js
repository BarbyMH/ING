document.addEventListener('DOMContentLoaded', () => {
    const tabla = document.getElementById('tabla-incidencias');
    const filas = tabla.querySelectorAll('tbody tr');
    
    const modal = document.getElementById('modal-detalle');
    const btnCerrar = document.getElementById('btn-cerrar');
    const btnGuardar = document.getElementById('btn-guardar-cambios');

    // Referencias a los inputs del Modal
    const modalFolio = document.getElementById('modal-folio');
    const inputDescripcion = document.getElementById('input-descripcion');
    const inputUbicacion = document.getElementById('input-ubicacion');
    const inputFecha = document.getElementById('input-fecha');
    const selectEstado = document.getElementById('select-estado');
    const selectPersonal = document.getElementById('select-personal');

    let filaActual = null; // Guarda la fila que se está editando

    // --- 1. Evento para abrir el modal al hacer clic en una fila ---
    filas.forEach(fila => {
        fila.addEventListener('click', () => {
            filaActual = fila;

            // Extraemos la información actual de las celdas de la tabla
            const folio = fila.querySelector('.folio').innerText;
            const descripcion = fila.querySelector('.descripcion').innerText;
            const ubicacion = fila.querySelector('.ubicacion').innerText;
            const fecha = fila.querySelector('.fecha').innerText;
            const estadoTexto = fila.querySelector('.estado-celda').innerText.trim();
            const responsableActual = fila.querySelector('.responsable').innerText.trim();

            // Poblamos el formulario del Modal
            modalFolio.innerText = folio;
            inputDescripcion.value = descripcion;
            inputUbicacion.value = ubicacion;
            inputFecha.value = fecha;
            
            // Asignar el estado actual en el select
            selectEstado.value = estadoTexto;
            
            // Asignar el responsable actual en el select o dejar en "Sin asignar"
            const opcionExiste = Array.from(selectPersonal.options).some(opt => opt.value === responsableActual);
            selectPersonal.value = opcionExiste ? responsableActual : "Sin asignar";

            // Mostrar el modal
            modal.classList.remove('d-none');
        });
    });

    // --- 2. Funciones para cerrar el Modal ---
    const cerrarModal = () => {
        modal.classList.add('d-none');
        filaActual = null;
    };

    btnCerrar.addEventListener('click', cerrarModal);
    modal.addEventListener('click', (evento) => {
        if (evento.target === modal) {
            cerrarModal();
        }
    });

    // --- 3. Evento para guardar todos los cambios en la tabla ---
    btnGuardar.addEventListener('click', () => {
        if (filaActual) {
            // Actualizamos los textos en la tabla con lo modificado en el modal
            filaActual.querySelector('.descripcion').innerText = inputDescripcion.value;
            filaActual.querySelector('.ubicacion').innerText = inputUbicacion.value;
            filaActual.querySelector('.fecha').innerText = inputFecha.value;
            filaActual.querySelector('.responsable').innerText = selectPersonal.value;

            // Actualizamos el estado y su etiqueta visual (badge) correspondiente
            const nuevoEstado = selectEstado.value;
            const celdaEstado = filaActual.querySelector('.estado-celda');
            
            let claseBadge = 'pendiente';
            if (nuevoEstado === 'En proceso') claseBadge = 'proceso';
            if (nuevoEstado === 'Resuelto') claseBadge = 'resuelto';
            
            celdaEstado.innerHTML = `<span class="badge ${claseBadge}">${nuevoEstado}</span>`;

            // Cerramos la ventana modal
            cerrarModal();
        }
    });
});