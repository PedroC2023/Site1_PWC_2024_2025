// Função para buscar países de um API e selecionar alguns para destaque
async function fetchCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/region/europe');
        if (!response.ok) throw new Error('Erro ao buscar países');

        const countriesData = await response.json();

        // Selecionar um número aleatório de países (por exemplo, 3 países)
        const highlightedCountries = getRandomCountries(countriesData, 3);
        console.log(highlightedCountries);
        // Renderizar na página
        const container = document.querySelector('.row.g-4');
        highlightedCountries.forEach(country => {
            const colElement = document.createElement('div'); 
            colElement.className = 'col-md-4';

            const cardElement = document.createElement('div');
            cardElement.className = 'card h-100';

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body text-center';

            const nameElement = document.createElement('h5');
            nameElement.className = 'card-title';
            nameElement.textContent = country.translations.por.common;

            const flagImage = document.createElement('img');
            flagImage.src = country.flags.png;
            flagImage.alt = `Bandeira de ${country.name.common}`;
            flagImage.style.height = '120px';
            flagImage.style.width = '200px';
            flagImage.style.marginBottom = '30px';

            const buttonElement = document.createElement('button');
            buttonElement.className = 'btn btn-primary';
            buttonElement.textContent = 'Mais Informações';

            cardBody.appendChild(flagImage);
            cardBody.appendChild(nameElement);
            cardBody.appendChild(buttonElement);
            cardElement.appendChild(cardBody);
            colElement.appendChild(cardElement);
            container.appendChild(colElement);
        });
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Função para obter um número aleatório de países sem repetir
function getRandomCountries(countryList, count) {
    const shuffled = [...countryList].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

// Chamar a função para buscar e exibir países ao carregar a página
fetchCountries();
