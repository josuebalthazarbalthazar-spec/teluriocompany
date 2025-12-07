// ...new file...
document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.auth-tabs .tab');
    const forms = document.querySelectorAll('.auth-form');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const target = tab.getAttribute('data-target');
            forms.forEach(f => {
                f.id === target ? f.classList.remove('hidden') : f.classList.add('hidden');
            });
        });
    });

    // validações simples (exemplo)
    document.getElementById('loginBtn').addEventListener('click', function (e) {
        e.preventDefault();
        const user = document.getElementById('loginUser').value.trim();
        const pass = document.getElementById('loginPass').value;
        if (!user || !pass) return alert('Preencha email/telefone e senha.');
        alert('Login simulado: ' + user);
    });

    document.getElementById('regBtn').addEventListener('click', function (e) {
        e.preventDefault();
        const name = document.getElementById('regName').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const pass = document.getElementById('regPass').value;
        if (!name || !email || pass.length < 6) return alert('Preencha corretamente os campos de registro.');
        alert('Conta criada (simulada): ' + name);
    });
});