document.addEventListener('DOMContentLoaded', () => {
    // --- Referencias al DOM ---
    const tabla = document.getElementById('tabla-incidencias');
    const filas = tabla.querySelectorAll('tbody tr');
    
    const modal = document.getElementById('modal-detalle');
    const btnCerrar = document.getElementById('btn-cerrar');
    const btnGuardarAsignacion = document.getElementById('btn-guardar-asignacion');
    const selectPersonal = document.getElementById('select-personal');

    // Campos del Modal
    const modalFolio = document.getElementById('modal-folio');
    const modalUbicacion = document.getElementById('modal-ubicacion');
    const modalFecha = document.getElementById('modal-fecha');
    const modalEstado = document.getElementById('modal-estado');
    const modalDescripcion = document.getElementById('modal-descripcion');

    let filaActual = null; // Variable para saber qué fila estamos editando

    // --- 1. Evento para abrir el modal al hacer clic en una fila ---
    filas.forEach(fila => {
        fila.addEventListener('click', (evento) => {
            // Evitamos abrir el modal si el usuario hizo clic en los botones "Editar" o "Borrar"
            if (evento.target.tagName.toLowerCase() === 'button') {
                return; 
            }

            filaActual = fila; // Guardamos la fila seleccionada

            // Extraemos la información de las celdas (td) de la fila clickeada
            const folio = fila.querySelector('.folio').innerText;
            const descripcion = fila.querySelector('.descripcion').innerText;
            const ubicacion = fila.querySelector('.ubicacion').innerText;
            const fecha = fila.querySelector('.fecha').innerText;
            const estadoHTML = fila.querySelector('.estado-celda').innerHTML;
            const responsableActual = fila.querySelector('.responsable').innerText;

            // Poblamos el Modal con la información
            modalFolio.innerText = folio;
            modalDescripcion.innerText = descripcion;
            modalUbicacion.innerText = ubicacion;
            modalFecha.innerText = fecha;
            modalEstado.innerHTML = estadoHTML; // Mantiene el span del badge
            
            // Actualizamos el <select> si ya había alguien asignado, si no existe lo deja en "Sin asignar"
            const opcionExiste = Array.from(selectPersonal.options).some(opt => opt.value === responsableActual);
            if(opcionExiste) {
                selectPersonal.value = responsableActual;
            } else {
                selectPersonal.value = "Sin asignar";
            }

            // Mostramos el modal
            modal.classList.remove('d-none');
        });
    });

    // --- 2. Funciones para cerrar el Modal ---
    const cerrarModal = () => {
        modal.classList.add('d-none');
        filaActual = null;
    };

    btnCerrar.addEventListener('click', cerrarModal);

    // Cerrar si se hace clic fuera de la tarjeta blanca (en el fondo oscuro)
    modal.addEventListener('click', (evento) => {
        if (evento.target === modal) {
            cerrarModal();
        }
    });

    // --- 3. Evento para guardar la asignación ---
    btnGuardarAsignacion.addEventListener('click', () => {
        if (filaActual) {
            const nuevoResponsable = selectPersonal.value;
            
            // Actualizar la celda "Responsable" de la tabla
            filaActual.querySelector('.responsable').innerText = nuevoResponsable;

            // (Opcional) Cambiar el estado a 'Asignado/En proceso' automáticamente si es "Pendiente"
            const celdaEstado = filaActual.querySelector('.estado-celda');
            if (nuevoResponsable !== "Sin asignar" && celdaEstado.innerText.includes("Pendiente")) {
                celdaEstado.innerHTML = '<span class="badge proceso">En proceso</span>';
            }

            // Cerrar el modal
            cerrarModal();
        }
    });
});