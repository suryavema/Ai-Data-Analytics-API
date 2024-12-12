document.addEventListener('DOMContentLoaded', () => {
    const authTabs = document.querySelectorAll('.auth-tab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const logoutBtn = document.getElementById('logoutBtn');

    // Tab switching
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            authTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            if (tab.dataset.tab === 'login') {
                loginForm.classList.remove('hidden');
                registerForm.classList.add('hidden');
            } else {
                loginForm.classList.add('hidden');
                registerForm.classList.remove('hidden');
            }
        });
    });

    // Login form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);

        try {
            const data = await api.login(
                formData.get('username'),
                formData.get('password')
            );
            
            api.setToken(data.token);
            document.getElementById('username').textContent = data.user.username;
            showMainSection();
            ui.showToast('Logged in successfully', 'success');
            loadUserFiles();
        } catch (error) {
            ui.showToast('Login failed: ' + error.message, 'error');
        }
    });

    // Register form submission
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(registerForm);

        try {
            const data = await api.register(
                formData.get('username'),
                formData.get('password'),
                formData.get('email')
            );
            
            api.setToken(data.token);
            document.getElementById('username').textContent = data.user.username;
            showMainSection();
            ui.showToast('Registration successful', 'success');
            loadUserFiles();
        } catch (error) {
            ui.showToast('Registration failed: ' + error.message, 'error');
        }
    });

    // Logout
    logoutBtn.addEventListener('click', () => {
        api.clearToken();
        showAuthSection();
        ui.showToast('Logged out successfully', 'success');
    });

    // Check if user is already logged in
    if (localStorage.getItem('token')) {
        showMainSection();
        loadUserFiles();
    }
});

function showAuthSection() {
    document.getElementById('authSection').classList.remove('hidden');
    document.getElementById('mainSection').classList.add('hidden');
}

function showMainSection() {
    document.getElementById('authSection').classList.add('hidden');
    document.getElementById('mainSection').classList.remove('hidden');
}