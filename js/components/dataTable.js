// Reusable Data Table Component
const DataTable = {
    render(data, container) {
        if (!Array.isArray(data) || data.length === 0) {
            container.innerHTML = '<div class="empty-state">No results found</div>';
            return;
        }

        const tableWrapper = document.createElement('div');
        tableWrapper.className = 'table-wrapper';
        
        const table = document.createElement('table');
        table.className = 'results-table';
        
        // Create header row
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const headers = Object.keys(data[0]);
        
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = this.formatHeader(header);
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create data rows
        const tbody = document.createElement('tbody');
        data.forEach(row => {
            const tr = document.createElement('tr');
            headers.forEach(header => {
                const td = document.createElement('td');
                td.textContent = this.formatValue(row[header]);
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);

        tableWrapper.appendChild(table);
        container.innerHTML = '';
        container.appendChild(tableWrapper);
    },

    formatHeader(header) {
        return header
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    },

    formatValue(value) {
        if (value === null || value === undefined) return '-';
        if (typeof value === 'number') {
            return Number.isInteger(value) ? value : value.toFixed(2);
        }
        return String(value);
    }
};