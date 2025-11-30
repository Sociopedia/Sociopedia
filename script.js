document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    const contentBody = document.querySelector('.wiki-content');

    function performSearch() {
        const query = searchInput.value.trim();
        if (!query) return;

        removeHighlights();

        if (window.find && window.getSelection) {
            document.designMode = "on";
            const sel = window.getSelection();
            sel.collapse(document.body, 0);
            
            const found = window.find(query, false, false, true, false, true, false);
            
            document.designMode = "off";

            if (found) {
                try {
                    const range = sel.getRangeAt(0);
                    const span = document.createElement('span');
                    span.className = 'highlight';
                    range.surroundContents(span);
                    
                    span.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } catch (e) {
                    console.log("Coincidencia encontrada, pero estructura compleja impidió resaltado CSS.");
                }
            } else {
                alert("NO DATA FOUND: " + query);
            }
        } else {
            alert("Navegador no soporta búsqueda integrada.");
        }
    }

    function removeHighlights() {
        const highlights = document.querySelectorAll('.highlight');
        highlights.forEach(span => {
            const parent = span.parentNode;
            parent.replaceChild(document.createTextNode(span.textContent), span);
            parent.normalize();
        });
    }

    // Event Listeners
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        performSearch();
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });
});