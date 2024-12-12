// JSON Viewer Component
const JsonViewer = {
    createNode(key, value, level = 0) {
        const node = document.createElement('div');
        node.className = 'json-node';
        node.style.marginLeft = `${level * 20}px`;

        const keyElement = document.createElement('span');
        keyElement.className = 'json-key';
        keyElement.textContent = key ? `${key}: ` : '';
        node.appendChild(keyElement);

        if (value === null) {
            const nullValue = document.createElement('span');
            nullValue.className = 'json-null';
            nullValue.textContent = 'null';
            node.appendChild(nullValue);
            return node;
        }

        if (Array.isArray(value)) {
            const arrayWrapper = this.createExpandableWrapper(node, 'array');
            value.forEach((item, index) => {
                arrayWrapper.appendChild(this.createNode(index, item, level + 1));
            });
            return node;
        }

        if (typeof value === 'object') {
            const objectWrapper = this.createExpandableWrapper(node, 'object');
            Object.entries(value).forEach(([k, v]) => {
                objectWrapper.appendChild(this.createNode(k, v, level + 1));
            });
            return node;
        }

        const valueElement = document.createElement('span');
        valueElement.className = `json-${typeof value}`;
        valueElement.textContent = this.formatValue(value);
        node.appendChild(valueElement);

        return node;
    },

    createExpandableWrapper(node, type) {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'json-toggle';
        toggleBtn.textContent = '−';
        node.appendChild(toggleBtn);

        const typeLabel = document.createElement('span');
        typeLabel.className = 'json-type';
        typeLabel.textContent = type;
        node.appendChild(typeLabel);

        const wrapper = document.createElement('div');
        wrapper.className = 'json-wrapper';
        node.appendChild(wrapper);

        toggleBtn.addEventListener('click', () => {
            wrapper.classList.toggle('collapsed');
            toggleBtn.textContent = wrapper.classList.contains('collapsed') ? '+' : '−';
        });

        return wrapper;
    },

    formatValue(value) {
        if (typeof value === 'string') return `"${value}"`;
        return String(value);
    },

    render(data, container) {
        container.innerHTML = '';
        container.className = 'json-viewer';
        container.appendChild(this.createNode('', data));
    }
};