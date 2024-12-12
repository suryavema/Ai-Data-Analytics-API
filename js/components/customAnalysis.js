// Custom Analysis Component
const CustomAnalysis = {
    init() {
        this.bindEvents();
    },

    bindEvents() {
        const runCustomBtn = document.getElementById('runCustomBtn');
        const customPrompt = document.getElementById('customPrompt');

        runCustomBtn.addEventListener('click', () => this.handleCustomQuery(customPrompt.value));
    },

    async handleCustomQuery(prompt) {
        try {
            const results = await api.customQuery(ui.currentTableName, prompt);
            this.displayResults(results);
        } catch (error) {
            ui.showToast('Custom query failed: ' + error.message, 'error');
        }
    },

    displayResults(results) {
        const customResults = document.getElementById('customResults');
        customResults.innerHTML = '';

        if (results.custom_query_results) {
            const resultContainer = document.createElement('div');
            resultContainer.className = 'custom-result-container';

            // Add metadata section if available
            if (results.metadata) {
                const metadataSection = document.createElement('div');
                metadataSection.className = 'metadata-section';
                metadataSection.innerHTML = `
                    <h3>Analysis Summary</h3>
                    <div class="metadata-content">
                        ${this.formatMetadata(results.metadata)}
                    </div>
                `;
                resultContainer.appendChild(metadataSection);
            }

            // Add results table section
            const tableSection = document.createElement('div');
            tableSection.className = 'table-section';
            
            // Add section title
            const titleElement = document.createElement('h3');
            titleElement.className = 'section-title';
            titleElement.textContent = 'Query Results';
            tableSection.appendChild(titleElement);

            // Create table container
            const tableContainer = document.createElement('div');
            tableContainer.className = 'table-container';
            tableSection.appendChild(tableContainer);

            // Render the table using the DataTable component
            DataTable.render(
                Array.isArray(results.custom_query_results) 
                    ? results.custom_query_results 
                    : [results.custom_query_results],
                tableContainer
            );

            resultContainer.appendChild(tableSection);
            customResults.appendChild(resultContainer);
        }
    },

    formatMetadata(metadata) {
        if (!metadata) return '';
        return Object.entries(metadata)
            .map(([key, value]) => `
                <div class="metadata-item">
                    <span class="metadata-label">${this.formatLabel(key)}:</span>
                    <span class="metadata-value">${value}</span>
                </div>
            `).join('');
    },

    formatLabel(key) {
        return key.split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
};