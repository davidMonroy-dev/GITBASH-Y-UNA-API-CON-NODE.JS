// Obtén los botones y los formularios
const personalBtn = document.getElementById('personal-btn');
    const comercialBtn = document.getElementById('comercial-btn');
    const rolInput = document.getElementById('rolInput');
    
    personalBtn.addEventListener('click', function() {
        rolInput.value = personalBtn.getAttribute('data-value');
        personalBtn.classList.add('active');
        comercialBtn.classList.remove('active');
    });

    comercialBtn.addEventListener('click', function() {
        rolInput.value = comercialBtn.getAttribute('data-value');
        comercialBtn.classList.add('active');
        personalBtn.classList.remove('active');
    });