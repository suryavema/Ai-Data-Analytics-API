document.addEventListener('DOMContentLoaded', () => {
    const csvFileInput = document.getElementById('csvFile');
    const runQueryBtn = document.getElementById('runQueryBtn');
    const runCustomBtn = document.getElementById('runCustomBtn');
    const analysisTabs = document.querySelectorAll('.analysis-tab');
    
    // File upload handling
    csvFileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            await api.uploadCSV(file);
            ui.showToast('File uploaded successfully', 'success');
            loadUserFiles();
        } catch (error) {
            ui.showToast('Upload failed: ' + error.message, 'error');
        }
    });

    // Query execution
    runQueryBtn.addEventListener('click', async () => {
        const field = document.getElementById('fieldSelect').value;
        const operator = document.getElementById('operatorSelect').value;
        const value = document.getElementById('valueInput').value;

        try {
            const results = await api.queryData(
                ui.currentTableName,
                field,
                operator,
                value
            );
            ui.displayQueryResults(results);
        } catch (error) {
            ui.showToast('Query failed: ' + error.message, 'error');
        }
    });

    // Custom query execution
    runCustomBtn.addEventListener('click', async () => {
        const prompt = document.getElementById('customPrompt').value;

        try {
            const results = await api.customQuery(ui.currentTableName, prompt);
            ui.displayCustomResults(results);
        } catch (error) {
            ui.showToast('Custom query failed: ' + error.message, 'error');
        }
    });

    // Analysis tab switching
    analysisTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            analysisTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const querySection = document.getElementById('querySection');
            const customSection = document.getElementById('customSection');

            if (tab.dataset.tab === 'query') {
                querySection.classList.remove('hidden');
                customSection.classList.add('hidden');
            } else {
                querySection.classList.add('hidden');
                customSection.classList.remove('hidden');
            }
        });
    });

    // Drag and drop handling
    const uploadLabel = document.querySelector('.upload-label');

    uploadLabel.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadLabel.style.borderColor = 'var(--primary-color)';
    });

    uploadLabel.addEventListener('dragleave', () => {
        uploadLabel.style.borderColor = 'var(--border-color)';
    });

    uploadLabel.addEventListener('drop', async (e) => {
        e.preventDefault();
        uploadLabel.style.borderColor = 'var(--border-color)';

        const file = e.dataTransfer.files[0];
        if (!file || !file.name.endsWith('.csv')) {
            ui.showToast('Please upload a CSV file', 'error');
            return;
        }

        try {
            await api.uploadCSV(file);
            ui.showToast('File uploaded successfully', 'success');
            loadUserFiles();
        } catch (error) {
            ui.showToast('Upload failed: ' + error.message, 'error');
        }
    });
});

// Load user's CSV files
async function loadUserFiles() {
    try {
        const files = await api.getCSVFiles();
        ui.updateFilesList(files);
    } catch (error) {
        ui.showToast('Failed to load files: ' + error.message, 'error');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    CustomAnalysis.init();
});