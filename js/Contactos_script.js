// src: ficha 4


//Exercício 3 - validação dos formulários

// Uma "flag" é um valor que pode ser verdadeiro ou falso
function validateForm(){
    let isValid = true;
    var nameInput = document.getElementById("nome");
    var emailInput = document.getElementById("email");
    var mensagemInput = document.getElementById("mensagem");
    var termosInput = document.getElementById("termos");
    var captchaInput = document.getElementById("captchaInput");
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
    if(!termosInput.checked){
        isValid = false;
        showError("termos", "Erro no termos!"); 
    } else {
        hideError("termos");
    }
    if (captchaInput.value === captchaText) {
        document.getElementById("message").innerText = "CAPTCHA Verified Successfully!";
        document.getElementById("message").style.color = "green";
    } else {
        document.getElementById("message").innerText = "Incorrect CAPTCHA. Try again.";
        document.getElementById("message").style.color = "red";
        generateCaptcha(); // Generate a new CAPTCHA
        isValid = false;
    }
    return isValid;
}
function validateEmail(email){
    var regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return regexEmail.test(email); // esta função test() devolve true / false
}

function saveFormData(){
    //var formData = [];
    //var formData = array();
    //objeto que contém os dados do form já validados
    var formData = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        mensagem: document.getElementById("mensagem").value,
        termos: document.getElementById("termos").checked,
    };
    if(localStorage.formID){
        formID= parseInt(localStorage.getItem("formID"));
        formID += 1;
        localStorage.setItem("formID", formID);
    } else {
        formID = 1;
        localStorage.setItem("formID", formID);
    }

    console.log(formData);
    console.log(formData.email);
    localStorage.setItem("formulario"+formID.toString(), JSON.stringify(formData)); // Guarda o id do formulário
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

// Generate random CAPTCHA string
function generateCaptcha() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
        captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    document.getElementById("captcha").innerText = captcha;
}

// CAPTCHA src: chat GPT

let captchaText = ""; // To store the generated CAPTCHA text

// Generate random CAPTCHA text
function generateCaptchaText() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
        captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return captcha;
}

// Render CAPTCHA with noise and distortion
function generateCaptcha() {
    const canvas = document.getElementById("captchaCanvas");
    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Generate random CAPTCHA text
    captchaText = generateCaptchaText();

    // Add background noise
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 50; i++) {
        ctx.beginPath();
        ctx.arc(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 5,
            0,
            2 * Math.PI
        );
        ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
        ctx.fill();
    }

    // Draw CAPTCHA text with distortion
    ctx.font = "30px Arial";
    ctx.fillStyle = "#000";
    ctx.setTransform(1, 0.2 - Math.random() * 0.4, 0.2 - Math.random() * 0.4, 1, Math.random() * 10, Math.random() * 10);
    ctx.fillText(captchaText, 40, 50);

    // Reset transformation matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Add lines over the text
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.7)`;
        ctx.lineWidth = 1 + Math.random() * 2;
        ctx.stroke();
    }
}

// Mostrar o modal dos termos
function showTerms() {
    document.getElementById("messageTerms").style.display = "flex";
}

// Fechar o modal
function closeTerms() {
    document.getElementById("messageTerms").style.display = "none";
}

// Initial CAPTCHA generation
// sem JQUERY: document.addEventListener('DOMContentLoaded', function(){});
$(document).ready(function() {
    generateCaptcha();
    var success = document.getElementById("success-message");
    success.style.opacity = "0";
            
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
        var sButton =  document.getElementById("submitForm");
        sButton.style.visibility = 'hidden';
        success.style.opacity = "1";
        setTimeout(() => {
            success.style.opacity = "0";
        }, 2000);
        setTimeout(() => {
            // Refresh the page
            location.reload();
        }, 2000);
        
    }
});
