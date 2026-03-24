/* ===============================================
   ESTILOS LUPA REAL OPTICA - Lógica Funcional
   =============================================== */
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn-lupa');
    const lente = document.getElementById('lupa-lente');
    const zoomContent = document.getElementById('lupa-zoom-content');
    let activa = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const actualizarPosicion = (x_client, y_client) => {
        if (!activa) return;
        const zoom = 2; 
        const radioLente = 125; 
        const x_page = x_client + window.scrollX;
        const y_page = y_client + window.scrollY;

        lente.style.left = (x_client - radioLente) + 'px';
        lente.style.top = (y_client - radioLente) + 'px';
        zoomContent.style.left = (-(x_page * zoom) + radioLente) + 'px';
        zoomContent.style.top = (-(y_page * zoom) + radioLente) + 'px';
    };

    btn.addEventListener('click', () => {
        activa = !activa;
        btn.classList.toggle('active');
        if (activa) {
            zoomContent.innerHTML = '';
            const clon = document.body.cloneNode(true);
            const btnClon = clon.querySelector('#btn-lupa');
            if (btnClon) btnClon.remove();
            clon.style.width = document.documentElement.offsetWidth + 'px';
            zoomContent.appendChild(clon);
            lente.style.display = 'block';
            btn.innerHTML = '✕';
            actualizarPosicion(lastMouseX, lastMouseY);
        } else {
            lente.style.display = 'none';
            btn.innerHTML = '🔍';
            lente.style.left = '-1000px';
            lente.style.top = '-1000px';
            zoomContent.innerHTML = '';
        }
    });

    document.addEventListener('mousemove', (e) => {
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        if (activa) actualizarPosicion(lastMouseX, lastMouseY);
    });
});
