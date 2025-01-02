// <<<<<<<< FICHA 4 >>>>>>>>>

function fillBirthYearSelect(){
    var currentYear = new Date().getFullYear();
    var birthYearSelect = document.getElementById("BirthYear");
    let year; // "let" é uma variável privada
    for(year = 1900; year<=currentYear;year++){
        //console.log(year);
        var option = document.createElement("option");
        option.value = year;
        option.text = year;
        birthYearSelect.appendChild(option);
    }
    console.log(currentYear);//verificar se funciona
}



//Exercício 3 - validação dos formulários

// Uma "flag" é um valor que pode ser verdadeiro ou falso
function validateForm(){
    alert("Estou na Validação");
    let isValid = true;
    var nameInput = document.getElementById("nome");
    var emailInput = document.getElementById("email");
    var mensagemInput = document.getElementById("mensagem");
    var BirthYearInput = document.getElementById("BirthYear");
    var gendermaleInput = document.getElementById("gendermale");
    var genderfemaleInput = document.getElementById("genderfemale");
    var genderotherInput = document.getElementById("genderother");
    var termosInput = document.getElementById("termos");

    // Validar nome
    if(nameInput.value.length < 3){
        showError("nome", "Erro no nome!");
        isValid = false;
    } else {
        hideError("nome");
    }
    // Validar email
    if(!validateEmail(emailInput.value)){
        isValid = false;
        showError("email", "Erro no email!");       
    } else {
        hideError("email");
    }

    if(mensagemInput.value.trim() === ""){
        isValid = false;
        showError("mensagem", "Erro no mensagem!");  
    } else {
        hideError("mensagem");
    }

    if(!genderfemaleInput.checked && !gendermaleInput.checked && !genderotherInput.checked){
        isValid = false;
        showError("gender", "Erro no gender!");   
    } else {
        hideError("gender");
    }

    if(!termosInput.checked){
        isValid = false;
        showError("termos", "Erro no termos!"); 
    } else {
        hideError("termos");
    }
    return isValid;
}
function validateEmail(email){
    var regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return regexEmail.test(email); // esta função test() devolve true / false
}

function saveFormData(){
    alert("Gravar dados");
    //var formData = [];
    //var formData = array();
    //objeto que contém os dados do form já validados
    var formData = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        mensagem: document.getElementById("mensagem").value,
        BirthYear: document.getElementById("BirthYear").value,
        gender: document.querySelector("input[name='gender']:checked"),
        termos: document.getElementById("termos").checked,
    };
    console.log(formData);
    console.log(formData.email);
    localStorage.setItem("formulario", JSON.stringify(formData)); // Põe na caixa do chrome esta função
}


function showError(fieldId, message) {
    var errorDiv = document.getElementById(`${fieldId}-error`); // "#"+fieldId+"-error"
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
}

function hideError(fieldId) {
    var errorDiv = document.getElementById(`${fieldId}-error`);
    errorDiv.style.display = "none";
}

function showHeader() {
    
}


document.addEventListener('DOMContentLoaded', function(){
    //quando a página é carregada é chamada
    fillBirthYearSelect();
    var teste = validateEmail("teste@sapo.pt");
    console.log(teste);    
});
document.getElementById("contact-form").addEventListener("submit", function(event){
    //Previne o comportamento default de submissão do form (senão faz refresh)
    event.preventDefault();
    console.log("Submissão");

    //Verifica se a função retorna verdadeiro ou falso
    //Verifica se é "true"
    if(validateForm()){

        saveFormData();
        var success = document.getElementById("success-message");
        success.style.opacity = "1";
        setTimeout(() => {
            success.style.opacity = "0";
        }, 5000);
    } /*else {
        alert("Tem erros")
    }*/
});
