/* ===============================================
   MODO LECTURA - Accesibilidad y Enfoque
   =============================================== */
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    
    // Función para alternar el modo
    const toggleReadingMode = () => {
        const isActive = body.classList.toggle('reading-mode-active');
        localStorage.setItem('reading-mode', isActive ? 'enabled' : 'disabled');
        
        // Feedback visual en consola y scroll al inicio
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Comprobar persistencia al cargar
    if (localStorage.getItem('reading-mode') === 'enabled') {
        body.classList.add('reading-mode-active');
    }

    // Listener para tu botón de activación
    const btn = document.getElementById('btn-lectura');
    if (btn) {
        btn.addEventListener('click', toggleReadingMode);
    }
});
