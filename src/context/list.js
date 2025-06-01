import * as d3 from 'd3';

function returnHome() {
    document.location.href = "home";
}

function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    const dataStructureLinks = document.querySelectorAll('.Data-Structure-Link');
    const algorithmLinks = document.querySelectorAll('.Algorithm-Link');
    const NRM = document.getElementById('noResults');
    
    searchInput.value = '';

    dataStructureLinks.forEach(link => {
        link.classList.remove('hidden');
    });

    algorithmLinks.forEach(link => {
        link.classList.remove('hidden');
    });

    NRM.classList.add('hidden');

    toggleClearButton(false);
    searchInput.focus();
}

function search() {
    const searchInput = document.getElementById('searchInput');
    const dataStructureLinks = document.querySelectorAll('.Data-Structure-Link');
    const algorithmLinks = document.querySelectorAll('.Algorithm-Link');
    const NRM = document.getElementById('noResults');
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    let resultsFound = false;

    if (searchTerm === '') {
        dataStructureLinks.forEach(link => {
            link.classList.remove('hidden');
        });
        algorithmLinks.forEach(link => {
            link.classList.remove('hidden');
        });
        NRM.classList.add('hidden');
        toggleClearButton(false);
        return;
    }

    toggleClearButton(true);

    dataStructureLinks.forEach(link => {
        const linkText = link.textContent.toLowerCase();
        const linkId = link.id.toLowerCase();

        if (linkText.includes(searchTerm) || linkId.includes(searchTerm)) {
            link.classList.remove('hidden');
            resultsFound = true;
        } else {
            link.classList.add('hidden');
        }
    });

    algorithmLinks.forEach(link => {
        const linkText = link.textContent.toLowerCase();
        const linkId = link.id.toLowerCase();

        if (linkText.includes(searchTerm) || linkId.includes(searchTerm)) {
            link.classList.remove('hidden');
            resultsFound = true;
        } else {
            link.classList.add('hidden');
        }
    });

    if (resultsFound) {
        NRM.classList.add('hidden');
    } else {
        NRM.classList.remove('hidden');
    }
}

function toggleClearButton(show) {
    const clearButton = document.getElementById('clearButton');
    if (clearButton) {
        clearButton.style.display = show ? 'block' : 'none';
    }
}

function searchEvL() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const clearButton = document.getElementById('clearButton');
    
    if (!searchInput || !searchButton || !clearButton) {
        console.error('Search elements not found');
        return;
    }
    
    toggleClearButton(searchInput.value.trim() !== '');

    searchButton.addEventListener('click', search);

    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            search();
        }
        toggleClearButton(this.value.trim() !== '');
    });

    clearButton.addEventListener('click', clearSearch);

    searchInput.addEventListener('input', function() {
        toggleClearButton(this.value.trim() !== '');
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            clearSearch();
        }

        if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
            event.preventDefault();
            searchInput.focus();
        }
    });
}

export { returnHome, clearSearch, search, searchEvL };