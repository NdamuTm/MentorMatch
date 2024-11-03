const username = 'ndamutm'; 
    const input = document.getElementById('location-input');
    const suggestionsContainer = document.getElementById('suggestions');

    input.addEventListener('input', async function() {
        const query = this.value;

        suggestionsContainer.innerHTML = '';
        suggestionsContainer.style.display = 'none';

        if (query.length > 2) {
            try {
                const response = await fetch(`http://api.geonames.org/searchJSON?q=${encodeURIComponent(query)}&country=ZA&username=${username}`);
                const data = await response.json();
                
                if (data.geonames && data.geonames.length > 0) {
                    data.geonames.forEach(suggestion => {
                        const div = document.createElement('div');
                        div.classList.add('suggestion');
                        div.textContent = suggestion.name ; 
                        div.onclick = () => selectSuggestion(suggestion.name);
                        suggestionsContainer.appendChild(div);
                    });
                    suggestionsContainer.style.display = 'block';
                }
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        }
    });

    function selectSuggestion(location) {
        input.value = location; 
        suggestionsContainer.innerHTML = ''; 
        suggestionsContainer.style.display = 'none'; 
    }

    document.addEventListener('click', function(e) {
        if (!suggestionsContainer.contains(e.target) && e.target !== input) {
            suggestionsContainer.innerHTML = '';
            suggestionsContainer.style.display = 'none';
        }
    });