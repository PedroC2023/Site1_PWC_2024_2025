// FICHA API


$(document).ready(function() {
    $("#searchButton").on("click", function() {
        // buscar o valor escrito no input
        var inputText = $("#searchInput").val();
        // vai buscar os filmes do servidor
        fetchCountries(inputText);
    });
});

function fetchCountries(inputText) {
    var api_url = "https://restcountries.com/v3.1/translation/"+inputText;
    
    $.ajax({
        url: api_url,
        method: "GET",
        success: function(data) {
            //alert("Sucesso");
            // dados vindos do servidor
            //console.log(data);
            //passar o array de filmes devolvidos pelo servidor se olhar mos para o objeto é o "search" 
            displayCountries(data);
        },
        error: function() {
            alert("A procurar.");
        }
    });
}

function fetchAllCountries(inputText) {
    var api_url = "https://restcountries.com/v3.1/"+inputText;
    
    $.ajax({
        url: api_url,
        method: "GET",
        success: function(data) {
            //alert("Sucesso");
            // dados vindos do servidor
            //console.log(data);
            //passar o array de filmes devolvidos pelo servidor se olhar mos para o objeto é o "search" 
            displayCountries(data);
        },
        error: function() {
            alert("A procurar.");
        }
    });
} 
/*  DISPLAYCOUNTRIES 1

function displayCountries(arrayPaises) {
    //var listaFilmes = $("#movieList"); // mesmo que ter document get element by id
    var listaPaises = document.getElementById("countrylist"); // mesmo que ter document get element by id
    listaPaises.innerHTML = "";
    var result = [];
    for(var i in arrayPaises)
        result.push([i, arrayPaises[i]]);
    var paises = result[0];
    console.log(arrayPaises);
    var n = 0;
    for(const pais of arrayPaises) {       
        n++;
        var countryCard = `
            <div class='row countrylist' id="country${n}">     
                <div class="col-auto">                   
                    <img class="countryimage" height="120px" src="${pais.flags.png}" alt="${pais.name.common}">
                </div>
                <div class="col-md-4">                                              
                    <h5 class="card-title">${pais.name.common}</h5>
                    <p class="card-text">${pais.currencies.EUR}</p>
                    <a href="#" class="btn btn-primary">${pais.capital}</a>                    
                </div>                
            </div>
            `;
        listaPaises.innerHTML += countryCard.toString();
       
    }
    
}*/

// Função para buscar países de um API e selecionar alguns para destaque
function displayCountries(countries) {
    try {
       /* const response = await fetch('https://restcountries.com/v3.1/region/europe');
        if (!response.ok) throw new Error('Erro ao buscar países');

        const countriesData = await response.json();*/

        // Selecionar um número aleatório de países (por exemplo, 3 países)
        //const highlightedCountries = getRandomCountries(countriesData, 10);
        console.log(countries);
        // Renderizar na página
        var listaPaises = document.getElementById("countrylist"); // mesmo que ter document get element by id
        listaPaises.innerHTML = "";
        const container = document.querySelector('#countrylist');
        countries.forEach(country => {
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
            flagImage.className = 'countryimage';
            flagImage.src = country.flags.png;
            flagImage.alt = `Bandeira de ${country.name.common}`;
            flagImage.style.height = '120px';
            flagImage.style.width = '200px';
            flagImage.style.marginBottom = '30px';

            const buttonElement = document.createElement('a');
            buttonElement.href = `${country.maps.googleMaps}`; 
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

fetchAllCountries("region/europe");

/*
Limitar busca aos países europeus
Por os links a abrir uma página com informção do país


*/