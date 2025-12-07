document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('adminLoginForm');
    const errorMessage = document.getElementById('errorMessage');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const email = document.getElementById('adminEmail').value;
            const password = document.getElementById('adminPassword').value;

            // Credenciais hardcoded (substituir por uma verificação de backend no futuro)
            const ADMIN_EMAIL = 'admin@telurio.com';
            const ADMIN_PASS = 'admin123';

            if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
                // Login bem-sucedido
                sessionStorage.setItem('isAdminLoggedIn', 'true');
                window.location.href = 'admin.html';
            } else {
                // Credenciais inválidas
                errorMessage.textContent = 'Email ou senha inválidos.';
            }
        });
    }
});