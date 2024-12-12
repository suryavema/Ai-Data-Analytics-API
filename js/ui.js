const ui = {
    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast show ${type}`;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    },

    updateFilesList(files) {
        const filesList = document.getElementById('filesList');
        filesList.innerHTML = '';

        files.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.textContent = file.filename;
            fileItem.addEventListener('click', () => this.selectFile(file));
            filesList.appendChild(fileItem);
        });
    },

    selectFile(file) {
        document.querySelector('.no-file-selected').classList.add('hidden');
        document.getElementById('fileAnalysis').classList.remove('hidden');
        document.getElementById('currentFileName').textContent = file.filename;

        const fieldSelect = document.getElementById('fieldSelect');
        fieldSelect.innerHTML = '';
        file.columns.forEach(column => {
            const option = document.createElement('option');
            option.value = column.name;
            option.textContent = column.name;
            fieldSelect.appendChild(option);
        });

        this.currentTableName = file.table_name;
    },

    displayQueryResults(results) {
        // Display aggregate results sections
        const statsGrid = document.getElementById('statsGrid');
        statsGrid.innerHTML = '';
        
        // Create section for overall aggregates
        const overallSection = document.createElement('div');
        overallSection.className = 'stats-section';
        overallSection.innerHTML = '<h3 class="stats-title">Overall Aggregate Results</h3>';
        
        const overallGrid = document.createElement('div');
        overallGrid.className = 'stats-cards';
        
        const stats = results.aggregate_results;
        Object.entries(stats).forEach(([key, value]) => {
            const statCard = document.createElement('div');
            statCard.className = 'stat-card';
            statCard.innerHTML = `
                <div class="stat-label">${key.toUpperCase()}</div>
                <div class="stat-value">${typeof value === 'number' ? value.toFixed(2) : value}</div>
            `;
            overallGrid.appendChild(statCard);
        });
        overallSection.appendChild(overallGrid);
        statsGrid.appendChild(overallSection);

        // Create section for constrained aggregates if available
        if (results.constrained_aggregate_results) {
            const constrainedSection = document.createElement('div');
            constrainedSection.className = 'stats-section';
            constrainedSection.innerHTML = '<h3 class="stats-title">Constrained Aggregate Results</h3>';
            
            const constrainedGrid = document.createElement('div');
            constrainedGrid.className = 'stats-cards';
            
            Object.entries(results.constrained_aggregate_results).forEach(([key, value]) => {
                const statCard = document.createElement('div');
                statCard.className = 'stat-card';
                statCard.innerHTML = `
                    <div class="stat-label">${key.toUpperCase()}</div>
                    <div class="stat-value">${typeof value === 'number' ? value.toFixed(2) : value}</div>
                `;
                constrainedGrid.appendChild(statCard);
            });
            constrainedSection.appendChild(constrainedGrid);
            statsGrid.appendChild(constrainedSection);
        }

        // Display results table with scrolling
        const resultsTable = document.getElementById('resultsTable');
        resultsTable.innerHTML = '';

        if (results.search_results && results.search_results.length > 0) {
            const tableWrapper = document.createElement('div');
            tableWrapper.className = 'table-wrapper';
            
            const table = document.createElement('table');
            table.className = 'results-table';
            
            // Create header row
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            const headers = Object.keys(results.search_results[0]);
            
            headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Create data rows
            const tbody = document.createElement('tbody');
            results.search_results.forEach(row => {
                const tr = document.createElement('tr');
                headers.forEach(header => {
                    const td = document.createElement('td');
                    td.textContent = row[header];
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });
            table.appendChild(tbody);

            tableWrapper.appendChild(table);
            resultsTable.appendChild(tableWrapper);
        }
    },

    displayCustomResults(results) {
        const resultsTable = document.getElementById('resultsTable');
        resultsTable.innerHTML = '';

        if (results.search_results && results.search_results.length > 0) {
            const tableWrapper = document.createElement('div');
            tableWrapper.className = 'table-wrapper';
            
            const table = document.createElement('table');
            table.className = 'results-table';
            
            // Create header row
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            const headers = Object.keys(results.search_results[0]);
            
            headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Create data rows
            const tbody = document.createElement('tbody');
            results.custom_query_results.forEach(row => {
                const tr = document.createElement('tr');
                headers.forEach(header => {
                    const td = document.createElement('td');
                    td.textContent = row[header];
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });
            table.appendChild(tbody);

            tableWrapper.appendChild(table);
            resultsTable.appendChild(tableWrapper);
        }
    },
    displayQueryResults(results) {
        // Display aggregate results sections
        const statsGrid = document.getElementById('statsGrid');
        statsGrid.innerHTML = '';
        
        // Create section for overall aggregates
        const overallSection = document.createElement('div');
        overallSection.className = 'stats-section';
        overallSection.innerHTML = '<h3 class="stats-title">Overall Aggregate Results</h3>';
        
        const overallGrid = document.createElement('div');
        overallGrid.className = 'stats-cards';
        
        const stats = results.aggregate_results;
        Object.entries(stats).forEach(([key, value]) => {
            const statCard = document.createElement('div');
            statCard.className = 'stat-card';
            statCard.innerHTML = `
                <div class="stat-label">${key.toUpperCase()}</div>
                <div class="stat-value">${typeof value === 'number' ? value.toFixed(2) : value}</div>
            `;
            overallGrid.appendChild(statCard);
        });
        overallSection.appendChild(overallGrid);
        statsGrid.appendChild(overallSection);

        // Create section for constrained aggregates if available
        if (results.constrained_aggregate_results) {
            const constrainedSection = document.createElement('div');
            constrainedSection.className = 'stats-section';
            constrainedSection.innerHTML = '<h3 class="stats-title">Constrained Aggregate Results</h3>';
            
            const constrainedGrid = document.createElement('div');
            constrainedGrid.className = 'stats-cards';
            
            Object.entries(results.constrained_aggregate_results).forEach(([key, value]) => {
                const statCard = document.createElement('div');
                statCard.className = 'stat-card';
                statCard.innerHTML = `
                    <div class="stat-label">${key.toUpperCase()}</div>
                    <div class="stat-value">${typeof value === 'number' ? value.toFixed(2) : value}</div>
                `;
                constrainedGrid.appendChild(statCard);
            });
            constrainedSection.appendChild(constrainedGrid);
            statsGrid.appendChild(constrainedSection);
        }

        // Display results table
        const resultsTable = document.getElementById('resultsTable');
        if (results.search_results && results.search_results.length > 0) {
            DataTable.render(results.search_results, resultsTable);
        } else {
            resultsTable.innerHTML = '<div class="empty-state">No results found</div>';
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