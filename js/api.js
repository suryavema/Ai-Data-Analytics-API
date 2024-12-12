const API_URL = 'http://localhost:8000';
let authToken = localStorage.getItem('token');

const api = {
    setToken(token) {
        authToken = token;
        localStorage.setItem('token', token);
    },

    clearToken() {
        authToken = null;
        localStorage.removeItem('token');
    },

    async register(username, password, email) {
        const response = await fetch(`${API_URL}/api/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, email })
        });

        if (!response.ok) throw new Error('Registration failed');
        return response.json();
    },

    async login(email, password) {
        const response = await fetch(`${API_URL}/api/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) throw new Error('Login failed');
        return response.json();
    },

    async uploadCSV(file) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${API_URL}/api/upload/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${authToken}`
            },
            body: formData
        });

        if (!response.ok) throw new Error('Upload failed');
        return response.json();
    },

    async getCSVFiles() {
        const response = await fetch(`${API_URL}/api/csv/`, {
            headers: {
                'Authorization': `Token ${authToken}`
            }
        });

        if (!response.ok) throw new Error('Failed to fetch files');
        return response.json();
    },

    async queryData(tableName, field, operator, value) {
        const response = await fetch(
            `${API_URL}/api/query/?table_name=${tableName}&field=${field}&value=${value}&operator=${operator}`,
            {
                headers: {
                    'Authorization': `Token ${authToken}`
                }
            }
        );

        if (!response.ok) throw new Error('Query failed');
        return response.json();
    },

    async customQuery(tableName, prompt) {
        const response = await fetch(`${API_URL}/api/custom-query/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                table_name: tableName,
                prompt: prompt
            })
        });

        if (!response.ok) throw new Error('Custom query failed');
        return response.json();
    }
};