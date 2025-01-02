// FICHA API

var countriesData;

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
            countriesData = data;
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
            countriesData = data;
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
        /* 
        const response = await fetch('https://restcountries.com/v3.1/region/europe');
        if (!response.ok) throw new Error('Erro ao buscar países');
        */        
        // Selecionar um número aleatório de países (por exemplo, 3 países)
        //const highlightedCountries = getRandomCountries(countriesData, 10);
        //console.log(countriesData);
        // Renderizar na página
        var listaPaises = document.getElementById("countrylist"); // mesmo que ter document get element by id
        listaPaises.innerHTML = "";
        const container = document.querySelector('#countrylist');
        let id = 0;
        countries.forEach(country => {
            if(country.region == "Europe"){
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

                const buttonElement = document.createElement('button');
                //buttonElement.href = `<script>${country.maps.googleMaps}</script>`; 
                buttonElement.className = 'btn btn-primary';
                buttonElement.textContent = 'Mais Informações';
                const n = id; //para a função ler o id com o numero atual
                buttonElement.onclick = function(){displayCountryInfo(n);};

                const chkboxElementFav = document.createElement('input');
                //chkboxElementFav.href = `<script>${country.maps.googleMaps}</script>`; 
                chkboxElementFav.type = "checkbox";
                chkboxElementFav.className = 'star glyphicon glyphicon-star-empty';
                chkboxElementFav.onclick = function(){displayCountryInfo(n);};


                cardBody.appendChild(flagImage);
                cardBody.appendChild(nameElement);
                cardBody.appendChild(buttonElement);
                cardBody.appendChild(chkboxElementFav);
                cardElement.appendChild(cardBody);
                colElement.appendChild(cardElement);
                container.appendChild(colElement);   
            }   
            id++;        
        });
        if (id == 0) {
            listaPaises.innerHTML += "<h2>Nenhum resultado encontrado...</h2>";
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

function displayCountryInfo(idnum) {
    try {
        var listaPaises = document.getElementById("countrylist"); // Elemento onde a tabela será adicionada
        listaPaises.innerHTML = ""; // Limpa o conteúdo existente

        const country = countriesData[idnum]; // Objeto do país selecionado
        if (!country) {
            throw new Error('País não encontrado.');
        }
        // CARD DO PAÍS

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
        buttonElement.textContent = 'GoogleMaps';

        cardBody.appendChild(flagImage);
        cardBody.appendChild(nameElement);
        cardBody.appendChild(buttonElement);
        cardElement.appendChild(cardBody);
        colElement.appendChild(cardElement);
        listaPaises.appendChild(colElement);

        // Cria a estrutura da tabela

        const table = document.createElement("table");
        table.style.border = "1px solid black";
        table.style.borderCollapse = "collapse";
        table.style.width = "100%";

        // Adiciona o cabeçalho da tabela
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        const keyHeader = document.createElement("th");
        keyHeader.innerText = "Propriedade";
        keyHeader.style.border = "1px solid black";
        keyHeader.style.padding = "8px";

        const valueHeader = document.createElement("th");
        valueHeader.innerText = "Valor";
        valueHeader.style.border = "1px solid black";
        valueHeader.style.padding = "8px";

        headerRow.appendChild(keyHeader);
        headerRow.appendChild(valueHeader);
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Adiciona os dados do país na tabela
        const tbody = document.createElement("tbody");

        Object.keys(country).forEach(key => {
            const row = document.createElement("tr");

            const keyCell = document.createElement("td");
            keyCell.innerText = key;
            keyCell.style.border = "1px solid black";
            keyCell.style.padding = "8px";

            const valueCell = document.createElement("td");
            valueCell.style.border = "1px solid black";
            valueCell.style.padding = "8px";

            const value = country[key];

            // Verifica o tipo de dado e trata conforme necessário
            if (Array.isArray(value)) {
                // Exibe os arrays como uma lista separada por vírgulas
                valueCell.innerText = value.join(", ");
            } else if (typeof value === "object" && value !== null) {
                // Exibe objetos como JSON formatado
                valueCell.innerText = JSON.stringify(value, null, 2);
            } else if (typeof value === "string" && value.match(/\.(jpeg|jpg|gif|png|svg)$/i)) {
                // Verifica se é uma URL de imagem e cria um elemento <img>
                const img = document.createElement("img");
                img.src = value;
                img.alt = key;
                img.style.maxWidth = "100px"; // Limita o tamanho da imagem
                img.style.height = "auto";
                valueCell.appendChild(img);
            } else {
                // Exibe valores simples diretamente
                valueCell.innerText = value;
            }

            row.appendChild(keyCell);
            row.appendChild(valueCell);
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        listaPaises.appendChild(table); // Adiciona a tabela ao elemento HTML

    } catch (error) {
        console.error('Erro:', error);
    }
}

/*
function displayCountryInfo(idnum) {
    try {

        var listaPaises = document.getElementById("countrylist"); // mesmo que ter document get element by id
        listaPaises.innerHTML = "";
        const container = document.querySelector('#countrylist');
        console.log(idnum);
        console.log(countriesData);
        const country = countriesData[idnum];
        console.log(country);
        
            Object.keys(country).forEach( key =>{
    
                var tr = document.createElement("tr");
                var td = document.createElement("td");
                td.innerText = key;
                tr.appendChild(td);
                var td = document.createElement("td");
                td.innerText = country[key];
                tr.appendChild(td);
                listaPaises.append(tr);
            });
            
            //listaPaises.innerHTML += countryCard.toString();
        
    } catch (error) {
        console.error('Erro:', error);
    }
}*/

/*
function displayCountryInfo(idnum) {
    try {

        var listaPaises = document.getElementById("countrylist"); // mesmo que ter document get element by id
        listaPaises.innerHTML = "";
        const container = document.querySelector('#countrylist');
        console.log(idnum);
        console.log(countriesData);
        country = countriesData[idnum];
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
    } catch (error) {
        console.error('Erro:', error);
    }
}*/

fetchAllCountries("region/europe");

/*
Limitar busca aos países europeus
Por os links a abrir uma página com informção do país


*/