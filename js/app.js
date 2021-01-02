// STEPS
// 1. Habiliar desahibilar botones de enviar
// 2. El formulario tiene que validar cada campo 
// email
// ausunto
// mensaje
// 3. Debe mostrarse un mensaje de error

// Variables 

const email = document.querySelector("#email");
const about = document.querySelector("#asunto");
const text = document.querySelector("#mensaje");
const btnSend = document.querySelector("#enviar");
const btnReset = document.querySelector('#resetBtn');
const form = document.querySelector('#form');


// Listeners
const Listeners = () => {
    document.addEventListener('DOMContentLoaded', startApp);
    email.addEventListener('blur', checkInput);
    about.addEventListener('blur', checkInput);
    text.addEventListener('blur', checkInput);
    form.addEventListener('submit', sendEmail);
    btnReset.addEventListener('click', clearInputs);
};

// Functions
const startApp = () => {
    // deshabilitar el envio
    btnSend.disabled = true;
    btnSend.classList.add('cursor-not-allowed', 'opacity-50')
}

const checkInput = (e) => {
    // Revisar como estan los otros campos 
    let emailValidation = false;
    notEmpty(e);
    if (e.target.id === "email") {

        const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (regEx.test(e.target.value.toLowerCase())) {
            emailValidation = true
            e.target.style.borderColor = 'green';
            e.target.classList.remove('error');
            clearErrorMessage(e.target)
        } else {
            emailValidation = false
            e.target.style.borderColor = 'red';
            e.target.classList.add('error');
            errorMessage(e.target)
        }
    };

    if (emailValidation && email.value !== '' && about.value !== '' && text.value !== '') {
        btnSend.disabled = false;
        btnSend.classList.remove('opacity-50');
        btnSend.classList.remove('cursor-not-allowed');
    } else {
        btnSend.disabled = true;
        btnSend.classList.add('cursor-not-allowed', 'opacity-50')
    }
}

const notEmpty = ({ target }) => {
    if (target.value.length > 0) {
        clearErrorMessage(target)
        target.style.borderColor = 'green';
        target.classList.remove('error');
    } else {
        target.style.borderColor = 'red';
        target.classList.add('error');
        errorMessage(target)
    }
}

const errorMessage = (input) => {
    const spanError = document.querySelector(`#${input.id}-error-message`);
    if (input.value.length > 0) {
        spanError.textContent = `${input.labels[0].textContent} tiene que ser un correo válido`
    } else  {
        spanError.textContent = `${input.labels[0].textContent} no puede estar vacioooo`
    }
    spanError.style.color = "red"
}

const clearErrorMessage = (input) => {
    const spanError = document.querySelector(`#${input.id}-error-message`);
    spanError.textContent = `${input.labels[0].textContent} Cool 😎`
    spanError.style.color = "green"
}

const sendEmail = (e) => {
    e.preventDefault();
    // Tengo que formar in JSON con los datos que se van a mandar
    const inputValues = form.elements;
    const data = {};
    // inputValues == HTML elements 
    for (let index = 0; index < inputValues.length; index++) {
        if (inputValues[index].value !== "") {
            data[inputValues[index].id] = inputValues[index].value;
        }
    };
    // Casting htmlelements to an array
    const arrayInputValues = Array.from(inputValues);
    const data2 = {};
    arrayInputValues.forEach(input => input.value !== "" ? data2[input.id] = input.value : console.log('no hay data'))
}

const clearInputs = () => {
    console.log('resetiando');
    document.querySelectorAll('span').forEach(span => {
        span.textContent = "";
        span.previousElementSibling.classList.remove('error')
        span.previousElementSibling.style.borderColor = 'transparent'
        console.log(span.previousElementSibling.classList)
    });
};
Listeners();